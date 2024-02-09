<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Twig\Environment;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

#[AsController]
class ConfirmUserEmail extends AbstractController
{

    public function __construct (private JWTEncoderInterface $jwtEncoder, private EntityManagerInterface $entityManager, private MailerInterface $mailer, private Environment $twig)
    {
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
            
            $email = (new Email())
                ->from('contact@charlesparames.com')
                ->to($user->getEmail())
                ->subject('Welcome to Odicylens!')
                ->text($this->twig->render('email/welcome.txt.twig', [
                    'email' => $user->getFirstname(),
                    'action_url' => 'https://challenge-stack5-a.vercel.app/confirm-email/' . $token,
                ]))
                ->html($this->twig->render('email/welcome.html.twig', [
                    'email' => $user->getFirstname(),
                    'action_url' => 'https://challenge-stack5-a.vercel.app/confirm-email/' . $token,
                ]));

            $this->mailer->send($email);

            /*
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
            */
            
            return $this->json(['message' => 'Email confirmation sent']);
        }catch (\Exception $e) {
            return new JsonResponse(['message' => 'Invalid email test'], 400);
        }
    }
}
