<?php

namespace App\Denormalizer;

use App\Entity\User;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\Normalizer\DenormalizerAwareTrait;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * @method  getSupportedTypes(?string $format)
 */
class UserDenormalizer implements DenormalizerInterface
{
    use DenormalizerAwareTrait;

    public function __construct(
        protected UserPasswordHasherInterface $hasher,
        protected ObjectNormalizer $normalizer,
    ) {}

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type === User::class;
    }

    public function denormalize(mixed $data, string $type, string $format = null, array $context = [])
    {
        $user = $this->normalizer->denormalize($data, $type, $format, $context);

        /** @var User $user */
        $plainPassword = $user->getPlainPassword();

        if (empty($plainPassword)) {
            return $user;
        }

        $hashedPassword = $this->hasher->hashPassword($user, $plainPassword);
        $user->setPassword($hashedPassword);
        $user->eraseCredentials();

        return $user;
    }
}