<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BookingRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Store;
use ApiPlatform\Metadata\Link;
use App\State\BookingStateProcessor;
use App\State\BookingStateProvider;

#[ORM\Entity(repositoryClass: BookingRepository::class)]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => ['booking-read-full']]),
        new Post(denormalizationContext: ['groups' => ['booking-mutation']]),
        new Patch(denormalizationContext: ['groups' => ['booking-mutation-put']], security: "object.customer == user"),
    ],
    normalizationContext: ['groups' => ['booking-read-full']],
    processor: BookingStateProcessor::class,
)]
#[ApiResource(
    uriTemplate: '/stores/{id}/bookings',
    uriVariables: [
        'id' => new Link(fromClass: Store::class, toProperty: 'store'),
    ],
    operations: [ new GetCollection(normalizationContext: ['groups' => ['booking-read-full']]) ],
)]
#[ApiResource(
    uriTemplate: '/users/{id}/bookings',
    uriVariables: [
        'id' => new Link(fromClass: Store::class, toProperty: 'customer'),
    ],
    operations: [ new GetCollection(normalizationContext: ['groups' => ['booking-read-full']] ) ],
    #provider: BookingStateProvider::class,
)]
#[ApiResource(
    uriTemplate: '/employee/{id}/bookings',
    uriVariables: [
        'id' => new Link(fromClass: Store::class, toProperty: 'employee'),
    ],
    operations: [ new GetCollection(normalizationContext: ['groups' => ['booking-read-full']]) ],
    #provider: BookingStateProvider::class,
)]
class Booking
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['booking-read-full'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['booking-read-full'])]
    private ?User $customer = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['booking-read-full', 'booking-mutation'])]
    private ?User $employee = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['booking-read-full', 'booking-mutation', 'admin-read-booking'])]
    private ?Service $service = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['booking-read-full', 'booking-mutation'])]
    private ?\DateTimeInterface $startDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['booking-read-full'])]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\ManyToOne(inversedBy: 'bookings')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['booking-read-full'])]
    private ?Store $store = null;

    #[ORM\Column]
    #[Groups(['booking-mutation-put'])]
    private ?bool $cancelled = false;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCustomer(): ?User
    {
        return $this->customer;
    }

    public function setCustomer(?User $customer): static
    {
        $this->customer = $customer;

        return $this;
    }

    public function getEmployee(): ?User
    {
        return $this->employee;
    }

    public function setEmployee(?User $employee): static
    {
        $this->employee = $employee;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getStore(): ?Store
    {
        return $this->store;
    }

    public function setStore(?Store $store): static
    {
        $this->store = $store;

        return $this;
    }

    public function isCancelled(): ?bool
    {
        return $this->cancelled;
    }

    public function setCancelled(bool $cancelled): static
    {
        $this->cancelled = $cancelled;

        return $this;
    }
}
