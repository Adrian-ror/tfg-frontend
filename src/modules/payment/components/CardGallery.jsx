import {useEffect, useState} from "react";
import {usePaymentStore} from "../../../store/usePaymentStore";
import {useUsersStore} from "../../../store/useUsersStore";
import CreditCard from "./CreditCard";
import useResponseHandler from "../../../hooks/useResponseHandler";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Loader} from "../../common";
import {NoUserCards} from "../index";

const CardGallery = () => {
    const {handleSuccess} = useResponseHandler();
    const [isLoading, setIsLoading] = useState(true);

    const user = useUsersStore(state => state.user);
    const {paymentMethods, findPaymentMethods} = usePaymentStore(state => ({
        paymentMethods: state.getPaymentMethods(),
        findPaymentMethods: state.findPaymentMethods,
    }));

    useEffect(() => {
        if (user?.id) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 1000);

            findPaymentMethods(user.id, timer);

            console.log(paymentMethods)

            return () => clearTimeout(timer);
        }
    }, []);

    const handleAddCard = (event) => {
        event.preventDefault();
        handleSuccess("", "/users/creditCardForm");
    };

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className="p-6 h-screen flex flex-col items-center justify-center">
            <div className="flex flex-wrap items-center justify-center">
                {paymentMethods && paymentMethods.length > 0 ? (
                    paymentMethods.map((card, index) => (
                        <CreditCard key={index} card={card}/>
                    ))
                ) : (
                    <NoUserCards/>
                )}
            </div>

            <div className="p-10 flex items-center justify-center">
                <button
                    className="flex items-center p-3 bg-teal-100 border border-gray-300 hover:bg-green-200 text-gray-800 font-bold px-4 rounded-lg transition duration-300 ease-in-out shadow-md transform hover:scale-105"
                    onClick={handleAddCard}
                    aria-label="Add Payment Method"
                >
                    <FontAwesomeIcon icon={faPlus} className="mr-3"/>
                    Add Payment Method
                </button>
            </div>
        </div>
    );
};

export default CardGallery;
