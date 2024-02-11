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
class AdminCompanyDashboardStats extends AbstractController
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

        if (null !== $user->getCompanie() && $user->getCompanie() !== $company || null !== $user->getWork() && $user->getWork()->getCompany() !== $company) {
            throw new AccessDeniedException('Sorry, you are not allowed to access this resource.');
        }
        
        $stats = [
            'total_bookings_today' => $this->getTotalBookings($company, new \DateTime('today'), new \DateTime('tomorrow')),
            'total_bookings_last_day' => $this->getTotalBookings($company, new \DateTime('yesterday'), new \DateTime('today')),
            'total_bookings_month' => $this->getTotalBookings($company, new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_bookings_from_beginning' => $this->getTotalBookings($company, null, null, true),
            'total_benefits' => $this->getTotalBenefits($company, new \DateTime('today'), new \DateTime('tomorrow')),
            'total_benefits_last_day' => $this->getTotalBenefits($company, new \DateTime('yesterday'), new \DateTime('today')),
            'total_benefits_month' => $this->getTotalBenefits($company, new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_benefits_from_beginning' => $this->getTotalBenefits($company, null, null, true),
            'total_cancelled_bookings_today' => $this->getTotalCancelledBookings($company, new \DateTime('today'), new \DateTime('tomorrow')),
            'total_cancelled_bookings_last_day' => $this->getTotalCancelledBookings($company, new \DateTime('yesterday'), new \DateTime('today')),
            'total_cancelled_bookings_month' => $this->getTotalCancelledBookings($company, new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_cancelled_bookings_from_beginning' => $this->getTotalCancelledBookings($company, null, null, true),
        ];

        return $this->json($stats, 200);
    }

    private function getTotalBookings(Companie $company, \DateTime $from = null, \DateTime $to = null, $full = false): int
    {

        $stores = $this->entityManager->getRepository(Store::class)->findBy(['company' => $company]);

        if ($full) {
            $total = 0;
            foreach ($stores as $store) {
                $total += $this->entityManager->getRepository(Booking::class)->count(['store' => $store]);
            }

            return $total;
        }

        $total = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('COUNT(b.id)')
            ->where('b.store IN (:stores)')
            ->andWhere('b.startDate >= :from')
            ->andWhere('b.endDate <= :to')
            ->setParameter('stores', $stores)
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();

        return $total;
    }

    private function getTotalBenefits(Companie $company, \DateTime $from = null, \DateTime $to = null, $full = false): float
    {
        $stores = $this->entityManager->getRepository(Store::class)->findBy(['company' => $company]);

        if ($full) {
           //get all bookings 
            $bookings = $this->entityManager->getRepository(Booking::class)->findBy(['store' => $stores]);
            $total = 0;
            foreach ($bookings as $booking) {
                $total += $booking->getService()->getPrice();
            }

            return $total;
        }

        
        $total = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('SUM(s.price)')
            ->leftJoin('b.service', 's')
            ->where('b.store IN (:stores)')
            ->andWhere('b.startDate >= :from')
            ->andWhere('b.endDate <= :to')
            ->setParameter('stores', $stores)
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();

        return $total ? $total : 0;
    }

    private function getTotalCancelledBookings(Companie $company, \DateTime $from = null, \DateTime $to = null, $full = false): int
    {
        $stores = $this->entityManager->getRepository(Store::class)->findBy(['company' => $company]);

        if ($full) {
           return $this->entityManager->getRepository(Booking::class)->count(['store' => $stores, 'cancelled' => true]);
        }

        $total = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('COUNT(b.id)')
            ->where('b.store IN (:stores)')
            ->andWhere('b.startDate >= :from')
            ->andWhere('b.endDate <= :to')
            ->andWhere('b.cancelled = true')
            ->setParameter('stores', $stores)
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();

        return $total;
    }
}