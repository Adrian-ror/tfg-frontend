import PropTypes from "prop-types";

const Message = ({message, user, selectedChat}) => {
    const getMessageType = () => {
        return message.senderId === selectedChat.initiatorId ? 'outgoing' : 'incoming';
    };

    return (
        <div className={`flex mb-4 ${getMessageType() === 'outgoing' ? 'justify-end' : ''}`}>
            {getMessageType(message) === 'incoming' ? (
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-5 ml-3">
                        <p className="text-gray-600 font-semibold">
                            {user.id === message.senderId ? 'You' : selectedChat.participantUserName}
                            :
                        </p>
                    </div>
                ) :
                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-8 ml-3">
                    <p className="text-gray-600 font-semibold">
                        {user.id === message.senderId ? 'You' : selectedChat.initiatorUserName}
                        :
                    </p>
                </div>
            }
            <div
                className={`flex max-w-96 rounded-lg p-3 gap-3 ${getMessageType() === 'incoming' ? 'bg-green-600 text-white' : 'bg-indigo-500 text-white'}`}>
                <p>{message.content}</p>
            </div>
        </div>
    );
};


Message.propTypes = {

    message: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    selectedChat: PropTypes.object.isRequired

};

export default Message;
