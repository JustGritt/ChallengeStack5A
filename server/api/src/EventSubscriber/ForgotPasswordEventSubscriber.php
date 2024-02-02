<?php
namespace App\EventSubscriber;

use CoopTilleuls\ForgotPasswordBundle\Event\CreateTokenEvent;
use CoopTilleuls\ForgotPasswordBundle\Event\UpdatePasswordEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Postmark\PostmarkClient;


final class ForgotPasswordEventSubscriber implements EventSubscriberInterface
{
    public function __construct(private readonly UserPasswordHasherInterface $hasher, private readonly MailerInterface $mailer, private readonly Environment $twig)
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

        $client = new PostmarkClient($_ENV['MAILER_TOKEN']);
        /*
        $message = (new Email())
            ->from('contact@charlesparames.com')
            ->to($user->getEmail())
            ->subject('Reset your password')
            ->html($this->twig->render('ResetPassword/mail.html.twig', 
                [
                    'token' =>  $passwordToken->getToken(),
                ]
            ));
            */
        $action_url = 'https://localhost:8000/forgot-password/' . $passwordToken->getToken();
        $client->sendEmailWithTemplate(
            'contact@charlesparames.com',
            $user->getEmail(),
            123456,
            [
                'email' => $user->getEmail(),
                'action_url' =>  $action_url,
            ]
        );

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