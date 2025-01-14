import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "react-query";
import api from "../../api/api";
import ChatBody from "../../components/chatBody/ChatBody";
import ChatInput from "../../components/ChatInput/ChatInput";
import { useNavigate, useSearchParams } from 'react-router-dom';
import useListenNotifications from "../../Hooks/useListenNotifications";
import { SocketContext } from "../../Context/SocketContext";

const LayoutPage = () => {
    const [chat, setChat] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const { newMessage ,socket,loading,setLoading} = useContext(SocketContext)
    const navigate = useNavigate()

    useListenNotifications()

    const [previousChats, setPreviousChats] = useState([]);

    const mutation = useMutation({
        mutationFn: api.message,
    });

    const getAllMessage = useMutation({
        mutationFn: api.getMessages
    })

    const getUserConversation = useMutation({
        mutationFn: api.getUserConversations
    })

    useEffect(() => {
        const fetchPreviousChats = async () => {
            try {

                getUserConversation.mutate({}, {
                    onError: (error) => {
                        console.error("Error fetching previous chats:", error);
                        if(error.message === "You are not authenticated"){
                            navigate("/login");
                            localStorage.removeItem("userLogin");
                            return;
                            }
                    },
                    onSuccess: async (data) => {
                        // console.log("Success fetching previous chats:", data);
                        console.log("data",data?.data)
                        setPreviousChats(data?.data?.chatId);
                    }
                })

            } catch (error) {
                console.error("Error fetching previous chats:", error);
            }
        };

        fetchPreviousChats();
    }, []);

    const sendMessage = async (message) => {
      

        const updatedChat = [...chat, message];
        
        const chatId = searchParams.get('chatId');
        await Promise.resolve(setChat(updatedChat));
        const user = JSON.parse(localStorage.getItem("userLogin"));
        const chatData={
            message: updatedChat.map((msg)=>msg.message).join("\n"),
          }
        const newChat = {
            messageUser: message.message,
            messageAI: chatData,
            chatId: chatId,
            userId: user?._id,
        }
        
        socket.emit("newMessage",newChat );
        setLoading(true)
        
    };

    const handlePreviousChatClick = (chatId) => {
        // console.log("Loading chat with ID:", chatId);
        if (chatId) {
            setSearchParams({ chatId: chatId });
            getAllChatMessageById(chatId)
        }
    };

    const handleLogout = () => {
        // console.log("User logged out");
        localStorage.removeItem('userLogin')


        alert("You have been logged out!");
        navigate('/login');
    };

    const getAllChatMessageById = (chatId) => {
        getAllMessage.mutate(chatId, {
            onSuccess: (data) => {
                // console.log("Success:", data.chatData);
                setChat(data?.chatData.
                    message
                )
            }
        })
    }

    const newChartStart = () => {
        // console.log("New chat started")
        setChat([])
        navigate('/')
       
    }

    useEffect(() => {
        const chatId = searchParams.get('chatId');
        if (chatId) {
            getAllChatMessageById(chatId)
        }

    }, [])

    useEffect(() => {
        //   alert("new Message")
        //   console.log("newMessage", newMessage)
        if (newMessage) {
            setChat([...chat, newMessage])
        }
    }, [newMessage])

    return (
        <>
            <div className="flex">

                <div className="w-[30%] bg-gray-800 h-screen p-4 text-white flex flex-col justify-between">

                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Previous Chats</h2>
                            {/* <button onClick={handleSetQuery}>Set Query</button> */}
                            <button
                                onClick={newChartStart}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
                            >
                                New Chat
                            </button>
                        </div>
                        <ul className="space-y-2">
                            {/* {(chat.length == 0) && previousChats?.map((prevChat, idx) => {
                                console.log("prevv", prevChat)
                                return (
                                    // <h1>
                                    //     11
                                    // </h1>
                                    <li
                                        key={prevChat?._id}
                                        className="cursor-pointer p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                                        onClick={() => handlePreviousChatClick(prevChat?._id)}
                                    >
                                        Conversation {idx + 1}
                                    </li>
                                )
                            })} */}

                            {(previousChats) && previousChats?.map((prevChat, idx) => {
                                console.log("prevChat",prevChat)
                                return (

                                    <li
                                        key={prevChat?._id}
                                        className="cursor-pointer p-2 bg-gray-700 rounded-md hover:bg-gray-600"
                                        onClick={() => handlePreviousChatClick(prevChat?._id)}
                                    >
                                        Conversation {idx + 1}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>


                    <div className="mt-4">
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-500"
                        >
                            Logout
                        </button>

                    </div>
                </div>


                <div className="bg-[#1A232E] h-screen w-[70%] py-6 relative sm:px-28 text-white overflow-hidden flex flex-col justify-between align-middle">

                    <div className="gradient-01 z-0 absolute"></div>
                    <div className="gradient-02 z-0 absolute"></div>


                    <div className="uppercase font-bold text-2xl text-center">
                        ChatBot
                    </div>


                    <div className="h-[90%] overflow-auto w-full max-w-6xl min-w-[20rem] py-8 self-center px-4 mb-2">
                        <ChatBody chat={chat}></ChatBody>
                    </div>


                    <div className="w-full max-w-6xl min-w-[20rem] self-center bg-[#000000] rounded-full my-2">
                        <ChatInput
                            sendMessage={sendMessage}
                            loading={loading}
                        ></ChatInput>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutPage;
