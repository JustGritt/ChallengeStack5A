<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use App\Entity\Schedule;
use App\Entity\User;
use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\PatchOperationInterface;
use ApiPlatform\Metadata\PostOperationInterface;

class ScheduleStateProcessor implements ProcessorInterface
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
        if ($operation instanceof DeleteOperationInterface) {
            $user = $this->security->getUser();
            $companie = $user->getCompanie();
            $work = $user->getWork();

            //if the user is companie owner or is trying to delete his own schedule
            if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
            }

            if (null !== $companie && $companie->getId() && $data->getStore()->getCompany()->getId() === $companie->getId() && $companie->isIsValid() === true) {
                return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
            }

            if (null !== $work && $work->getId() && $data->getStore()->getId() === $work->getId()) {
                if ($data->getEmployee() === $user) {
                    return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
                }

                throw new AccessDeniedException('This schedule does not belong to you.');
            }

            throw new AccessDeniedException('Cannot delete this schedule.');
        }

        if ($operation->getUriTemplate() === '/schedules/{id}{._format}' && $operation->getMethod() === 'PATCH') {
            $user = $this->security->getUser();
            $companie = $user->getCompanie();
            $work = $user->getWork();

            if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }

            if (null !== $companie && $companie->getId() && $data->getStore()->getCompany()->getId() === $companie->getId() && $companie->isIsValid() === true) {
                if (null !== $data->getEmployee()->getWork() && $data->getEmployee()->getWork()->getCompany()->getId() === $data->getStore()->getCompany()->getId()) {
                    return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
                }
                throw new AccessDeniedException('You cannot update this schedule. This employee does not belong to this company.');
            }

            if (null !== $work && $work->getId() && $data->getStore()->getId() === $work->getId()) {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }

            throw new AccessDeniedException('Cannot update this schedule. This store does not belong to you or this employee does not belong to this company.');
        }

        if ($operation->getUriTemplate() === '/schedules{._format}'  && $operation->getMethod() === 'POST') {
            $user = $this->security->getUser();
            $companie = $user->getCompanie();
            $work = $user->getWork();

            if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }

            if (null !== $companie && null !== $data->getStore() && $data->getStore()->getCompany()->getId() === $companie->getId() && $companie->isIsValid() === true) {
                if (null !== $data->getEmployee()->getWork() && $data->getEmployee()->getWork()->getCompany()->getId() === $data->getStore()->getCompany()->getId()) {
                    if ($this->checkForDuplicate($data->getStartDate(), $data->getEndDate(), $data->getStore(), $data->getEmployee())) {
                        throw new AccessDeniedException('Cannot create a new schedule. The employee already have a schedule for this period.');
                    }
                    return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
                }
                throw new AccessDeniedException('You cannot create a new schedule. This employee does not belong to this company.');
            }

            if (null !== $work) {
                $data->setEmployee($user);
                $data->setStore($work);
                if ($this->checkForDuplicate($data->getStartDate(), $data->getEndDate(), $work, $user)) {
                    throw new AccessDeniedException('Cannot create a new schedule. You might have a overlapping schedule.');
                }
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }

            throw new AccessDeniedException('Cannot create a new schedule. This store does not belong to you or this employee does not belong to this company.');
        }

        $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        return $result;
    }

    private function checkForDuplicate($startDate, $endDate, $store, $employee): bool
    {
        $schedules = $this->entityManager->getRepository(Schedule::class)->createQueryBuilder('s')
            ->where('s.store = :store')
            ->andWhere('s.employee = :employee')
            ->andWhere('s.startDate >= :startDate AND s.startDate < :endDate')
            ->andWhere('s.endDate > :startDate AND s.endDate <= :endDate')
            ->setParameter('store', $store)
            ->setParameter('employee', $employee)
            ->setParameter('startDate', $startDate)
            ->setParameter('endDate', $endDate)
            ->getQuery()
            ->getResult();

        return count($schedules) > 0;
    }
}
