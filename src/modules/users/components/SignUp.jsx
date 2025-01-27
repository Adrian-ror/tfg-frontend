import {useState} from 'react';
import {useUsersStore} from "../../../store/useUsersStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";

const SignUp = () => {

    //Handle backend responses
    const {handleSuccess, handleErrors, handleLogout} = useResponseHandler();

    // Store actions
    const signUp = useUsersStore(state => state.signUp);

    // State variables for form fields
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [role, setRole] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);


    // State variables for error messages
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [termsError, setTermsError] = useState('');

    // Reset Error Messages
    const resetErrors = () => {
        setUserNameError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setRoleError('');
        setTermsError('');
    };

    // Form Validation Logic
    const validateForm = () => {
        let isValid = true;

        if (!userName.trim()) {
            setUserNameError('Username is required');
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        }

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
        }

        if (!role) {
            setRoleError('Please select a role');
            isValid = false;
        }

        if (!acceptTerms) {
            setTermsError('You must accept the terms and conditions');
            isValid = false;
        }

        return isValid;
    };

    // Form Submission Handler
    const handleSubmit = (event) => {
        event.preventDefault();
        resetErrors();

        if (validateForm()) {
            signUp(
                userName.trim(),
                password,
                firstName.trim(),
                lastName.trim(),
                email.trim(),
                image,
                role.trim(),
                () => handleSuccess('Your account has been created successfully! Welcome!', '/'),
                handleErrors,
                handleLogout
            );
        }
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div
                className="flex max-w-md  mt-4 flex-col items-center justify-center px-6 py-4 mx-auto sm:h-screen lg:py-0">
                <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
                    <div className="p-6 max-w-md mx-auto">
                        <h1 className="text-4xl mb-2 text-center font-bold leading-tight text-gray-900 dark:text-white">
                            Create an Account
                        </h1>
                        <form className="space-y-6 max-w-md mx-auto" noValidate onSubmit={handleSubmit}>

                            {/* Username Input */}

                            <div>
                                <label htmlFor="userName"
                                       className="block mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    placeholder="User Name"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className={`w-full text-xl p-3 border ${userNameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                                    required
                                />
                                {userNameError && <p className="text-sm text-red-500">{userNameError}</p>}
                            </div>

                            {/* Password and Confirm Password Inputs */}

                            <div className="flex space-x-4">
                                <div className="w-full">
                                    <label htmlFor="password"
                                           className="block mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full text-xl p-3 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                                        required
                                    />
                                    {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="confirm-password"
                                           className="block mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`w-full text-xl p-3 border ${confirmPasswordError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                                        required
                                    />
                                    {confirmPasswordError &&
                                        <p className="text-sm text-red-500">{confirmPasswordError}</p>}
                                </div>
                            </div>

                            {/* First Name and Last Name Inputs */}

                            <div className="flex space-x-4">
                                <div className="w-full">
                                    <label htmlFor="firstName"
                                           className="block mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className={`w-full text-xl p-3 border ${firstNameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                                        required
                                    />
                                    {firstNameError && <p className="text-sm text-red-500">{firstNameError}</p>}
                                </div>

                                <div className="w-full">
                                    <label htmlFor="lastName"
                                           className="block mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className={`w-full text-xl p-3 border ${lastNameError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                                        required
                                    />
                                    {lastNameError && <p className="text-sm text-red-500">{lastNameError}</p>}
                                </div>
                            </div>

                            {/* Email Input */}

                            <div>
                                <label htmlFor="email"
                                       className="block text-xl mb-2  font-medium text-gray-700 dark:text-gray-300">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="name@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full text-xl p-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300`}
                                    required
                                />
                                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
                            </div>

                            {/* Upload image */}

                            <div className="mb-5">
                                <label htmlFor="images"
                                       className="block mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                    Images
                                </label>
                                <input
                                    type="file"
                                    name="images"
                                    id="images"
                                    aria-describedby="user_avatar_help"
                                    onChange={e => setImage(e.target.files[0])}
                                    className="block w-full  text-xl  rounded-lg cursor-pointer border border-[#e0e0e0] bg-white text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                <div className="mt-1 text-xl text-gray-500 dark:text-gray-300" id="image_help">
                                    Customize your profile
                                </div>
                            </div>

                            {/* Role Selection */}

                            <div>
                                <span className="block mb-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                                    Please choose a role
                                </span>
                                <ul className="grid w-full gap-4 md:grid-cols-2">
                                    <li>
                                        <input
                                            type="radio"
                                            id="hosting-small"
                                            name="hosting"
                                            value={role}
                                            onChange={() => setRole('CLIENT')}
                                            className="hidden peer"
                                            required
                                        />
                                        <label
                                            htmlFor="hosting-small"
                                            className="flex items-center justify-center w-full py-3 px-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                        >
                                            <div className="w-full text-center text-xl font-semibold italic">
                                                CLIENT
                                            </div>
                                        </label>
                                    </li>
                                    <li>
                                        <input
                                            type="radio"
                                            id="hosting-big"
                                            name="hosting"
                                            value={role}
                                            onChange={() => setRole('PROVIDER')}
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor="hosting-big"
                                            className="flex items-center justify-center w-full py-3 px-4 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                        >
                                            <div className="w-full text-center text-xl font-semibold italic">
                                                PROVIDER
                                            </div>
                                        </label>
                                    </li>
                                </ul>
                                {roleError && <p className="text-sm text-red-500">{roleError}</p>}
                            </div>

                            {/* Accept Terms and Conditions */}

                            <div className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    id="accept-terms"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                    required
                                />
                                <label htmlFor="accept-terms"
                                       className=" ml-2 text-xl font-medium text-gray-900 dark:text-gray-300">
                                    I accept the
                                    <a href="/terms"
                                       className="ml-1 text-blue-600 hover:underline dark:text-blue-500">
                                        terms and conditions
                                    </a>
                                </label>
                            </div>
                            {termsError && <p className="text-sm text-red-500">{termsError}</p>}

                            {/* Submit Button */}

                            <button
                                type="submit"
                                className="w-full px-5 py-2.5 text-xl font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Create an account
                            </button>

                            {/* Link to log in if user have an account */}

                            <p className="text-lg font-sans text-gray-800 dark:text-gray-400 text-center">
                                Already have an account?
                                <a href="/users/login"
                                   className="font-medium ml-2 text-blue-600 hover:underline dark:text-blue-500">
                                    Login here
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
