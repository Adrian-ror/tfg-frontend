import {useState} from 'react';
import {usePaymentStore} from "../../../store/usePaymentStore.js";
import {useUsersStore} from "../../../store/useUsersStore.js";
import useResponseHandler from "../../../hooks/useResponseHandler.js";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";

const CreditCardForm = () => {

    // Using response handlers for success and error messages
    const {handleSuccess, handleErrors} = useResponseHandler();

    // Retrieving the function to add a payment method and the user information from stores
    const addCreditCard = usePaymentStore(state => state.addCreditCard);
    const user = useUsersStore(state => state.getUser());
    // Getting today's date in YYYY-MM-DD format

    const stripe = useStripe();
    const elements = useElements();

    // State for form inputs
    const [form, setForm] = useState({
        number: '',
        hostName: '',
        dueDate: '',
        securityCode: '',
        defaultCard: false
    });

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const cardElement = elements.getElement(CardElement);
        const {error, token} = await stripe.createToken(cardElement);

        if (error) {
            handleErrors(error.message);
        } else {
            addCreditCard(
                user.id,
                token,
                form.defaultCard,
                () => handleSuccess('Card added succesfully!', '/users/cards'),
                (errors) => handleErrors(errors)
            );
        }
    };


    return (

        <div className="flex items-center justify-center h-screen">
            <div className="mx-auto bg-gray-100 shadow-lg rounded-lg p-8 w-full max-w-lg border">

                <h2 className="text-2xl font-extrabold font-sans text-center text-gray-800 mb-10">
                    Enter Your Credit Card Details
                </h2>

                <form onSubmit={handleSubmit} noValidate className="w-full">

                    {/* CreditCard Details */}
                    <CardElement
                        options={{style: {base: {fontSize: '16px'}}}}
                        className="border mb-5 mt-8 p-3 rounded-md border-gray-300 focus:border-yellow-500"
                    />

                    {/* Default CreditCard Option */}
                    <div className="mb-5">
                        <label className="mb-2 block text-base font-medium text-gray-700">
                            Set as Default Payment Method?
                        </label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="defaultCardYes"
                                name="defaultCard"
                                checked={form.defaultCard}
                                onChange={() => setForm(prev => ({...prev, defaultCard: true}))}
                                style={{
                                    accentColor: 'yellow'
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="defaultCardYes"
                                   className="text-base font-medium text-gray-700 mr-8">Yes</label>
                            <input
                                type="radio"
                                id="defaultCardNo"
                                name="defaultCard"
                                checked={!form.defaultCard}
                                onChange={() => setForm(prev => ({...prev, defaultCard: false}))}
                                style={{
                                    accentColor: 'yellow'
                                }}
                                className="mr-2"
                            />
                            <label htmlFor="defaultCardNo"
                                   className="text-base font-medium text-gray-700">No</label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 text-base font-semibold text-white bg-yellow-500 rounded-md shadow-md hover:bg-yellow-600 transition duration-200 ease-in-out"
                    >
                        Save CreditCard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreditCardForm;
