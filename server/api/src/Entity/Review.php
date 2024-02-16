<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReviewRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Link;
use App\State\ReviewStateProcessor;

#[ORM\Entity(repositoryClass: ReviewRepository::class)]
#[ApiResource(
    operations: [
        new Post(denormalizationContext: ['groups' => ['review-mutation']]),
        new Patch(denormalizationContext: ['groups' => ['review-mutation-patch']]),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['review-read']],
    processor: ReviewStateProcessor::class,
)]
#[ApiResource(
    uriTemplate: '/service/{id}/reviews',
    uriVariables: [
        'id' => new Link(fromClass: Store::class, toProperty: 'service'),
    ],
    operations: [ new Get(normalizationContext: ['groups' => ['review-read']]) ],
)]
class Review
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 10, max: 4000, minMessage: 'The content must be at least {{ limit }} characters long', maxMessage: 'The content cannot be longer than {{ limit }} characters')]
    #[Groups(['review-mutation', 'review-read', 'review-mutation-patch'])]
    private ?string $content = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-read'])]
    private ?User $customer = null;

    #[ORM\ManyToOne(inversedBy: 'reviews')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['review-mutation', 'review-read'])]
    private ?Service $service = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;

        return $this;
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

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }
}
