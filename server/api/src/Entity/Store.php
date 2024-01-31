<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\StoreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use App\State\StoresStateProcessor;

#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['store-read']]),
        new Get(normalizationContext: ['groups' => ['store-read', 'store-read-full']], security: 'is_granted("STORE_VIEW", object)'),
        new Post(denormalizationContext: ['groups' => ['create-stores']]),
        new Patch(denormalizationContext: ['groups' => ['update-companie']]),
    ],  
    normalizationContext: ['groups' => ['store-read']],
    processor: StoresStateProcessor::class,
)]
#[ORM\Entity(repositoryClass: StoreRepository::class)]
class Store
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'service-read'])]
    private ?int $id = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie', 'service-read'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank()]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $name = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank()]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $address = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank()]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $postalCode = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank()]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $country = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank()]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $city = null;

    #[Groups(['store-read-full', 'update-companie'])]
    #[ORM\OneToMany(mappedBy: 'work', targetEntity: User::class)]
    private Collection $users;

    #[Groups(['store-read-full'])]
    #[ORM\ManyToOne(inversedBy: 'stores')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Companie $company = null;

    #[Groups(['read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column]
    private ?float $latitude = null;

    #[Groups(['read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column]
    private ?float $longitude = null;

    #[Groups(['store-read-full'])]
    #[ORM\OneToMany(mappedBy: 'store', targetEntity: Service::class, orphanRemoval: true)]
    private Collection $services;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->services = new ArrayCollection();
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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): static
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setWork($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getWork() === $this) {
                $user->setWork(null);
            }
        }

        return $this;
    }

    public function getCompany(): ?Companie
    {
        return $this->company;
    }

    public function setCompany(?Companie $company): static
    {
        $this->company = $company;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(float $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setStore($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        if ($this->services->removeElement($service)) {
            // set the owning side to null (unless already changed)
            if ($service->getStore() === $this) {
                $service->setStore(null);
            }
        }

        return $this;
    }
}
