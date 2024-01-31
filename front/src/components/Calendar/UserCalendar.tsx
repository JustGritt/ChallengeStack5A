import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import { CalendarDates } from '@/app/utils/Calendar';

const currentMonth = CalendarDates[0].months[new Date().getMonth()];
const days = currentMonth.days;
const currentDate = new Date().getDate();

export default function Example() {
    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <header className="flex items-center justify-between py-4 lg:flex-none">
                <p className="text-2xl font-medium text-gray-900 dark:text-white">{currentMonth.name} {new Date().getFullYear()}</p>
                <div className="flex items-center">
                    <div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
                        <button type="button"
                            className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
                            <span className="sr-only">Previous month</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>

                        <button type="button" className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">
                            Today
                        </button>

                        <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />

                        <button type="button"
                            className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
                            <span className="sr-only">Next month</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="hidden md:ml-0 md:flex md:items-center">
                        <button type="button" className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Book a day
                        </button>
                    </div>
                </div>
            </header>
            <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col dark:bg-gray-800">
                <div className="grid grid-cols-7 text-center font-semibold leading-6 text-gray-700 dark:text-gray-300 lg:flex-none ">
                    <div className="text-white bg-indigo-600 dark:bg-slate-700 py-4 rounded-tl">Mon<span className="hidden lg:inline">day</span></div>
                    <div className="text-white bg-indigo-600 dark:bg-slate-700 py-4">Tues<span className="hidden lg:inline">day</span></div>
                    <div className="text-white bg-indigo-600 dark:bg-slate-700 py-4">Wed<span className="hidden lg:inline">nesday</span></div>
                    <div className="text-white bg-indigo-600 dark:bg-slate-700 py-4">Thu<span className="hidden lg:inline">rsday</span></div>
                    <div className="text-white bg-indigo-600 dark:bg-slate-700 py-4">Fri<span className="hidden lg:inline">day</span></div>
                    <div className="text-white bg-indigo-600 dark:bg-slate-700 py-4">Sat<span className="hidden lg:inline">urday</span></div>
                    <div className="text-white bg-indigo-600 dark:bg-slate-700 py-4 rounded-tr">Sun<span className="hidden lg:inline">day</span></div>
                </div>
                <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 dark:bg-gray-900 dark:text-gray-300 lg:flex-auto">
                    <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-5 lg:gap-px dark:border-white">
                        {days.map((day) => (
                            <div key={day.date} className={`block h-40 bg-white relative p-4 transition-colors hover:border dark:bg-gray-700 ${day.date.split('/')[0] < String(currentDate) ? 'bg-gray-100 dark:bg-slate-600' : ''}`}>
                                <time dateTime={day.date} className={`text-lg flex h-8 w-8 items-center justify-center font-semibold ${day.date.split('/')[0] == String(currentDate) ? 'rounded-full bg-indigo-600 text-white' : ''}`}>
                                    {day.date.split('/')[0]}
                                </time>
                            </div>
                        ))}
                    </div>
                    <div className="isolate grid w-full grid-cols-7 grid-rows-5 gap-px lg:hidden">
                        {days.map((day) => (
                            <div key={day.date} className={`block h-20 bg-white relative p-4 transition-colors hover:border dark:bg-gray-700 ${day.date.split('/')[0] < String(currentDate) ? 'bg-gray-100 dark:bg-gray-800' : ''}`}>
                                <time dateTime={day.date} className={`text-lg flex h-8 w-8 items-center justify-center font-semibold ${day.date.split('/')[0] == String(currentDate) ? 'rounded-full bg-indigo-600 text-white' : ''}`}>
                                    {day.date.split('/')[0]}
                                </time>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
