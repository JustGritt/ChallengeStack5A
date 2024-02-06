<?php

namespace App\Controller;

use App\Entity\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Entity\User;
use App\Entity\Store;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Doctrine\ORM\EntityManagerInterface;
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


    public function __invoke(Request $request): JsonResponse
    {
        $user = $this->getUser();
        //get the parames from the request path uri
        $params = $request->attributes->get('_route_params');
        $storeId = $params['id'];
        $store = $this->entityManager->getRepository(Store::class)->find($storeId);
        
        if (!$store instanceof Store) {
            return $this->json(['message' => 'Store not found'], 404);
        }
        //only the company owner can create a service for the store
        if ($store->getCompany() !== $user->getCompanie()) {
            return $this->json(['message' => 'You are not allowed to create a service for this store'], 403);
        }

        $data = json_decode($request->getContent(), true);

        $service = new Service();
        $service->setStore($store);
        $service->setName(htmlspecialchars($data['name']));
        $service->setDescription(htmlspecialchars($data['description']));
        $service->setPrice(htmlspecialchars($data['price']));
        $service->setTime(htmlspecialchars($data['time']));
        $this->entityManager->persist($service);
        $this->entityManager->flush();

        return $this->json($service, 201);
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