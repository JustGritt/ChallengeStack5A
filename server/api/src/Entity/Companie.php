<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CompanieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use App\State\CompanieStateProcessor;

#[ORM\Entity(repositoryClass: CompanieRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['read-companie']]),
        #new Get(normalizationContext: ['groups' => ['read-companie']], security: 'is_granted("COMPANIE_VIEW", object)'),
        new Post(denormalizationContext: ['groups' => ['create-companie']]),
        new Patch(denormalizationContext: ['groups' => ['update-companie']]),
    ],
    normalizationContext: ['groups' => ['read-companie']],
    processor: CompanieStateProcessor::class,
)]
class Companie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['read-user-mutation', 'read-companie', 'store-read'])]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['read-user-mutation', 'read-companie', 'create-companie', 'update-companie', 'store-read'])]
    #[ORM\Column(length: 255, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $name = null;

    #[Groups(['read-user-mutation', 'read-companie' , 'create-companie', 'update-companie'])]
    #[ORM\Column(length: 255)]
    private ?string $kbis = null;

    #[Groups(['read-user-mutation', 'read-companie', 'update-companie'])]
    #[ORM\Column]
    private ?bool $isValid = false;

    #[Groups(['read-companie'])]
    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Store::class)]
    private Collection $stores;

    #[Groups(['read-companie'])]
    #[ORM\OneToOne(inversedBy: 'companie', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner = null;

    public function __construct()
    {
        $this->stores = new ArrayCollection();
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

    public function getKbis(): ?string
    {
        return $this->kbis;
    }

    public function setKbis(string $kbis): static
    {
        $this->kbis = $kbis;

        return $this;
    }

    public function isIsValid(): ?bool
    {
        return $this->isValid;
    }

    public function setIsValid(bool $isValid): static
    {
        $this->isValid = $isValid;

        return $this;
    }

    /**
     * @return Collection<int, Store>
     */
    public function getStores(): Collection
    {
        return $this->stores;
    }

    public function addStore(Store $store): static
    {
        if (!$this->stores->contains($store)) {
            $this->stores->add($store);
            $store->setCompany($this);
        }

        return $this;
    }

    public function removeStore(Store $store): static
    {
        if ($this->stores->removeElement($store)) {
            // set the owning side to null (unless already changed)
            if ($store->getCompany() === $this) {
                $store->setCompany(null);
            }
        }

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }
}
