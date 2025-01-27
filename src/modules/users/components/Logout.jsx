import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUsersStore} from "../../../store/useUsersStore.js";

const Logout = () => {
    const logout = useUsersStore(state => state.logout);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate('/');
        };

        performLogout();
    }, [logout, navigate]);

    return null;
};

export default Logout;
