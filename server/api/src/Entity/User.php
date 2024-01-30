<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\State\UserProcessor;
use App\Controller\ConfirmUserEmail;

#[ApiResource(
    operations: [
        new Get(uriTemplate: '/users/me', name: "getuserinfo", normalizationContext: ['groups' => ['read-user-mutation']]),
        new Get(normalizationContext: ['groups' => ['read-user']]),
        new Post(denormalizationContext: ['groups' => ['create-user']]),
        new Patch(denormalizationContext: ['groups' => ['update-user']]),
        new Get(name: 'confirm', routeName: 'confirm_email' , openapiContext: [
                'summary' => 'Confirm user email',
                'description' => 'Confirm user email',
                'parameters' => [
                    [
                        'name' => 'token',
                        'in' => 'path',
                        'required' => true,
                        'type' => 'string',
                        'description' => 'The confirmation token',
                    ],
                ],
                'responses' => [
                    '200' => [
                        'description' => 'User email successfully confirmed',
                    ],
                    '404' => [
                        'description' => 'User not found',
                    ],
                    '400' => [
                        'description' => 'Invalid token',
                    ],
                ],
            ]),
            
        ],
    normalizationContext: ['groups' => ['read-user', 'read-user-mutation']],
    processor: UserProcessor::class,
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(['email'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups(['read-user-mutation', 'read-companie', 'store-read-full'])]
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    private ?int $id = null;

    #[Assert\Email()]
    #[Groups(['read-user-as-admin', 'create-user', 'read-user-mutation',  'store-read-full', 'read-companie', 'add-user-to-store'])]
    #[Assert\NotBlank()]
    #[Assert\Email()]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['store-read-full', 'read-user-mutation'])]
    private array $roles = [];

    #[Assert\NotBlank()]
    #[Assert\Length(min: 2, max: 255)]
    #[Groups(['read-user', 'create-user', 'update-user',  'read-user-mutation',  'store-read-full'])]
    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['create-user', 'update-user'])]
    #[Assert\NotBlank()]
    #[Assert\Length(min: 6, max: 255)]
    private string $plainPassword = '';

    #[Groups(['read-user',  'update-user', 'read-user-mutation'])]
    #[ORM\Column(nullable: true)]
    private ?bool $isValid = false;

    #[Groups(['read-user', 'update-user', 'read-user-mutation'])]
    #[ORM\ManyToOne(inversedBy: 'users')]
    private ?Store $work = null;

    #[Groups(['read-user', 'read-user-mutation'])]
    #[ORM\OneToOne(mappedBy: 'owner', cascade: ['persist', 'remove'])]
    private ?Companie $companie = null;

    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getPlainPassword(): string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
        $this->password = $plainPassword;
    }

    public function isIsValid(): ?bool
    {
        return $this->isValid;
    }

    public function setIsValid(?bool $isValid): static
    {
        $this->isValid = $isValid;

        return $this;
    }

    public function getWork(): ?Store
    {
        return $this->work;
    }

    public function setWork(?Store $work): static
    {
        $this->work = $work;

        return $this;
    }

    public function getCompanie(): ?Companie
    {
        return $this->companie;
    }

    public function setCompanie(Companie $companie): static
    {
        // set the owning side of the relation if necessary
        if ($companie->getOwner() !== $this) {
            $companie->setOwner($this);
        }

        $this->companie = $companie;

        return $this;
    }


}