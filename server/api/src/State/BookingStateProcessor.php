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
use ApiPlatform\Metadata\PostOperationInterface;
use App\Repository\UserRepository;


class BookingStateProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire('@api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire('@api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        private Security $security
    )
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($operation instanceof PostOperationInterface) {
            //check if the booking belongs to the store 
            $user = $this->security->getUser();
            $companie = $user->getCompanie();
            $work = $user->getWork();

            if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
            }

            if (null !== $companie && $companie->getId() && $data->getStore()->getCompany()->getId() === $companie->getId() && $companie->isIsValid() === true) {
                return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
            }

            throw new AccessDeniedException('Cannot delete this booking.');
        }
    }
}
