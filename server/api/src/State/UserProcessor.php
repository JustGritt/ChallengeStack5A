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
use Postmark\PostmarkClient;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;


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
        private JWTEncoderInterface $jwtEncoder,
        private Security $security

    )
    {
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }
    
        if ($operation->getUriTemplate() === '/users{._format}' && $operation->getMethod() === 'POST') {
            $user = $this->security->getUser();
            $isAdmin = $user && in_array('ROLE_SUPER_ADMIN', $user->getRoles(), true);
            $companyOwner = null !== $user && $user && $user->getCompanie() !== null && $data->getWork() && $data->getWork()->getCompany()->getId() === $user->getCompanie()->getId() && $user->getCompanie()->isIsValid();
        
            if ($isAdmin || $companyOwner || null === $data->getWork()) {
                $this->sendWelcomeEmail($data);
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
        
            throw new AccessDeniedException('Cannot create this user.');
        }

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }

    private function sendWelcomeEmail(User $user): void
    {
        //create a jwt token with the id of the user
        //send the token in the email
        $jwt = $this->jwtEncoder->encode(['email' => $user->getEmail(), 'exp' => time() + 3600]);

        if(getenv('MAILER_TOKEN') !== false) {
            $client = new PostmarkClient($_ENV['MAILER_TOKEN']);

            $client->sendEmailWithTemplate(
                'contact@charlesparames.com',
                $user->getEmail(),
                34574592,
                [
                    'user' => $user->getFirstname(),
                    'action_url' => 'https://localhost:8000/confirm-email/' . $jwt,
                    'login_url' => 'Go to the blog',
                ]);
        }
    }
}
