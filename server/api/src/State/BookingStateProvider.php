<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use ApiPlatform\Metadata\CollectionOperationInterface;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Booking;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use App\Dto\AnotherRepresentation;

class BookingStateProvider implements ProviderInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private Security $security
    )
    {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        if ($operation->getUriTemplate() === '/users/{id}/bookings') {
            $user = $this->security->getUser();
            if (null !== $user && $user->getId() === $uriVariables['id']) {
                return $this->entityManager->getRepository(Booking::class)->findBy(['customer' => $user]);
            }
            throw new AccessDeniedException('You are not allowed to access this resource. You are not the owner of the bookings');
        }

        if ($operation->getUriTemplate() === '/employee/{id}/bookings') {
            $user = $this->security->getUser();
            if (null !== $user && $user->getId() === $uriVariables['id']) {
                return $this->entityManager->getRepository(Booking::class)->findBy(['employee' => $user]);
            }
            throw new AccessDeniedException('You are not allowed to access this resource. This is not your bookings.');
        }


        return null;
    }
}
