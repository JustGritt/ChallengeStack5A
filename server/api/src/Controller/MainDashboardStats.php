<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\User;
use App\Entity\Store;
use App\Entity\Booking;
use App\Entity\Service;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

#[AsController]
class MainDashboardStats extends AbstractController
{
    private JWTEncoderInterface $jwtEncoder;

    public function __construct (JWTEncoderInterface $jwtEncoder, EntityManagerInterface $entityManager)
    {
        $this->jwtEncoder =  $jwtEncoder;
        $this->entityManager = $entityManager;
    }


    public function getStats(Request $request): JsonResponse
    {
        $user = $this->getUser();
        //if the user isnt role SUPER_ADMIN return 403
        if ($user->getRoles()[0] !== 'ROLE_SUPER_ADMIN') {
            return $this->json(['message' => 'You are not allowed to access this page'], 403);
        }

        $stats = [
            'total_bookings_today' => $this->getTotalBookings(new \DateTime('today'), new \DateTime('tomorrow')),
            'total_bookings_last_day' => $this->getTotalBookings(new \DateTime('yesterday'), new \DateTime('today')),
            'total_bookings_month' => $this->getTotalBookings(new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_bookings_from_beginning' => $this->getTotalBookings(null, null, true),
            'total_benefits' => $this->getTotalBenefits(new \DateTime('today'), new \DateTime('tomorrow')),
            'total_benefits_last_day' => $this->getTotalBenefits( new \DateTime('yesterday'), new \DateTime('today')),
            'total_benefits_month' => $this->getTotalBenefits( new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_benefits_from_beginning' => $this->getTotalBenefits( null, null, true),
            'total_cancelled_bookings_today' => $this->getTotalCancelledBookings( new \DateTime('today'), new \DateTime('tomorrow')),
            'total_cancelled_bookings_last_day' => $this->getTotalCancelledBookings( new \DateTime('yesterday'), new \DateTime('today')),
            'total_cancelled_bookings_month' => $this->getTotalCancelledBookings( new \DateTime('first day of this month'), new \DateTime('last day of this month')),
            'total_cancelled_bookings_from_beginning' => $this->getTotalCancelledBookings( null, null, true),
        ];

        return $this->json($stats, 200);
       
    }

    private function getTotalBookings(\DateTime $from = null, \DateTime $to = null, $full = false): int
    {
        if ($full) {
            //get the count of all booking 
            return $this->entityManager->getRepository(Booking::class)->count([]);
        }
        
        //get the count of all booking between the dates using interval
        $result =  $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('count(b.id)')
            ->where('b.startDate >= :from')
            ->andWhere('b.endDate < :to')
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();
    
        return $result;
    }
   
    private function getTotalBenefits(\DateTime $from = null, \DateTime $to = null, $full = false): int
    {
        if ($full) {
            $bookings = $this->entityManager->getRepository(Booking::class)->findAll();
            $total = 0;
            foreach ($bookings as $booking) {
                $total += $booking->getService()->getPrice();
            }

            return $total;
        }
        
        $total = $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('SUM(s.price)')
            ->join('b.service', 's')
            ->where('b.startDate >= :from')
            ->andWhere('b.endDate < :to')
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();

        return $total ? $total : 0;
    }

    private function getTotalCancelledBookings(\DateTime $from = null, \DateTime $to = null, $full = false): int
    {
        if ($full) {
            return $this->entityManager->getRepository(Booking::class)->count(['cancelled' => 'true']);
        }
        
        $result =  $this->entityManager->getRepository(Booking::class)->createQueryBuilder('b')
            ->select('count(b.id)')
            ->where('b.startDate >= :from')
            ->andWhere('b.endDate < :to')
            ->andWhere('b.cancelled = true')
            ->setParameter('from', $from)
            ->setParameter('to', $to)
            ->getQuery()
            ->getSingleScalarResult();
    
        return $result;
    }
  
}