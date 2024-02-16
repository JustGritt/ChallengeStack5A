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
use Symfony\Component\Validator\Context\ExecutionContext;

#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
#[ApiResource(
    operations: [
        new Post(denormalizationContext: ['groups' => ['schedule-mutation']]),
        new Patch(denormalizationContext: ['groups' => ['schedule-mutation', 'admin-patch']]),
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
        'id' => new Link(fromClass: Store::class, toProperty: 'store'),
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
    #[Assert\Type("\DateTimeInterface")]
    //should be a date string in the "Y-m-d H:i:s" and must be grater or equal to 9:00 and less than 18:00
    #[Assert\GreaterThanOrEqual('09:00:00', message: 'The start date must be after 9:00')]
    private ?\DateTimeInterface $startDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Assert\NotNull]
    #[Groups(['schedule-read', 'schedule-mutation'])]
    /**
     * @var string A "Y-m-d H:i:s" formatted value
     */
    #[Assert\Type("\DateTimeInterface")]
    #[Assert\GreaterThan(propertyPath: 'startDate', message: 'The end date must be after the start date')]
    #[Assert\Callback(callback: [self::class, 'validateEndDate'])]
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

    #[Groups(['admin-patch', 'schedule-read'])]
    #[ORM\Column()]
    private bool $refused = false;


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

    public function isRefused(): bool
    {
        return $this->refused;
    }

    public function setRefused(bool $refused): static
    {
        $this->refused = $refused;

        return $this;
    }

    public static function validateEndDate($value, ExecutionContext $context): void
    {
        if ($value instanceof \DateTimeInterface) {
            $endTime = $value->format('H:i:s');

            if ($endTime > '19:00:00') {
                $context->buildViolation('The end date must be before 19:00')
                    ->addViolation();
            }
        }
    }

}
