<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Booking;
use App\Entity\Store;
use App\Entity\Schedule;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;


#[AsController]
class StoreFreeTime extends AbstractController
{

    public function __construct (private JWTEncoderInterface $jwtEncoder, private EntityManagerInterface $entityManager)
    {
    }

    public function __invoke(Store $store)
    {
        $schedules = $this->entityManager->getRepository(Schedule::class)->findBy(['store' => $store->getId(), 'onVacation' => false, 'refused' => false]);
        $bookings = $this->entityManager->getRepository(Booking::class)->findBy(['store' => $store->getId()]);

        $availableTimeSlots = [];

        foreach ($schedules as $schedule) {
            // Initialize the available time slots array with the full schedule
            $timeSlots = [
                ['startDate' => $schedule->getStartDate(), 'endDate' => $schedule->getEndDate(), 'employee' => $schedule->getEmployee()]
            ];

            foreach ($bookings as $booking) {
                $newTimeSlots = [];

                foreach ($timeSlots as $timeSlot) {
                    // Check if the booking overlaps with the current time slot
                    if ($booking->getEndDate() > $timeSlot['startDate'] && $booking->getStartDate() < $timeSlot['endDate']) {
                        // Split the time slot into two parts (before and after the booking)
                        if ($booking->getStartDate() > $timeSlot['startDate']) {
                            $newTimeSlots[] = ['startDate' => $timeSlot['startDate'], 'endDate' => $booking->getStartDate(), 'employee' => $timeSlot['employee']];
                        }
                        if ($booking->getEndDate() < $timeSlot['endDate']) {
                            $newTimeSlots[] = ['startDate' => $booking->getEndDate(), 'endDate' => $timeSlot['endDate'], 'employee' => $timeSlot['employee']];
                        }
                    } else {
                        // If no overlap, keep the original time slot
                        $newTimeSlots[] = $timeSlot;
                    }
                }
                // Update the time slots array with the newly created time slots
                $timeSlots = $newTimeSlots;
            }

            // Add the available time slots to the result array
            $availableTimeSlots = array_merge($availableTimeSlots, $timeSlots);
        }

        return $this->json($availableTimeSlots, 200, [], ['groups' => 'schedule-read']);
    }

}