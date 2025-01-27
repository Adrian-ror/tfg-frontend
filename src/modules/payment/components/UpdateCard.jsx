import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {usePaymentStore} from '../../../store/usePaymentStore.js';
import {useUsersStore} from '../../../store/useUsersStore.js';
import useResponseHandler from '../../../hooks/useResponseHandler.js';
import {updateCreditCard} from "../../../backend/paymentService.js";

const UpdateCard = () => {
    const {handleSuccess, handleErrors} = useResponseHandler();
    const user = useUsersStore((state) => state.getUser());

    const {findPaymentMethodById, removePaymentMethod} = usePaymentStore((state) => ({
        findPaymentMethodById: state.findPaymentMethodById,
        removePaymentMethod: state.removePaymentMethod
    }));

    const {id} = useParams();

    // Estado para los detalles de la tarjeta
    const [cardDetails, setCardDetails] = useState({
        dueDate: '',
        defaultCard: false,
    });
    const [errors, setErrors] = useState({});
    const [card, setCard] = useState(null);

    const today = new Date().toISOString().split('T')[0].slice(0, 7);

    const hasChanges = card && (
        cardDetails.dueDate !== card?.dueDate ||
        cardDetails.defaultCard !== card?.byDefault
    );

    useEffect(() => {
        if (!Number.isNaN(Number(id))) {
            findPaymentMethodById(id, (card) => {
                if (card) {
                    setCard(card);
                    const expDate = new Date(card.expYear, card.expMonth);
                    const formattedDate = expDate.toISOString().split('T')[0].slice(0, 7);
                    setCardDetails({
                        dueDate: formattedDate,
                        defaultCard: card.byDefault,
                    });
                }
            }, handleErrors);
        }
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCardDetails((prev) => ({...prev, [name]: value}));
    };

    const resetErrors = () => setErrors({});

    const validateForm = () => {
        let isValid = true;
        resetErrors();

        if (!cardDetails.dueDate || new Date(cardDetails.dueDate) < new Date()) {
            setErrors((prev) => ({...prev, dueDate: 'Due date must be a future date.'}));
            isValid = false;
        }

        return isValid;
    };

    const handleSave = (e) => {
        e.preventDefault();

        const [year, month] = cardDetails.dueDate.split('-');

        console.log(year + month)
        if (!hasChanges) {
            handleErrors({globalError: 'No changes detected.'}, '');
            return;
        }

        if (validateForm()) {


            updateCreditCard(
                user.id,
                card.id,
                month,
                year,
                cardDetails.defaultCard,
                () => handleSuccess('Updated successfully!', '/users/cards'),
                (errors) => handleErrors(errors)
            );
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        removePaymentMethod(
            user.id,
            card.id,
            'CARD',
            () => handleSuccess('Deleted successfully!', '/users/cards'),
            handleErrors
        );
    };

    return (
        <div className="flex items-center justify-center p-6">
            <div className="mx-auto bg-gray-100 shadow-lg rounded-lg p-8 w-full max-w-lg border">
                <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-6">
                    Modify Your Credit Card Details
                </h2>

                <form onSubmit={handleSave}>
                    {/* Mostrar detalles actuales de la tarjeta */}
                    <div className="grid grid-cols-2 gap-6 mb-5">
                        <div>
                            <label className="mb-3 block text-base font-medium text-[#07074D]">Card Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={card?.brand || ''}
                                readOnly
                                className="w-full rounded-md border bg-gray-200 text-gray-600 py-3 px-6 text-base font-medium"
                            />
                        </div>

                        <div>
                            <label className="mb-3 block text-base font-medium text-[#07074D]">Card Country</label>
                            <input
                                type="text"
                                name="country"
                                value={card?.country || ''}
                                readOnly
                                className="w-full rounded-md bg-gray-200 text-gray-600 border  py-3 px-6 text-base font-medium"
                            />
                        </div>
                    </div>

                    {/* Reorganizar Due Date y Security Code */}
                    <div className="grid grid-cols-2 gap-6 mb-5">
                        <div>
                            <label htmlFor="dueDate" className="mb-3 block text-base font-medium text-[#07074D]">
                                Due Date
                            </label>
                            <input
                                type="month"
                                id="dueDate"
                                name="dueDate"
                                value={cardDetails.dueDate}
                                min={today}
                                onChange={handleInputChange}
                                className={`w-full rounded-md border bg-white py-3 px-6 text-base font-medium ${errors.dueDate ? 'border-red-500' : ''}`}
                            />
                            {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>}
                        </div>

                        <div>
                            <label className="mb-3 block text-base font-medium text-[#07074D]">Funding</label>
                            <input
                                type="text"
                                name="funding"
                                value={card?.funding ? card.funding.charAt(0).toUpperCase() + card.funding.slice(1) : ''}
                                readOnly
                                className="w-full rounded-md bg-gray-200 text-gray-600 border  py-3 px-6 text-base font-medium"
                            />
                        </div>
                    </div>

                    <div className="col-span-2 mb-4">
                        <label className="mb-3 block text-base font-medium text-[#07074D]">Card Number</label>
                        <input
                            type="text"
                            name="last4"
                            value={`**** **** **** ${card?.last4}` || ''}
                            readOnly
                            disabled
                            className="w-full rounded-md border bg-gray-200 text-gray-600 text-center font-bold   py-3 px-6 text-base "
                        />
                    </div>

                    {/* Default Card Option */}
                    <div className="mb-5 items-center">
                        <label className="mb-3 flex justify-center items-center  text-base font-medium text-[#07074D]">Set
                            as default card?</label>
                        <div className="flex  justify-center items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setCardDetails((prev) => ({...prev, defaultCard: true}))}
                                className={`py-2 px-6 rounded-md text-base font-semibold transition-all duration-200 
                                ${cardDetails.defaultCard === true ? 'bg-yellow-600 text-white' : 'bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-100'}`}
                            >
                                Yes
                            </button>

                            <button
                                type="button"
                                onClick={() => setCardDetails((prev) => ({...prev, defaultCard: false}))}
                                className={`py-2 px-6 rounded-md text-base font-semibold transition-all duration-200 
                                ${cardDetails.defaultCard === false ? 'bg-yellow-600 text-white' : 'bg-white text-yellow-600 border border-yellow-600 hover:bg-yellow-100'}`}
                            >
                                No
                            </button>
                        </div>
                    </div>


                    {/* Save and Cancel Buttons */}
                    <div className="flex gap-4 mb-5">
                        <button
                            type="button"
                            onClick={() => handleSuccess('', '/users/cards')}
                            className="w-full rounded-md bg-gray-400 py-3 px-6 text-base font-semibold text-black outline-none hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`w-full rounded-md ${!hasChanges ? 'bg-gray-400' : 'bg-yellow-600 hover:bg-yellow-900'} py-3 px-6 text-base font-semibold text-white outline-none`}
                        >
                            Save Changes
                        </button>
                    </div>

                    {/* Delete Button */}
                    <div className="mt-5">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="w-full rounded-md bg-red-700 py-3 px-6 text-base font-semibold text-white outline-none hover:bg-red-800"
                        >
                            Delete Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateCard;
