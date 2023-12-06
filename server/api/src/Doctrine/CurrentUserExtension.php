<?php
namespace App\Doctrine;

use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Metadata\Operation;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Bundle\SecurityBundle\Security;

final class CurrentUserExtension implements QueryItemExtensionInterface
{

    public function __construct(private readonly Security $security)
    {
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, Operation $operation = null, array $context = []): void
    {
        $this->addWhere($queryBuilder, $resourceClass, $operation);
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass, Operation $operation): void
    {
        $user = $this->security->getUser();
        dump($user, $operation);
       
        if (User::class !== $resourceClass || null === $user || $operation->getName() !== 'getuserinfo') {
            return;
        }

        dump($user);
        $rootAlias = $queryBuilder->getRootAliases()[0];
        $queryBuilder->andWhere(sprintf('%s.id = :idUser', $rootAlias));
        $queryBuilder->setParameter('idUser', $user->getId());
    }
}