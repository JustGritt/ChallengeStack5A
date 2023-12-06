<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

final class RegistrationMailEventSubscriber implements EventSubscriberInterface
{

    public function __construct(private readonly MailerInterface $mailer)
    {
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMail(ViewEvent $event): void
    {
        $user = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        $message = (new Email())
            ->from('contact@charlesparames.com')
            ->to('charles258@hotmail.fr')
            ->subject('Welcome to the blog')
            ->html('<p>Thank you for your registration</p>');

        $this->mailer->send($message);
    }
}