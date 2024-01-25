<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

/**
 * @implements ProcessorInterface<User, User|void>
 */
final class UserProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire('@api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire('@api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        private MailerInterface $mailer,
        private Environment $twig,
        private JWTEncoderInterface $jwtEncoder

    )
    {
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
        //create a jwt token with the id of the user
        //send the token in the email
        $jwt = $this->jwtEncoder->encode(['id' => $user->getId(), 'exp' => time() + 3600]);

        $message = (new Email())
        ->from('contact@charlesparames.com')
        ->to($user->getEmail())
        ->subject('Welcome to the Odicylens')
        ->html($this->twig->render('email/welcome.html.twig', [
            'user' => $user->getFirstname(),
            'action_url' => 'https://localhost:8000/confirm-email/' . $jwt,
            'login_url' => 'Go to the blog',
        ]));

        $this->mailer->send($message);
    }
}