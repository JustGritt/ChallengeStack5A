<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mercure\Publish;
use Symfony\Component\Mercure\Update;
use Twig\Environment;

class UserRegistrationMailEventSubscriber implements EventSubscriberInterface
{

    public function __construct(
        private readonly MailerInterface $mailer,
        private readonly Environment $twig,
    ) {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['sendUserMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendUserMail(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        dump($user, $method);


        // Your email sending logic
       // $this->sendEmail($response);
    }

    private function sendEmail(User $user): void
    {
        // Your email sending logic here...
        $message = (new Email())
            ->from('contact@charlesparames.com')
            ->to('charles258@hotmail.fr')
            ->subject('Welcome to the blog')
            ->html($this->twig->render('email/welcome.html.twig', ['user' => $user]));

        $this->mailer->send($message);
    }

}
