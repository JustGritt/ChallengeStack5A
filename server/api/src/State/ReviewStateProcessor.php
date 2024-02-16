<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class ReviewStateProcessor implements ProcessorInterface
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
        $user = $this->security->getUser();

        if ($operation instanceof DeleteOperationInterface) {
            if (null !== $user && $data->getCustomer() !== $user) {
                throw new AccessDeniedException('You can only delete your own reviews.');
            }
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }

        if ($operation->getUriTemplate() === "/reviews{._format}" && $operation->getMethod() === 'POST') {
            $service = $data->getService();
            $bookings = $service->getBookings();
            $booked = false;
            foreach ($bookings as $booking) {
                if ($booking->getCustomer() === $user) {
                    //having at least one booking in the past
                    if ($booking->getStartDate() < new \DateTime()) {
                        $booked = true;
                        break;
                    }
                }
            }
            if (!$booked) {
                throw new AccessDeniedException('You can only review a service you have booked.');
            }
            $data->setCustomer($user);
            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

        if ($operation->getUriTemplate() === 'reviews/{id}{._format}' && $operation->getMethod() === 'PATCH') {
            if (null !== $user && $data->getCustomer() !== $user) {
                throw new AccessDeniedException('You can only update your own reviews.');
            }
            return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        }

       throw new AccessDeniedException('You cannot perform this action.');
    }
}
