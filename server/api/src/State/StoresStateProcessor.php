<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use App\Entity\Stores;
use App\Entity\User;

class StoresStateProcessor implements ProcessorInterface
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
        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }

        $user = $this->security->getUser();

        if ($user instanceof User && $user->getCompanie() === null) {
            throw new AccessDeniedException('Cannot create a new store for this user.');
        }


        //check if the method is patch 
        if ($operation->getUriTemplate() === '/stores/{id}{._format}' && $operation->getMethod() === 'PATCH') {
            //check if the user is admin of the company
            if ($user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
            //check if the user is admin of the company
            if (null !== $user->getCompanie() && $user->getCompanie()->getId() === $data->getCompany()->getId()) {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
            throw new AccessDeniedException('Cannot update this store.');
        }

        //check if the method is post
        if ($operation->getUriTemplate() === '/stores{._format}' && $operation->getMethod() === 'POST') {
            //check if the user is admin of the company
            if (null !== $user->getCompanie() && $user->getCompanie()->getId() === $data->getCompany()->getId()) {
                $data->setCompany($user->getCompanie());
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
            throw new AccessDeniedException('Cannot edit the store for this user.');
        }

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);

    }
}
