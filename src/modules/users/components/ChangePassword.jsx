import {useEffect, useState} from 'react';
import {useUsersStore} from "../../../store/useUsersStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import UserNotFound from "./UserNotFound.jsx";

const ChangePassword = () => {

    // Handle backend responses
    const {handleSuccess, handleErrors} = useResponseHandler();

    // Store variables and actions
    const {user, changePassword} = useUsersStore(state => ({
        user: state.getUser(),
        changePassword: state.changePassword
    }));

    // State variables for individual form inputs
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to manage button disabled state

    // State variables for individual error messages
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

    // Reset Error Messages
    const resetErrors = () => {
        setOldPasswordError('');
        setNewPasswordError('');
        setConfirmNewPasswordError('');
    };

    // Form Validation Logic
    const validateForm = () => {
        resetErrors();
        let isValid = true;

        if (!oldPassword.trim()) {
            setOldPasswordError('Old password is required');
            isValid = false;
        }
        if (!newPassword.trim()) {
            setNewPasswordError('New password is required');
            isValid = false;
        } else if (newPassword.length < 2) {
            setNewPasswordError('New password must be at least 2 characters');
            isValid = false;
        }
        if (!confirmNewPassword.trim()) {
            setConfirmNewPasswordError('Confirm new password is required');
            isValid = false;
        }

        return isValid;
    };

    // Checks if the new password and the confirmation match
    const checkConfirmNewPassword = () => {
        if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError('Passwords do not match');
            return false;
        }
        return true;
    };

    // Handles changes in the confirm password input field
    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value);
        setConfirmNewPasswordError(''); // Reset error on change
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        resetErrors();

        if (validateForm() && checkConfirmNewPassword()) {
            changePassword(
                user.id,
                oldPassword,
                newPassword,
                () => handleSuccess('Password changed successfully!', '/'),
                handleErrors
            );
        }
    };

    // Check if the button should be disabled using useEffect
    useEffect(() => {
        const validForm = validateForm();
        const passwordsMatch = checkConfirmNewPassword();
        setIsButtonDisabled(!validForm || !passwordsMatch || newPassword === oldPassword);
    }, [oldPassword, newPassword, confirmNewPassword]);

    if (!user) {
        return (<UserNotFound/>);
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900 md:h-screen flex items-center justify-center">
            <div className="w-full max-w-2xl p-10 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                {/* Título descriptivo */}
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                    Change Your Password
                </h2>

                <form className="space-y-8" noValidate onSubmit={handleSubmit}>
                    {/* Old Password Input */}
                    <div className="w-full">
                        <label htmlFor="oldPassword"
                               className="block mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                            Old Password
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter your current password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className={`w-full p-4 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 text-lg`}
                            required
                        />
                        {oldPasswordError && <p className="text-red-500 text-sm mt-2">{oldPasswordError}</p>}
                    </div>

                    {/* New Password Input */}
                    <div className="w-full">
                        <label htmlFor="newPassword"
                               className="block mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Create a new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className={`w-full p-4 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 text-lg`}
                            required
                        />
                        {newPasswordError && <p className="text-red-500 text-sm mt-2">{newPasswordError}</p>}
                    </div>

                    {/* Confirm New Password Input */}
                    <div>
                        <label htmlFor="confirmNewPassword"
                               className="block mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            id="confirmNewPassword"
                            placeholder="Re-enter your new password"
                            value={confirmNewPassword}
                            onChange={handleConfirmNewPasswordChange}
                            className={`w-full p-4 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 text-lg`}
                            required
                        />
                        {confirmNewPasswordError &&
                            <p className="text-red-500 text-sm mt-2">{confirmNewPasswordError}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`text-white w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isButtonDisabled ? 'opacity-50 bg-gray-300 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
                        disabled={isButtonDisabled} // Disable button based on condition
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </section>
    );
}

export default ChangePassword;
