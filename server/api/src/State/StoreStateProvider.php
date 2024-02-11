<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use ApiPlatform\Metadata\CollectionOperationInterface;
use App\Entity\Companie;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Store;

class StoreStateProvider implements ProviderInterface
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

            //find all stores where the company is valid and is not refused
            $companies = $this->entityManager->getRepository(Companie::class)->findBy(['isValid' => true, 'refused' => false]);

            return $this->entityManager->getRepository(Store::class)->findBy(['company' => $companies]);
        }
    }
}
