import {useEffect, useState} from 'react';
import {createChat, deleteChat, getMessages, getUserChats, sendMessage} from "../../../backend/chatService.js";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useUsersStore} from "../../../store/useUsersStore.js";
import Message from "./Message";
import ContactList from "./ContactList";
import {useNavigate, useParams} from "react-router-dom";

const Chat = () => {
    const {user} = useUsersStore(state => ({user: state.getUser()}));
    const {chat} = useParams();
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadChats = () => {
            getUserChats(
                (data) => {
                    setChats(data);
                    if (chat) {
                        const foundChat = data.find(chatItem => chatItem.id === Number(chat));
                        if (foundChat) {
                            handleChatSelect(foundChat);
                            navigate("/messages", {replace: true});
                        } else {
                            console.warn(`Chat with id ${chat} not found`);
                        }
                    }
                },
                (error) => console.error(error)
            );
        };

        loadChats();
        const handleKeyPress = (e) => {
            if (e.key === "Enter") handleSendMessage();
            else if (e.key === "Escape") setInputMessage("");
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [inputMessage, messages]);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
        const currentUserId = user.id

        const chatPartner = chat.initiatorId === currentUserId ? chat.participantUserName : chat.initiatorUserName;

        loadMessages(chatPartner);
    };

    const loadMessages = (chatPartner) => {
        getMessages(chatPartner,
            (data) => setMessages(data.sort((a, b) => a.sentAt - b.sentAt)),
            (error) => console.error(error)
        );
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === "") return;

        sendMessage(selectedChat.id, inputMessage,
            (message) => setMessages([...messages, message]),
            (errors) => console.log(errors)
        );

        setInputMessage("");
    };

    const handleDeleteChat = (chatId) => {
        deleteChat(chatId,
            () => {
                setChats(chats.filter(chat => chat.id !== chatId));
                setMessages([]);
                setSelectedChat(null);
            },
            (error) => console.error("Error deleting chat: ", error)
        );
    };

    const handleNewChat = () => {
        if (searchQuery.trim() === "") return;

        createChat(
            searchQuery,
            (chat) => {
                setChats([...chats, chat]);
                setSelectedChat(chat);
                setSearchQuery("");
            },
            (error) => console.error(error)
        );
    };

    return (
        <div className="flex p-8 overflow-hidden h-auto">
            <ContactList
                chats={chats}
                user={user}
                handleChatSelect={handleChatSelect}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleNewChat={handleNewChat}
            />

            <div className="flex-1 flex flex-col shadow-lg border-2 rounded-lg">
                <header className="bg-white p-4 shadow-lg rounded-lg text-gray-700 flex justify-between items-center">
                    <h1 className="text-2xl font-extrabold">
                        {selectedChat ?
                            (selectedChat.initiatorId === user.id
                                ? selectedChat.participantUserName
                                : selectedChat.initiatorUserName)
                            : "Select a chat"
                        }
                    </h1>
                    {selectedChat && (
                        <button
                            onClick={() => handleDeleteChat(selectedChat.id)}
                            className="text-red-500 border bg-red-50 rounded-lg p-3 hover:text-red-700 font-semibold ml-auto"
                        >
                            Delete Chat
                            <FontAwesomeIcon icon={faTrash} className="ml-2"/>
                        </button>
                    )}
                </header>

                <div className="flex-1 shadow-lg rounded-lg overflow-y-auto p-4">
                    {selectedChat ? (
                        messages.map((message, index) => (
                            <Message key={index} message={message} user={user} selectedChat={selectedChat}/>
                        ))
                    ) : (
                        <p className="flex text-gray-500 justify-center text-center">Select a contact to start
                            chatting</p>
                    )}
                </div>

                {selectedChat && (
                    <footer className="bg-white border-t shadow-lg rounded-lg border-gray-300 p-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <button onClick={handleSendMessage}
                                    className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                                Send
                            </button>
                        </div>
                    </footer>
                )}
            </div>
        </div>
    );
};

export default Chat;
