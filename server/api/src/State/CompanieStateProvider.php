<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use ApiPlatform\Metadata\CollectionOperationInterface;
use App\Entity\Companie;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;


class CompanieStateProvider implements ProviderInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security $security

    )
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if ($operation instanceof CollectionOperationInterface) {
            //check if the user is SUPER_ADMIN
            $user = $this->security->getUser();
            if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                return $this->entityManager->getRepository(Companie::class)->findAll();
            }

            //if not only display the companies where isvalid is true
            return $this->entityManager->getRepository(Companie::class)->findBy(['isValid' => true, 'refused' => false]);

        }

        //if the operation is not a collection operation perform the default behavior
        return null;

    }
}
