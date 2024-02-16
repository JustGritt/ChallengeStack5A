"use client";

import Link from "next/link";
import { Button } from "@/components/Ui/Button";
import { useSelector } from "react-redux";
import { getUserCookie } from "@/lib/helpers/UserHelper";
import { USER_ROLES, UserCookieType } from "@/types/User";
import {
  selectCurrentUser,
  selectCurrentUserConfig,
} from "@/lib/services/slices/authSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function Notifications() {
  // Get session
  const user = useSelector(selectCurrentUser);
  const userConfig = useSelector(selectCurrentUserConfig);
  const userRoles = useMemo(
    () =>
      Object.keys(userConfig || {}).filter(
        (role) => userConfig[role as keyof UserConfigType]
      ),
    [userConfig]
  );

  const [parsedToken, setParsedToken] = useState<string | undefined>();
  useEffect(() => {
      (async () => {
          const session = await getUserCookie(UserCookieType.SESSION);
          setParsedToken(session?.token);
      })();
  }, [userConfig]);

  const [parsedSession, setParsedSession] = useState<any>({});
  useEffect(() => {
    (async () => {
      const parsedSession = await getUserCookie(UserCookieType.SESSION);
      setParsedSession(parsedSession);
    })();
  }, []);

  const [notifications, setNotifications] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      if (
        userRoles.includes("ROLE_ADMIN") ||
        userRoles.includes("ROLE_SUPER_ADMIN")
      ) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
          method: "GET",
          headers: { Authorization: `Bearer ${parsedSession?.token}` },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data && data["hydra:member"]) {
              data["hydra:member"].map((company: any) => {
                if (!company.isValid)
                  setNotifications((notifications) => [
                    ...notifications,
                    company,
                  ]);
              });
            }
          })
          .catch((error) => console.error("There was an error!", error));
      }
    })();
  }, [user, parsedSession?.token, userConfig, userRoles]);

    const fetchCompanies = useCallback(async () => {
      if (userRoles.includes('isAdmin')) {
          const response = await fetch('https://api.odicylens.com/companies', {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${parsedToken}` }
          });
          const data = await response.json();
          if (data['hydra:member']) {
              const invalidCompanies = data['hydra:member'].filter((company: any) => (!company.isValid && !company.refused));
              return setNotifications(invalidCompanies);
          }
      }
  }, [userRoles, parsedToken]);

  useEffect(() => {
      fetchCompanies();
  }, [fetchCompanies]);

  return (
    <section className="lg:pl-72 block min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 h-full">
        <div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
            Notifications
          </h2>

          <ol className="relative">
            {notifications.length > 0 ? (
              notifications.map((notification: any) => (
                <li className="flex items-center mb-6" key={notification.id}>
                  <div className="w-full flex justify-between items-center">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                      <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        Waiting for validation
                      </span>
                      {notification.name}
                    </h3>
                    <div className="flex gap-4">
                      <Link
                        href={`/dashboard/company/${notification.id}`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      >
                        <MagnifyingGlassIcon
                          className="w-5 h-5 me-2"
                          aria-hidden="true"
                        />
                        Check company
                      </Link>
                      {/* <Button id={`validate-company-${notification.id}`} intent="default" className="inline-flex items-center" onClick={() => validateCompany(notification.id)}>
                                                    <CheckIcon className="w-5 h-5 me-2" aria-hidden="true" />
                                                    Validate
                                                </Button> */}
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="flex items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  No notifications yet
                </h3>
              </li>
            )}
          </ol>
        </div>
      </div>
    </section>
  );
}
