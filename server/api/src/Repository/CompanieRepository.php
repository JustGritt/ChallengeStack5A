<?php

namespace App\Repository;

use App\Entity\Companie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Companie>
 *
 * @method Companie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Companie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Companie[]    findAll()
 * @method Companie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompanieRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Companie::class);
    }

//    /**
//     * @return Companie[] Returns an array of Companie objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Companie
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
