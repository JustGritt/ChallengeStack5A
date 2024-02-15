<?php
namespace App\Serializer;

use ApiPlatform\Serializer\SerializerContextBuilderInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use App\Entity\Companie;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Store;

final class CompanieContextBuilder implements SerializerContextBuilderInterface
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

        $companyId = $request->attributes->get('id');
        if ($companyId === null) {
            return $context;
        }
        $company = $this->entityManager->getRepository(Companie::class)->find($companyId);
        $user = $this->security->getUser();
        //check if the user is admin
        $isAdmin = null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN';

       
        if ($resourceClass === Companie::class && isset($context['groups']) && null !== $company && null !== $user && ($company == $user->getCompanie() || $isAdmin) && true === $normalization) {
            $context['groups'][] = 'admin-read';
        }

        return $context;
    }
}