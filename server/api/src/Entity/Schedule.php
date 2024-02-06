<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ScheduleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use App\State\ScheduleStateProcessor;

#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
#[ApiResource(
    operations: [
        new Post(denormalizationContext: ['groups' => ['schedule-mutation']]),
        new Patch(denormalizationContext: ['groups' => ['schedule-mutation']]),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['schedule-read']],
    processor: ScheduleStateProcessor::class,
)]
#[ApiResource(
    uriTemplate: '/users/{id}/schedules',
    uriVariables: [
        'id' => new Link(fromClass: User::class, toProperty: 'employee'),
    ],
    operations: [ new GetCollection(normalizationContext: ['groups' => ['schedule-read']]) ]
)]
#[ApiResource(
    uriTemplate: '/stores/{id}/schedules',
    uriVariables: [
        'id' => new Link(fromClass: Store::class, toProperty: 'employee'),
    ],
    operations: [ new GetCollection(normalizationContext: ['groups' => ['schedule-read']]) ]
)]
#[ApiFilter(DateFilter::class, properties: ['startDate' => 'after', 'endDate' => 'before'])]
class Schedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['schedule-read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Assert\NotNull]
    #[Groups(['schedule-read', 'schedule-mutation'])]
    private ?\DateTimeInterface $startDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Assert\NotNull]
    #[Groups(['schedule-read', 'schedule-mutation'])]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\Column]
    #[Assert\NotNull]
    #[Groups(['schedule-read', 'schedule-mutation'])]
    private ?bool $onVacation = null;

    #[ORM\ManyToOne(inversedBy: 'schedules')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['schedule-read', 'schedule-mutation'])]
    private ?User $employee = null;

    #[ORM\ManyToOne(inversedBy: 'schedules')]
    #[Groups(['schedule-read', 'schedule-mutation'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?Store $store = null;


    public function getId(): ?int
    {
        return $this->id;
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

    public function isOnVacation(): ?bool
    {
        return $this->onVacation;
    }

    public function setOnVacation(bool $onVacation): static
    {
        $this->onVacation = $onVacation;

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

    public function getStore(): ?Store
    {
        return $this->store;
    }

    public function setStore(?Store $store): static
    {
        $this->store = $store;

        return $this;
    }

}
