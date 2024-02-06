<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Postmark\PostmarkClient;
use Symfony\Component\HttpFoundation\Request;

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

    public function sendNewEmailConfirmation(Request $request): JsonResponse
    {
       
        try {
            $data = json_decode($request->getContent(), true);
            $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        
            if (!$user instanceof User) {
                return $this->json(['message' => 'Invalid email'], 400);
            }
            if ($user->isIsValid()) {
                return $this->json(['message' => 'Email already confirmed'], 403);
            }
            
            $token = $this->jwtEncoder->encode(['email' =>  $data['email'], 'exp' => time() + 3600]);
      
            $client = new PostmarkClient($_ENV['MAILER_TOKEN']);

            $client->sendEmailWithTemplate(
                'contact@charlesparames.com',
                $user->getEmail(),
                34574592,
                [
                    'user' => $user->getFirstname(),
                    'action_url' => 'https://challenge-stack5-a.vercel.app/confirm-email/' . $token,
                    'login_url' => 'Go to the blog',
                ]);
            
            return $this->json(['message' => 'Email confirmation sent']);
        }catch (\Exception $e) {
            return new JsonResponse(['message' => 'Invalid email test'], 400);
        }
    }
}
