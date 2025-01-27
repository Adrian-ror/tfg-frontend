const Footer = () => (
    <footer className="bg-gray-800 shadow dark:bg-gray-800 w-full">
        {/* Main footer container */}
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            {/* Copyright section */}
            <span className="text-lg text-gray-500 sm:text-center dark:text-gray-400">
                © 2023
                <a href="/" className="hover:underline ml-2 mr-2">CommerceHub™.</a>
                All Rights Reserved.
            </span>
            {/* Navigation links */}
            <ul className="flex flex-wrap items-center mt-3 text-lg font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li className="mr-8">
                    <a href="/about-us" className="hover:underline">About</a>
                </li>
                <li className="mr-8">
                    <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
                </li>
                {/*
                                <li>
                    <a href="/contact-us" className="hover:underline">Contact</a>
                </li>
                */}

            </ul>
        </div>
    </footer>
);

export default Footer;
