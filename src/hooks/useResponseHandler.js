import {useNavigate} from 'react-router-dom';
import {useUsersStore} from '../store/useUsersStore';
import toastManager from '../toasts/toastManager';

const useResponseHandler = () => {

    //Functions
    const navigate = useNavigate();
    const logout = useUsersStore((state) => state.logout);

    // Handles successful responses
    const handleSuccess = (message = '', redirectPath = '/') => {
        if (message) {
            toastManager.showSuccessToast(message);
        }
        if (redirectPath) {
            navigate(redirectPath);
        }
    };


    // Handles errors from the backend
    const handleErrors = (errors) => {
        if (errors.globalError) {
            toastManager.showErrorToast(errors.globalError);
        } else if (errors.fieldErrors) {
            errors.fieldErrors.forEach((e) => {
                toastManager.showErrorToast(`${e.fieldName}: ${e.message}`);
            });
        } else {
            toastManager.showErrorToast('An unexpected error occurred. Please try again.');
        }
    };

    // Handles the logout process
    const handleLogout = () => {
        toastManager.showLogoutToast('You have been logged out. Redirecting to login page.');
        navigate('/users/login');
        logout();
    };

    return {handleSuccess, handleErrors, handleLogout};
};

export default useResponseHandler;
