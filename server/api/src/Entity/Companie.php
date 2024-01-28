<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CompanieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompanieRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['read-companie']],
)]
class Companie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[Groups(['read-user-mutation', 'read-companie'])]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['read-user-mutation', 'read-companie'])]
    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[Groups(['read-user-mutation', 'read-companie'])]
    #[ORM\Column(length: 255)]
    private ?string $kbis = null;

    #[Groups(['read-user-mutation', 'read-companie'])]
    #[ORM\Column]
    private ?bool $isValid = false;

    #[Groups(['read-companie'])]
    #[ORM\OneToMany(mappedBy: 'companie', targetEntity: Store::class)]
    private Collection $stores;

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
            $store->setCompanie($this);
        }

        return $this;
    }

    public function removeStore(Store $store): static
    {
        if ($this->stores->removeElement($store)) {
            // set the owning side to null (unless already changed)
            if ($store->getCompanie() === $this) {
                $store->setCompanie(null);
            }
        }

        return $this;
    }
}
