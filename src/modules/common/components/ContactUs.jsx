import {useState} from 'react';
import toast from "react-hot-toast";

const ContactUs = () => {

    // State variables for individual form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // State variables for individual error messages
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [messageError, setMessageError] = useState('');

    // Reset Error Messages
    const resetErrors = () => {
        setNameError('');
        setEmailError('');
        setMessageError('');
    };

    // Form Validation Logic
    const validateForm = () => {

        resetErrors();
        let isValid = true;

        if (!name.trim()) {
            setNameError('Name is required');
            isValid = false;
        }
        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Email is invalid');
            isValid = false;
        }

        if (!message.trim()) {
            setMessageError('Message is required');
            isValid = false;
        }

        return isValid;
    };

    // Handle form submission
    const handleSubmit = (event) => {

        event.preventDefault();
        resetErrors();

        if (validateForm()) {
            toast.success('Message sent successfully!');

            setName('');
            setEmail('');
            setMessage('');
        }
    };

    return (
        <section className="text-gray-600 body-font flex md:h-screen items-center">

            {/* Main container that organizes content into columns */}
            <div className="container flex flex-col md:flex-row w-full px-6 py-12 max-w-lg mx-auto" id="contact-form">

                {/* Contact information section */}
                <div className="md:w-1/3 w-full flex flex-col items-center">
                    <h1 className="text-4xl text-indigo-600 font-bold title-font mb-6 text-center">Contact Us</h1>
                    <p className="leading-relaxed text-gray-700 text-center mb-4">
                        We're here to assist you! Feel free to reach out to us or email us at
                        <a href="mailto:contact@example.com"
                           className="font-semibold border-b-2 ml-2 border-indigo-600">
                            contact@example.com
                        </a>.
                    </p>
                    <p className="leading-relaxed text-gray-700 text-center mb-4">
                        Connect with us on social media:
                    </p>

                    {/* Social media links */}
                    <span className="inline-flex mt-4 justify-center">
                        <a className="text-gray-500 hover:text-gray-900" href="https://twitter.com/example"
                           target="_blank" rel="noopener noreferrer">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                 className="w-6 h-6" viewBox="0 0 24 24">
                                <path
                                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500 hover:text-gray-900" href="https://www.instagram.com/example/"
                           target="_blank" rel="noopener noreferrer">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                 strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                    </span>
                </div>

                {/* Contact form section */}
                <div className="md:w-2/3 w-full mt-10 md:mt-0 md:pl-4">
                    <h1 className="text-3xl text-indigo-600 font-bold title-font mb-4 text-center">Contact Form</h1>

                    {/* Form to send a message */}
                    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md mx-auto">

                        {/* Name field */}
                        <div className="mb-4">
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 border-gray-300"
                            />
                            {nameError && <p className="text-sm text-red-500">{nameError}</p>}
                        </div>

                        {/* Email field */}
                        <div className="mb-4">
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 border-gray-300"
                            />
                            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                        </div>

                        {/* Message field */}
                        <div className="mb-4">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 border-gray-300"
                            ></textarea>
                            {messageError && <p className="text-sm text-red-500">{messageError}</p>}
                        </div>

                        {/* Submit button */}
                        <div className="text-center">
                            <button type="submit"
                                    className="text-white bg-indigo-600 py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none">
                                Send Message ✉
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
