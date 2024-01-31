<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Metadata\DeleteOperationInterface;
use App\Entity\Companie;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Postmark\PostmarkClient;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class CompanieStateProcessor implements ProcessorInterface
{
    public function __construct(
        #[Autowire('@api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire('@api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        private EntityManagerInterface $entityManager,
        private Security $security

    )
    {
    }


    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }
    
        $user = $this->security->getUser();

        if ($user instanceof User && $user->getCompanie() !== null) {
            throw new AccessDeniedException('User already has a company. Cannot create a new one.');
        }


        if ($user instanceof User) {
            $data->setOwner($user);
        }
    
        $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        $this->sendAdminMail($data);

        return $result;
    }

   
    public function sendAdminMail(Companie $companie): void
    {
        $users = $this->getAdminUsers();
        $client = new PostmarkClient($_ENV['MAILER_TOKEN']);
        foreach ($users as $user) {
            $client->sendEmailWithTemplate(
                'contact@charlesparames.com',
                $user->getEmail(),
                34634547,
                [
                    'companie_name' => $companie->getName(),         
                    "action_url" => "action_url_Value",
                ]
            );
        }

    }

    public function getAdminUsers(): array
    {
        $dql = 'SELECT u FROM App\Entity\User u WHERE CONTAINS(u.roles, :role) = true';
        $query = $this->entityManager->createQuery($dql);
        $query->setParameter('role', json_encode(['ROLE_SUPER_ADMIN']));
        $users = $query->getResult();

        return $users;

    }
    
}
