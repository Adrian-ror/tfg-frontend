import {useState} from 'react';
import {useUsersStore} from "../../../store/useUsersStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";

const Login = () => {

    //Handle backend responses
    const {handleSuccess, handleErrors, handleLogout} = useResponseHandler();

    // Store actions
    const login = useUsersStore(state => state.login);

    // State variables for form fields
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // State variables for error messages
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Reset Error Messages
    const resetErrors = () => {
        setUserNameError('');
        setPasswordError('');
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

        return isValid;
    };

    // Form Submission Handler
    const handleSubmit = (event) => {
        event.preventDefault();
        resetErrors();

        if (validateForm()) {
            login(
                userName.trim(),
                password,
                () => handleSuccess('Welcome!', '/'),
                handleErrors,
                handleLogout
            );
        }
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="/hub.png" alt="CommerceHub Logo"/> CommerceHub
                </a>

                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
                        <h1 className="text-5xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>

                        <form className="space-y-4 md:space-y-6" noValidate onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="userName"
                                       className="block text-xl font-medium text-gray-700 dark:text-white">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    name="userName"
                                    id="userName"
                                    placeholder="Enter your username"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className={`w-full mt-2 rounded-md border py-3 px-4 text-xl ${userNameError ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-800 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500`}
                                    required
                                />
                                {userNameError && <p className="text-lg text-red-500">{userNameError}</p>}
                            </div>

                            <div>
                                <label htmlFor="password"
                                       className="block text-xl font-medium text-gray-700 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full mt-2 rounded-md border py-3 px-4 text-xl ${passwordError ? 'border-red-500' : 'border-gray-300'} bg-white text-gray-800 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500`}
                                    required
                                />
                                {passwordError && <p className="text-lg text-red-500">{passwordError}</p>}
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 text-xl text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg font-medium"
                            >
                                Sign in
                            </button>

                            <p className="text-lg font-sans text-gray-800 dark:text-gray-400 text-center">
                                Don’t have an account yet?
                                <a
                                    href="/users/signup"
                                    className="ml-2 text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400 underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
