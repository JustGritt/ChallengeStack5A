<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CompanieRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
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
use App\State\CompanieStateProvider;
use App\Controller\AdminCompanyDashboardStats;

#[ORM\Entity(repositoryClass: CompanieRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(normalizationContext: ['groups' => ['read-companie']], provider: CompanieStateProvider::class),
        new Get(normalizationContext: ['groups' => ['read-companie']]),
        new Post(denormalizationContext: ['groups' => ['create-companie']]),
        new Patch(denormalizationContext: ['groups' => ['update-companie']]),
    ],
    normalizationContext: ['groups' => ['read-companie']],
    processor: CompanieStateProcessor::class,
)]
#[ApiResource(
    operations: [
         new Get(
            uriTemplate: '/company/{id}/dashboard', 
            controller: AdminCompanyDashboardStats::class, 
         ) 
    ],
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

    #[Groups(['read-user-mutation', 'read-companie' , 'create-companie'])]
    #[Assert\NotBlank]
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

    #[Groups(['create-companie', 'admin-read'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $rcs = null;

    #[Groups(['create-companie', 'update-companie', 'admin-read'])]
    #[ORM\Column]
    #[Assert\NotBlank]
    #[Assert\Positive]
    private ?int $capital = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $adresse = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(callback: 'getStructureChoice')]
    private ?string $structure = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $company_duration = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $registrationDate = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $firstname = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 3, max: 255)]
    private ?string $lastname = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $birthday = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $birthdayPlace = null;

    #[Groups(['update-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $ownerAdresse = null;

    #[Groups(['read-user-mutation', 'update-companie', 'read-companie', 'admin-read'])]
    #[ORM\Column]
    private ?bool $refused = false;

    #[Groups(['update-companie', 'read-companie', 'create-companie', 'admin-read'])]
    #[ORM\Column(type: Types::TIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $endDuration = null;

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

    public function getRcs(): ?string
    {
        return $this->rcs;
    }

    public function setRcs(?string $rcs): static
    {
        $this->rcs = $rcs;

        return $this;
    }

    public function getCapital(): ?int
    {
        return $this->capital;
    }

    public function setCapital(?int $capital): static
    {
        $this->capital = $capital;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(?string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getStructure(): ?string
    {
        return $this->structure;
    }

    public function setStructure(string $structure): static
    {
        $this->structure = $structure;

        return $this;
    }

    public function getCompanyDuration(): ?\DateTimeInterface
    {
        return $this->company_duration;
    }

    public function setCompanyDuration(?\DateTimeInterface $company_duration): static
    {
        $this->company_duration = $company_duration;

        return $this;
    }

    public function getRegistrationDate(): ?\DateTimeInterface
    {
        return $this->registrationDate;
    }

    public function setRegistrationDate(?\DateTimeInterface $registrationDate): static
    {
        $this->registrationDate = $registrationDate;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(?\DateTimeInterface $birthday): static
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getBirthdayPlace(): ?string
    {
        return $this->birthdayPlace;
    }

    public function setBirthdayPlace(?string $birthdayPlace): static
    {
        $this->birthdayPlace = $birthdayPlace;

        return $this;
    }

    public function getOwnerAdresse(): ?string
    {
        return $this->ownerAdresse;
    }

    public function setOwnerAdresse(?string $ownerAdresse): static
    {
        $this->ownerAdresse = $ownerAdresse;

        return $this;
    }

    public function isRefused(): ?bool
    {
        return $this->refused;
    }

    public function setRefused(bool $refused): static
    {
        $this->refused = $refused;

        return $this;
    }

    public static function getStructureChoice(): array
    {
        return ['SA', 'SAS', 'SARL', 'EURL', 'SASU', 'GIE', 'SCI', 'SCA', 'SCOP', 'SNC', 'SDF', 'SEL', 'SELARL', 'SEP', 'SNC', 'SARLU', 'OTHER'];
    }

    public function getEndDuration(): ?\DateTimeInterface
    {
        return $this->endDuration;
    }

    public function setEndDuration(?\DateTimeInterface $endDuration): static
    {
        $this->endDuration = $endDuration;

        return $this;
    }
}
