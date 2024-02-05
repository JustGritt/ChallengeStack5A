<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;

#[AsController]
class ConfirmUserEmail extends AbstractController
{

    private JWTEncoderInterface $jwtEncoder;

    public function __construct (JWTEncoderInterface $jwtEncoder, EntityManagerInterface $entityManager)
    {
        $this->jwtEncoder =  $jwtEncoder;
        $this->entityManager = $entityManager;
    }


    public function confirmUser(string $token): JsonResponse
    {
        try {
            $token = $this->jwtEncoder->decode($token);
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $token['email']]);
            if ($user->isIsValid()) {
                return $this->json(['message' => 'Email already confirmed'], 403);
            }
            $user->setIsValid(true);
            $this->entityManager->flush();

            return $this->json(['message' => 'User email successfully confirmed']);

        }catch (\Exception $e) {
            return new JsonResponse(['message' => 'Invalid token'], 400);
        }
        
    }
}
