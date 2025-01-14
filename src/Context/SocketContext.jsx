import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";


// Socket Context to manage socket connection
export const SocketContext = createContext();
export const socketURL = import.meta.env.VITE_Current_API;


export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUser] = useState([]);
    const [loading,setLoading]=useState(false)
    const [newMessage,setNewMessage]=useState()
  
    useEffect(() => {
      const user= JSON.parse(localStorage.getItem("userLogin"))
      console.log("user",user)

      if (user?._id) {
      
        const socketInstance = io(socketURL, {
          query: { userId: user?._id },
        });
  
        setSocket(socketInstance);
  
       
        socketInstance.on("getOnlineUsers", (users) => {
          // console.log("Online users:", users);
           
        });
  
      
        return () => {
          socketInstance.close();
        };
      }
    }, []);
  
    return (
      <SocketContext.Provider value={{ socket, onlineUser ,newMessage,setNewMessage,loading,setLoading}}>
        {children}
      </SocketContext.Provider>
    );
  };
  