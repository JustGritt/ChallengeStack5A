<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use App\Entity\User;
use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\PatchOperationInterface;
use ApiPlatform\Metadata\PostOperationInterface;



class ServiceStateProcessor implements ProcessorInterface
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
            //check if the service belongs to the store 
            $user = $this->security->getUser();
            $companie = $user->getCompanie();
            $work = $user->getWork();

            if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
            }

            if (null !== $companie && $companie->getId() && $data->getStore()->getCompany()->getId() === $companie->getId() && $companie->isIsValid() === true) {
                return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
            }

            throw new AccessDeniedException('Cannot delete this service.');
        }

        //if the method is post and the user is admin of the company
        if ($operation->getUriTemplate() === '/services{._format}' && $operation->getMethod() === 'POST') {
            $user = $this->security->getUser();
            $companie = $user->getCompanie();
            $work = $user->getWork();
            
            if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
        
            if (null !== $companie && $companie->getId() && $data->getStore()->getCompany()->getId() === $companie->getId() && $companie->isIsValid() === true) {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
        
            throw new AccessDeniedException('Cannot create a new service.');
        }
        
        //if the method is patch and the user is admin of the company
        if ($operation->getUriTemplate() === '/services/{id}{._format}' && $operation->getMethod() === 'PATCH') {
            $user = $this->security->getUser();
            $companie = $user->getCompanie();
            $work = $user->getWork();
        
            if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
        
            if (null !== $companie && $companie->getId() && $data->getStore()->getCompany()->getId() === $companie->getId() && $companie->isIsValid() === true) {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
            
            throw new AccessDeniedException('Cannot edit this service.');
        }
    }
}
