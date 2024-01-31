<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class ServiceVoter extends Voter
{
    public const VIEW = 'SERVICE_VIEW';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::VIEW])
            && $subject instanceof \App\Entity\Service;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        $companie = $user->getCompanie();
        $work = $user->getWork();

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case self::VIEW:
                if (null !== $user && $user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                   return true;
                }
                if (null !== $companie && $companie->getId() && $subject->getStore()->getCompany()->getId() === $companie->getId() && $companie->isIsValid() === true) {
                    return true;
                }
                if (null !== $work && $work->getId() && $subject->getStore()->getId() === $work->getId()) {
                    return true;
                }
                break;
        }

        return false;
    }
}
