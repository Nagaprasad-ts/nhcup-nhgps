// import { Link } from '@inertiajs/react';

// const sports = [
//     'Basketball M/W', 'Volleyball M/W', 'Football M/W',
//     'Badminton M/W', 'Kabaddi M', 'Handball M', 'Tug of War M',
// ];

const stats = [
    { num: '11', label: 'Events' },
    { num: '₹4.2L', label: 'Prize Pool' },
    { num: '3', label: 'Days' },
    { num: 'VTU', label: 'Affiliated' },
];

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gray-950 font-sans">

            {/* Background blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -right-32  h-150 w-150 rounded-full bg-green-900/20 blur-3xl" />
                <div className="absolute -bottom-32 -left-32 h-125 w-125 rounded-full bg-green-950/40 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-900/60 blur-2xl" />
            </div>

            {/* College logo — top center */}
            <div className='block md:hidden'>
                <div className="relative z-10 flex justify-center pt-5 pb-2">
                    <img
                        src="/images/nhce-logo.png"
                        alt="New Horizon College of Engineering"
                        className="h-18 object-contain drop-shadow-lg"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>
            </div>

            {/* Main layout */}
            <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col md:flex-row md:mt-8">

                {/* Left — hero image */}
                <div className="flex items-center justify-center md:basis-1/2 md:min-h-[calc(100vh-80px)]">
                    <img
                        src="/images/logo-with-photo.png"
                        alt="NH Cup 2026"
                        className="w-full max-w-sm object-contain px-6 py-4 drop-shadow-2xl md:max-w-none md:h-[88vh] md:w-auto md:px-8"
                    />
                </div>

                {/* Right — info panel */}
                <div className="flex flex-col justify-center px-6 py-2 md:basis-1/2 md:px-12 md:py-12 lg:px-16">
                        
                    <div className='hidden md:block'>
                        <div className="relative z-10 flex pt-5 pb-2">
                            <img
                                src="/images/nhce-logo.png"
                                alt="New Horizon College of Engineering"
                                className="h-24 object-contain drop-shadow-lg"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    </div>

                    {/* Org */}
                    <p className="text-xs text-center md:text-left md:text-md font-medium uppercase tracking-widest text-green-400">
                        Department of Physical Education & Sports
                    </p>

                    {/* Title */}
                    {/* <h1 className="mt-4 text-5xl font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl">
                        New Horizon<br />
                        <span className="text-green-400">Cup 2026</span>
                    </h1> */}

                    {/* Prize */}
                    <div className="mt-5 inline-flex w-auto md:w-fit justify-center items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xl text-yellow-400">
                        <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="none">
                            <path d="M8 1l1.8 3.6L14 5.5l-3 2.9.7 4.1L8 10.4l-3.7 2.1.7-4.1-3-2.9 4.2-.9z" fill="#facc15" />
                        </svg>
                        Cash Prize ₹4.2 Lakh
                    </div>

                    {/* Meta */}
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 justify-center md:justify-start items-center md:items-start">
                        <div>
                            <p className="text-xs md:text-sm uppercase tracking-wider text-gray-500 text-center md:text-left">Dates</p>
                            <p className="mt-0.5 text-sm md:text-base font-medium text-white text-center md:text-left">27 – 29 April 2026</p>
                        </div>
                        <div className="hidden h-10 w-px self-center bg-white/10 sm:block" />
                        <div>
                            <p className="text-xs md:text-sm uppercase tracking-wider text-gray-500 text-center md:text-left">Venue</p>
                            <p className="mt-0.5 text-sm md:text-base font-medium text-white text-center md:text-left">New Horizon Knowledge Park</p>
                        </div>
                        <div className="hidden h-10 w-px self-center bg-white/10 sm:block" />
                        <div>
                            <p className="text-xs md:text-sm uppercase tracking-wider text-gray-500 text-center md:text-left">Last date to register</p>
                            <p className="mt-0.5 text-sm md:text-base font-medium text-green-400 text-center md:text-left">20 April 2026</p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start items-center md:items-start">
                        {/* <Link
                            href="/register"
                            className="inline-flex items-center gap-2 rounded-lg bg-green-400 px-6 py-2.5 text-lg font-medium text-green-950 transition hover:bg-green-300 active:scale-95"
                        >
                            Register Now
                        </Link> */}
                        <a
                            href="/brochure/view"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-2.5 text-lg font-medium text-white transition hover:bg-white/10 active:scale-95"
                        >
                            View Brochure
                        </a>
                    </div>

                    {/* Sports tags */}
                    {/* <div className="mt-7 flex gap-2 overflow-x-auto">
                        {sports.map((s) => (
                            <span
                                key={s}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                            >
                                {s}
                            </span>
                        ))}
                    </div> */}

                    {/* Stats grid */}
                    <div className="mt-7 grid grid-cols-4 gap-2 sm:gap-3">
                        {stats.map((s) => (
                            <div
                                key={s.label}
                                className="rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur-sm"
                            >
                                <p className="text-lg md:text-3xl font-medium text-yellow-400 ">{s.num}</p>
                                <p className="mt-0.5 md:mt-2 text-xs md:text-base leading-tight text-gray-200">{s.label}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}