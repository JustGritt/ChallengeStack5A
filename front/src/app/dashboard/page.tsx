"use client";

import DashboardCalendar from "@/components/Calendar/DashboardCalendar";
import DashboardStat from '@/components/Dashboard/DashboardStat';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { selectCurrentUser, selectCurrentUserConfig } from '@/lib/services/slices/authSlice';

export default function Dashboard() {

	const user = useSelector(selectCurrentUser);
    const userConfig = useSelector(selectCurrentUserConfig);
	const userRoles = useMemo(
        () => 
            Object.keys(userConfig).filter(
                (role) => !!userConfig[role as keyof typeof userConfig]
            ),
        [userConfig]
    )
			
	return (
		<section className="lg:pl-72 block min-h-screen">
			<div className="p-4 sm:p-6 lg:p-8 h-full">
				<div className="mx-auto bg-white dark:bg-slate-800 px-8 py-8 rounded-xl shadow border">
					{
						(userRoles.includes("isAdmin") || userRoles.includes("isClient") || userRoles.includes("isWorker")) && (
							<DashboardCalendar />
						)
					}

					{
                        (userRoles.includes('isOwner') && user?.companie) && (
							<section>
								<h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
									Dashboard
								</h2>
								<DashboardStat />
							</section>
                        )
					}
				</div>
			</div>
		</section>
	);
}