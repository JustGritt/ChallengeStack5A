<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\PatchOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Postmark\PostmarkClient;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Twig\Environment;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

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
        private JWTEncoderInterface $jwtEncoder,
        private MailerInterface $mailer,
        private Environment $twig,
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

    
        if ($operation->getUriTemplate() === '/users/{id}{._format}' && $operation->getMethod() === 'PATCH') {
            $user = $this->security->getUser();
            $isAdmin = $user && in_array('ROLE_SUPER_ADMIN', $user->getRoles(), true);
            $companyOwner = null !== $user && $user && $user->getCompanie() !== null && $data->getWork() && $data->getWork()->getCompany()->getId() === $user->getCompanie()->getId() && $user->getCompanie()->isIsValid();
            
            if ($isAdmin) {
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
            
            if ($data->getId() === $user->getId()) {
                if (null !== $data->isIsValid()) {
                    throw new AccessDeniedException('You cannot edit your profile with the isvalid field.');
                }
                if (null !== $data->getWork()) {
                    throw new AccessDeniedException('You cannot edit your profile with the work field.');
                }
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }

            if ($companyOwner) {
                if (null !== $data->isIsValid()) {
                    throw new AccessDeniedException('You cannot edit this user with the isvalid field.');
                }
                return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
            }
        
            throw new AccessDeniedException('Cannot update this user.');
        }

        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }

    private function sendWelcomeEmail(User $user): void
    {
        $jwt = $this->jwtEncoder->encode(['email' => $user->getEmail(), 'exp' => time() + 3600]);
    

        $email = (new Email())
            ->from('contact@charlesparames.com')
            ->to($user->getEmail())
            ->subject('Welcome to Odicylens!')
            ->text($this->twig->render('email/welcome.txt.twig', [
                'email' => $user->getFirstname(),
                'action_url' => 'https://challenge-stack5-a.vercel.app/confirm-email/' . $jwt,
            ]))
            ->html($this->twig->render('email/welcome.html.twig', [
                'email' => $user->getFirstname(),
                'action_url' => 'https://challenge-stack5-a.vercel.app/confirm-email/' . $jwt,
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
                'action_url' => ''https://challenge-stack5-a.vercel.app/forgot-password/' . $jwt,
                'login_url' => 'Go to the blog',
            ]);
        */
    }
}
