import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import {useEffect} from 'react';
import {useUsersStore} from "../../../store/useUsersStore.js";

function App() {

    // Extracting functions
    const {tryLoginFromServiceToken, logout} = useUsersStore(state => ({
        tryLoginFromServiceToken: state.tryLoginFromServiceToken,
        logout: state.logout
    }));

    // Handle login and fetch parent categories on component mount
    useEffect(() => {

        tryLoginFromServiceToken(() => logout());

    }, []);

    return (
        <div className="flex flex-col min-h-screen">

            {/* Rendering the header component */}
            <Header/>

            {/* Rendering the body component */}
            <Body/>

            {/* Rendering the footer component */}
            <Footer/>
        </div>
    )
}

export default App;
