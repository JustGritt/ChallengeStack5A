<?php
namespace App\EventSubscriber;

use CoopTilleuls\ForgotPasswordBundle\Event\CreateTokenEvent;
use CoopTilleuls\ForgotPasswordBundle\Event\UpdatePasswordEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Twig\Environment;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

final class ForgotPasswordEventSubscriber implements EventSubscriberInterface
{
    public function __construct(private UserPasswordHasherInterface $hasher, private MailerInterface $mailer, private Environment $twig)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            // Symfony 4.3 and inferior, use 'coop_tilleuls_forgot_password.create_token' event name
            CreateTokenEvent::class => 'onCreateToken',
            UpdatePasswordEvent::class => 'onUpdatePassword',
        ];
    }

    public function onCreateToken(CreateTokenEvent $event): void
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();


        //$client = new PostmarkClient($_ENV['MAILER_TOKEN']);

        $action_url = 'https://challenge-stack5-a.vercel.app/forgot-password/' . $passwordToken->getToken();


        
        $email = (new Email())
            ->from('contact@charlesparames.com')
            ->to($user->getEmail())
            ->subject('Reset your password')
            ->text($this->twig->render('ResetPassword/mail.txt.twig', [
                'email' => $user->getEmail(),
                'action_url' => $action_url,
            ]))
            ->html($this->twig->render('ResetPassword/mail.html.twig', [
                'email' => $user->getEmail(),
                'action_url' => $action_url,
            ]));
           

        $this->mailer->send($email);
        
        /*
        $client->sendEmailWithTemplate(
            'contact@charlesparames.com',
            $user->getEmail(),
            34624348,
            [
                'email' => $user->getEmail(),
                'action_url' =>  $action_url,
            ]
        );
        */

        #$this->mailer->send($message);
    }

    public function onUpdatePassword(UpdatePasswordEvent $event): void
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();
        $user->setPlainPassword($event->getPassword());
        $hashedPassword = $this->hasher->hashPassword($user, $user->getPlainPassword());
        $user->setPassword($hashedPassword);
        $user->eraseCredentials();
       //$this->userManager->updateUser($user);
    }
}