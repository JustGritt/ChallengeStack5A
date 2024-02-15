<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use App\Entity\User;
use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\PatchOperationInterface;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Booking;
use App\Entity\Schedule;

class BookingStateProcessor implements ProcessorInterface
{

    public function __construct(
        #[Autowire('@api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire('@api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        private EntityManagerInterface $entityManager,
        private Security $security
    )
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {

        if ($operation->getUriTemplate() === '/bookings{._format}' && $operation->getMethod() === 'POST') {
            $user = $this->security->getUser();
            $employee = $data->getEmployee();
            $service = $data->getService();
            $store = $service->getStore();

            //check if the employee is working in the store
            if (!$store->getUsers()->contains($employee)) {
                throw new AccessDeniedException('The employee is not working in the store');
            }

            if (null !== $user && null !== $user->getWork()) {
                throw new AccessDeniedException('Sorry you cannot book a service because you are an employee.');
            }

            //round to the nearest 30 minutes e.g 10:15 => 10:00 and 10:45 => 11:00
            $roundedMinutes = floor($data->getStartDate()->format('i') / 30) * 30;
            $roundedStartDate = clone $data->getStartDate();
            $roundedStartDate->setTime(
                $data->getStartDate()->format('H'),
                $roundedMinutes,
                0
            );

            $data->setStartDate($roundedStartDate);
           

            //check if the user as already a booking at the same time for the same service
            $bookings = $store->getBookings();
            foreach ($bookings as $booking) {
                if ($booking->getCustomer() === $user && $booking->getService() === $service && $booking->getStartDate()->format('Y-m-d H:i') === $data->getStartDate()->format('Y-m-d H:i')) {
                    throw new AccessDeniedException('You already have a booking for this service. Please choose another time or service.');
                }
            }

            //check that the employye is not already booked at the same time
            foreach ($bookings as $booking) {
                if ($booking->getEmployee() === $employee && $booking->getStartDate()->format('Y-m-d H:i') === $data->getStartDate()->format('Y-m-d H:i')) {
                    throw new AccessDeniedException('The employee is already booked at this time. Please choose another time.');
                }
            }

            //check if the employee is available at the time
            $serviceTime = $service->getTime();
            $cloneStartDate = clone $data->getStartDate();
            $employeeSchedules = $this->entityManager->getRepository(Schedule::class)->createQueryBuilder('s')
                ->where('s.employee = :employee')
                ->andWhere('s.startDate <= :startTime')
                ->andWhere('s.endDate >= :endTime')
                ->setParameter('employee', $employee)
                ->setParameter('startTime', $data->getStartDate())
                ->setParameter('endTime', $cloneStartDate->add(new \DateInterval('PT' . $serviceTime . 'M')))
                ->getQuery()
                ->getResult();

            if (count($employeeSchedules) === 0) {
                throw new AccessDeniedException('The employee is not available at this time');
            }

            $data->setCustomer($user);
            $serviceTime = $service->getTime();
            $endTime = clone $data->getStartDate(); //clone to avoid modifying the original date
            $endTime->add(new \DateInterval('PT' . $serviceTime . 'M'));
            $data->setEndDate($endTime);
            $data->setStore($store);

            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

        if ($operation->getUriTemplate() === '/bookings/{id}{._format}' && $operation->getMethod() === 'PATCH') {
            //check if the user is the owner of the booking
            if (null !== $this->security->getUser() && $context['previous_data']->getCustomer() !== $this->security->getUser()) {
                throw new AccessDeniedException('You are not allowed to update this booking. You are not the owner of this booking');
            }
            if (true === $context['previous_data']->isCancelled()) {
                throw new AccessDeniedException('You have already cancelled this booking');
            }
            if (!$data->isCancelled()) {
                throw new AccessDeniedException('You can only cancel a booking');
            }

            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

    }
}