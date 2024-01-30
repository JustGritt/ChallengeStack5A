<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\StoreRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\MaxDepth;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\ORM\EntityManagerInterface;

#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['store-read']]),
        new Get(normalizationContext: ['groups' => ['store-read', 'store-read-full']], security: 'is_granted("STORE_VIEW", object)'),
        new Post(denormalizationContext: ['groups' => ['create-stores']], security: 'is_granted("STORE_POST", object)'),
        new Patch(denormalizationContext: ['groups' => ['update-companie']], security: 'is_granted("STORE_PATCH", object)'),
        /*
        new Post(name: 'add-user-to-store', routeName: 'add_user_to_store', openapiContext: [
                'summary' => 'Add user to store',
                'description' => 'Add user to store',
                'parameters' => [
                    [
                        'name' => 'store',
                        'in' => 'path',
                        'required' => true,
                        'type' => 'string',
                        'description' => 'The store id',
                    ],
                ],
                'responses' => [
                    '200' => [
                        'description' => 'User added to store',
                    ],
                    '404' => [
                        'description' => 'User or store not found',
                    ],
                    '400' => [
                        'description' => 'Invalid token',
                    ],
                ],
            ],

        denormalizationContext: ['groups' => ['add-user']], security: 'is_granted("STORE_PATCH", object)',
    ),
        */
    ],
    normalizationContext: ['groups' => ['store-read']],
)]
#[ORM\Entity(repositoryClass: StoreRepository::class)]
class Store
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores'])]
    private ?int $id = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $name = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $address = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $postal_code = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $country = null;

    #[Groups(['read-user-mutation', 'read-companie', 'store-read', 'create-stores', 'update-companie'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $city = null;

    #[Groups(['store-read-full', 'create-stores', 'update-companie'])]
    #[ORM\OneToMany(mappedBy: 'work', targetEntity: User::class )]
    private Collection $users;

    #[Groups(['store-read-full', 'create-stores'])]
    #[ORM\ManyToOne(inversedBy: 'stores')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Companie $company = null;

    public function __construct()
    {
        $this->users = new ArrayCollection();
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
        return $this->postal_code;
    }

    public function setPostalCode(string $postal_code): static
    {
        $this->postal_code = $postal_code;

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
}
