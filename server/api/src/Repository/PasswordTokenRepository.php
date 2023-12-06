<?php

namespace App\Repository;

use App\Entity\PasswordToken;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PasswordToken>
 *
 * @method PasswordToken|null find($id, $lockMode = null, $lockVersion = null)
 * @method PasswordToken|null findOneBy(array $criteria, array $orderBy = null)
 * @method PasswordToken[]    findAll()
 * @method PasswordToken[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PasswordTokenRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PasswordToken::class);
    }

//    /**
//     * @return PasswordToken[] Returns an array of PasswordToken objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?PasswordToken
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
