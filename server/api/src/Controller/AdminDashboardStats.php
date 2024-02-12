<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Store;
use App\Entity\Booking;
use App\Entity\Service;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;


#[AsController]
class AdminDashboardStats extends AbstractController
{

    public function __construct (private JWTEncoderInterface $jwtEncoder, private EntityManagerInterface $entityManager)
    {
    }


    public function __invoke(Store $store)
    {
        $user = $this->getUser();

        /*
        if (!$user instanceof User || !$store instanceof Store) {
            throw new AccessDeniedException('Sorry, you are not allowed to access this resource.');
        }

        if ($user->getCompanie() !== $store->getCompany() || null !== $user->getWork() && $user->getWork() !== $store) {
            throw new AccessDeniedException('Sorry, you are not allowed to access this resource.');
        }
        */
        
        $stats = [
            'total_bookings_today' => $this->getTotalBookings($store, new \DateTime('today'), new \DateTime('tomorrow')),
            'total_bookings_last_day' => $this->getTotalBookings($store, new \DateTime('yesterday'), new \DateTime('today')),
            'total_bookings_month' => $this->getTotalBookings($store, new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_bookings_from_beginning' => $this->getTotalBookings($store, null, null, true),
            'total_benefits' => $this->getTotalBenefits($store, new \DateTime('today'), new \DateTime('tomorrow')),
            'total_benefits_last_day' => $this->getTotalBenefits($store, new \DateTime('yesterday'), new \DateTime('today')),
            'total_benefits_month' => $this->getTotalBenefits($store, new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_benefits_from_beginning' => $this->getTotalBenefits($store, null, null, true),
            'total_cancelled_bookings_today' => $this->getTotalCancelledBookings($store, new \DateTime('today'), new \DateTime('tomorrow')),
            'total_cancelled_bookings_last_day' => $this->getTotalCancelledBookings($store, new \DateTime('yesterday'), new \DateTime('today')),
            'total_cancelled_bookings_month' => $this->getTotalCancelledBookings($store, new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_cancelled_bookings_from_beginning' => $this->getTotalCancelledBookings($store, null, null, true),
        ];

        return $this->json($stats, 200);
    }

    private function getTotalBookings(Store $store, \DateTime $from = null, \DateTime $to = null, $full = false): int
    {
        if ($full) {
            return $this->entityManager->getRepository(Booking::class)->count(['store' => $store]);
        }

        $total = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('COUNT(b.id)')
            ->where('b.store = :store')
            ->andWhere('b.startDate >= :from')
            ->andWhere('b.endDate <= :to')
            ->setParameter('store', $store)
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();

        return $total;
    }

    private function getTotalBenefits(Store $store, \DateTime $from = null, \DateTime $to = null, $full = false): float
    {
        if ($full) {
           //get all bookings 
            $bookings = $this->entityManager->getRepository(Booking::class)->findBy(['store' => $store]);
            $total = 0;
            foreach ($bookings as $booking) {
                $total += $booking->getService()->getPrice();
            }

            return $total;
        }

        
        $total = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('SUM(s.price)')
            ->leftJoin('b.service', 's')
            ->where('b.store = :store')
            ->andWhere('b.startDate >= :from')
            ->andWhere('b.endDate <= :to')
            ->setParameter('store', $store)
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();

        return $total ? $total : 0;
    }

    private function getTotalCancelledBookings(Store $store, \DateTime $from = null, \DateTime $to = null, $full = false): int
    {
        if ($full) {
            return $this->entityManager->getRepository(Booking::class)->count(['store' => $store, 'cancelled' => true]);
        }

        $total = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('COUNT(b.id)')
            ->where('b.store = :store')
            ->andWhere('b.startDate >= :from')
            ->andWhere('b.endDate <= :to')
            ->andWhere('b.cancelled = true')
            ->setParameter('store', $store)
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();

        return $total;
    }
}