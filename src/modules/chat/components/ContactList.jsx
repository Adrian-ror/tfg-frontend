import {faMinus, faPlus, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useState} from 'react';
import PropTypes from "prop-types";

const ContactList = ({chats, user, handleChatSelect, searchQuery, setSearchQuery, handleNewChat}) => {
    const [searchVisible, setSearchVisible] = useState(false);

    const toggleSearch = () => setSearchVisible(!searchVisible);

    return (
        <div className="w-1/4 bg-white rounded-lg border-r shadow-lg border-2 border-gray-300">
            <header
                className="p-4 border-b border-gray-300 rounded-lg flex justify-between items-center bg-indigo-600 text-white">
                {searchVisible ? (
                    <input
                        type="text"
                        placeholder="Search contacts..."
                        className="w-full p-2 rounded-md text-gray-600 border border-gray-300"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleNewChat()}
                    />
                ) : (
                    <h1 className="text-2xl font-semibold">Contacts</h1>
                )}
                <button onClick={toggleSearch} className="focus:outline-none">
                    <FontAwesomeIcon icon={searchVisible ? faMinus : faPlus} className="h-5 w-5 text-gray-100"/>
                </button>
            </header>

            <div className="overflow-y-auto p-3 mb-9 pb-20">
                {chats.map((chat) => (
                    <div key={chat.id} onClick={() => handleChatSelect(chat)}
                         className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
                            <FontAwesomeIcon icon={faUser} className="text-gray-600 text-2xl"/>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">
                                {(chat.initiatorId === user.id
                                    ? chat.participantUserName
                                    : chat.initiatorUserName)
                                }
                            </h2>
                            <p className="text-gray-600">{chat && chat.messages && chat.messages.length !== 0 && chat.messages[0].content || 'No recent messages'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

ContactList.propTypes = {
    chats: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    handleChatSelect: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    handleNewChat: PropTypes.func.isRequired
}
export default ContactList;
