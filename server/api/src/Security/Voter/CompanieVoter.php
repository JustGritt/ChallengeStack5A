<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class CompanieVoter extends Voter
{

    public const PATCH = 'COMPANIE_PATCH';
    public const POST = 'COMPANIE_POST';
    public const VIEW = 'COMPANIE_VIEW';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::PATCH, self::VIEW])
            && $subject instanceof \App\Entity\Companie;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        switch ($attribute) {
           
            case self::VIEW:
                
                if ($user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                    return true;
                }
                
                if (null !== $user->getCompanie() && $user->getCompanie()->getId() === $subject->getId()) {
                    return true;
                }

                if (null !== $user->getWork() && $user->getWork()->getId() === $subject->getId()) {
                    return true;
                }
                 
                break;

            case self::PATCH:
                //check if the user is admin for this companie or super admin
                if ($user->getRoles()[0] === 'ROLE_SUPER_ADMIN') {
                    return true;
                }
                break;
        }

        return false;
    }
}
