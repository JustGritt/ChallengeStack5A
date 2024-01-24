<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\State\PersistProcessor;
use ApiPlatform\Core\Bridge\Doctrine\Orm\State\RemoveProcessor;
use ApiPlatform\Metadata\DeleteOperationInterface;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

final class UserStateProcessor implements ProcessorInterface
{
    public function __construct(
        private RemoveProcessor $removeProcessor,
        private PersistProcessor $persistProcessor,
        private MailerInterface $mailer,
        private \Twig\Environment $twig
    ) {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }
    
        $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        $this->sendWelcomeEmail($data);

        return $result;
    }

    private function sendWelcomeEmail(User $user): void
    {
        $message = (new Email())
        ->from('contact@charlesparames.com')
        ->to('charles258@hotmail.fr')
        ->subject('Welcome to the blog')
        ->html($this->twig->render('email/welcome.html.twig', ['user' => $user]));

        $this->mailer->send($message);
    }
 
}
