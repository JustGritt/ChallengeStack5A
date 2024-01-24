// components/AuthWrapper.tsx
import { useRouter, } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getValidAuthTokens } from '@/lib/cookies';

type Props = {
    children?: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
    const dispatch = useDispatch();
    const { push } = useRouter();

    const { token } = getValidAuthTokens();


    // if the user doesnt have a valid token, redirect to login page
    useEffect(() => {
        if (!token) {
            push('/login');
        }
    }, [token, push]);

    //   // optional: show a loading indicator while the query is loading
    //   if (isLoading) {
    //     return <div>Loading...</div>;
    //   }

    return children;
};