<?php

namespace App\Security\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class StoreVoter extends Voter
{
    public const PATCH = 'STORE_PATCH';
    public const VIEW = 'STORE_VIEW';
    public const POST = 'STORE_POST';

    protected function supports(string $attribute, mixed $subject): bool
    {
        // replace with your own logic
        // https://symfony.com/doc/current/security/voters.html
        return in_array($attribute, [self::VIEW])
            && $subject instanceof \App\Entity\Store;
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
                //user work for the store 
                if (null !== $user->getWork() && $user->getWork()->getId() === $subject->getId()) {
                    return true;
                }
                //user should be admin of the company
                if (null !== $user->getCompanie() && $user->getCompanie()->getId() === $subject->getCompany()->getId()) {
                    return true;
                }
                break;
        }

        return false;
    }
}
