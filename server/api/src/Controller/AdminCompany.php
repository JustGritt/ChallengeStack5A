<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Companie;
use App\Entity\Booking;
use App\Entity\Service;
use App\Entity\Store;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;


#[AsController]
class AdminCompany extends AbstractController
{

    public function __construct (private JWTEncoderInterface $jwtEncoder, private EntityManagerInterface $entityManager)
    {
    }


    public function __invoke(Companie $company)
    {
        $user = $this->getUser();

        if (!$user instanceof User || !$company instanceof Companie) {
            throw new AccessDeniedException('Sorry, you are not allowed to access this resource.');
        }

        if (null !== $user->getCompanie() && $user->getCompanie() !== $company || null !== $user->getWork() && $user->getWork()->getCompany() !== $company || !$user->getRoles() === ['ROLE_SUPER_ADMIN'] ){
            throw new AccessDeniedException('Sorry, you are not allowed to access this resource.');
        }

        //get all emloyees for a company 
        $stores = $this->entityManager->getRepository(Store::class)->findBy(['company' => $company]);

        $employees = $this->entityManager->getRepository(User::class)
            ->createQueryBuilder('u')
            ->select('u.firstname', 'u.email', 's.name as storeName')
            ->leftJoin('u.work', 's') // Assuming there is a property 'store' in your User entity representing the association with Store
            ->where('s.company = :company')
            ->setParameter('company', $company)
            ->getQuery()
            ->getResult();

        return $this->json($employees, 200);
    }

}