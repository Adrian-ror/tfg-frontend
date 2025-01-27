import {useEffect, useState} from 'react';
import {useUsersStore} from "../../../store/useUsersStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import UserNotFound from "./UserNotFound.jsx";

const UpdateProfile = () => {

    //Handle backend responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    //Store varibles and actions
    const {user, updateProfile} = useUsersStore(state => ({
        user: state.getUser(),
        updateProfile: state.updateProfile
    }));

    // State variables for individual form inputs
    const [firstName, setFirstName] = useState(user?.firstName || '');
    const [lastName, setLastName] = useState(user?.lastName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [image, setImage] = useState(user?.image || null);
    const [isChanged, setIsChanged] = useState(false); // To track if values have changed

    // State variables for individual error messages
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    // Reset Error Messages
    const resetErrors = () => {
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
    };

    // Form Validation Logic
    const validateForm = () => {
        resetErrors();
        let isValid = true;

        if (!firstName.trim()) {
            setFirstNameError('First name is required');
            isValid = false;
        }
        if (!lastName.trim()) {
            setLastNameError('Last name is required');
            isValid = false;
        }
        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Email is invalid');
            isValid = false;
        }

        return isValid;
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        resetErrors();

        if (validateForm() && user) {
            updateProfile(
                user.id,
                firstName.trim(),
                lastName.trim(),
                email.trim(),
                image,
                () => handleSuccess('Profile updated successfully!', '/'),
                handleErrors
            );
        }
    };

    // Check if any of the form fields have changed from the original user data
    useEffect(() => {
        if (user) {
            setIsChanged(
                firstName !== user.firstName ||
                lastName !== user.lastName ||
                email !== user.email ||
                image !== user.image
            );
        }

    }, [user, firstName, lastName, email, image]);


    // Check if the user is null
    if (!user) {
        return (<UserNotFound/>);
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 md:h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl p-10 bg-white rounded-lg shadow-xl dark:bg-gray-800">

                {/* Título descriptivo */}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                    Update Your Profile
                </h2>

                <form className="space-y-8" noValidate onSubmit={handleSubmit}>
                    {/* First Name and Last Name Inputs */}
                    <div className="flex space-x-8">
                        <div className="w-full">
                            <label htmlFor="firstName"
                                   className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className={`w-full p-4 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 ${firstNameError ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {firstNameError && <p className="text-sm text-red-500">{firstNameError}</p>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="lastName"
                                   className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className={`w-full p-4 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 ${lastNameError ? 'border-red-500' : 'border-gray-300'}`}
                                required
                            />
                            {lastNameError && <p className="text-sm text-red-500">{lastNameError}</p>}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email"
                               className="block mb-3 text-base font-medium text-gray-700 dark:text-gray-300">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-4 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 ${emailError ? 'border-red-500' : 'border-gray-300'}`}
                            required
                        />
                        {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label htmlFor="images" className="mb-4 block text-base font-medium text-[#07074D]">
                            Profile Picture
                        </label>
                        <input
                            type="file"
                            name="images"
                            id="images"
                            aria-describedby="user_avatar_help"
                            onChange={e => setImage(e.target.files[0])}
                            className="block w-full rounded-lg cursor-pointer border border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="image_help">
                            Customize your profile with a picture
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`text-white w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${!isChanged ? 'opacity-50 bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
                        disabled={!isChanged} // Disable button if no changes
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UpdateProfile;
