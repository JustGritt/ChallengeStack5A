<?php
namespace App\Serializer;

use ApiPlatform\Serializer\SerializerContextBuilderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use App\Entity\Booking;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Store;

final class BookingContextBuilder implements SerializerContextBuilderInterface
{
    private $decorated;
    private $authorizationChecker;
    private $security;
    private $entityManager;

    public function __construct(SerializerContextBuilderInterface $decorated, AuthorizationCheckerInterface $authorizationChecker, Security $security, EntityManagerInterface $entityManager)
    {
        $this->decorated = $decorated;
        $this->authorizationChecker = $authorizationChecker;
        $this->security = $security;
        $this->entityManager = $entityManager;
    }

    public function createFromRequest(Request $request, bool $normalization, ?array $extractedAttributes = null): array
    {
        $context = $this->decorated->createFromRequest($request, $normalization, $extractedAttributes);
        $resourceClass = $context['resource_class'] ?? null;

        $storeId = $request->attributes->get('id');
        if ($storeId === null) {
            return $context;
        }
        $store = $this->entityManager->getRepository(Store::class)->find($storeId);
        $user = $this->security->getUser();

       
        if ($resourceClass === Booking::class && isset($context['groups']) && null !== $store && null !== $user && $store->getCompany() == $user->getCompanie() && true === $normalization) {
            $context['groups'][] = 'admin-read-booking';
        }

        return $context;
    }
}