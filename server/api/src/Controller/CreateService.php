<?php
// api/src/Controller/CreateBookPublication.php
namespace App\Controller;

use App\Entity\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
use Postmark\PostmarkClient;
use Symfony\Component\HttpFoundation\Request;

#[AsController]
class CreateService extends AbstractController
{
    private JWTEncoderInterface $jwtEncoder;

    public function __construct (JWTEncoderInterface $jwtEncoder, EntityManagerInterface $entityManager)
    {
        $this->jwtEncoder =  $jwtEncoder;
        $this->entityManager = $entityManager;
    }


    public function __invoke(Request $request): Service
    {
        $user = $this->getUser();

        //check if the user is admin of the company
        if ($user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
            $this->createService(json_decode($request->getContent(), true), $user->getWork()->getId());
        }
        $service = new Service();
        $service->setStore($user->getWork());
        $service->setName(json_decode($request->getContent(), true)['name']);
        $service->setDescription(json_decode($request->getContent(), true)['description']);
        $service->setPrice(json_decode($request->getContent(), true)['price']);
        $service->setTime(json_decode($request->getContent(), true)['time']);
        $this->entityManager->persist($service);
        $this->entityManager->flush();
        
        return $service;
    }


    private function createService($data, $store)
    {
        $service = new Service();
        $service->setStore($data['store']);
        $service->setName($data['name']);
        $service->setDescription($data['description']);
        $service->setPrice($data['price']);
        $service->setTime($data['time']);
        $this->entityManager->persist($service);
        $this->entityManager->flush();
        
        return $service;
    }
}