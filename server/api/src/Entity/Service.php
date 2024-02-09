<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ServiceRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\State\ServiceStateProcessor;
use App\Security\Voter\ServiceVoter;
use ApiPlatform\Metadata\Link; 
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;
use App\Controller\CreateService;
use App\Entity\Store;
use ApiPlatform\Action\NotFoundAction;


#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['service-read']]),
        new Get(
            controller: NotFoundAction::class, 
            read: false, 
            output: false
        ),
        new Post(denormalizationContext: ['groups' => ['service-mutation']]),
        new Patch(denormalizationContext: ['groups' => ['service-mutation']]),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['service-read']],
    processor: ServiceStateProcessor::class,
)]
#[ApiResource(
    uriTemplate: '/stores/{storeId}/services/{id}',
    uriVariables: [
        'storeId' => new Link(fromClass: Store::class, toProperty: 'store'),
        'id' => new Link(fromClass: Service::class),
    ],
    operations: [ new Get(normalizationContext: ['groups' => ['service-read']]) ],
)]

/*
#[ApiResource(
    uriTemplate: '/stores/{id}/services',
    operations: [ new Post(normalizationContext: ['groups' => ['service-mutation']]) ],
    controller: CreateService::class,
)]
*/
#[ApiFilter(SearchFilter::class, properties: ['name' => 'ipartial'])]
#[ApiFilter(RangeFilter::class, properties: ['price'])]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['service-read', 'store-read-full'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank()]
    #[Assert\Length(min: 3, max: 255)]
    #[Groups(['service-read', 'service-mutation', 'store-read-full', 'store-read', 'booking-read-full'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank()]
    #[Assert\Length(min: 3, max: 255)]
    #[Groups(['service-read', 'service-mutation', 'store-read-full', 'admin-read-booking'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Assert\NotBlank()]
    #[Assert\PositiveOrZero()]
    #[Assert\LessThanOrEqual(720)] //12 hours
    #[Groups(['service-read', 'service-mutation', 'store-read-full', 'admin-read-booking'])]
    private ?int $time = null;

    #[ORM\ManyToOne(inversedBy: 'services')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['service-read',  'service-mutation'])]
    private ?Store $store = null;

    #[ORM\Column]
    #[Assert\NotBlank()]
    #[Assert\PositiveOrZero()]
    #[Groups(['service-read',  'service-mutation', 'store-read-full', 'admin-read-booking'])]
    private ?float $price = null;

    #[ORM\OneToMany(mappedBy: 'service', targetEntity: Booking::class)]
    private Collection $bookings;

    public function __construct()
    {
        $this->bookings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getTime(): ?int
    {
        return $this->time;
    }

    public function setTime(int $time): static
    {
        $this->time = $time;

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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): static
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings->add($booking);
            $booking->setService($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): static
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getService() === $this) {
                $booking->setService(null);
            }
        }

        return $this;
    }
}
