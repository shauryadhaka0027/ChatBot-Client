import { useContext, useEffect } from "react";


import { SocketContext } from "../Context/SocketContext";

const useListenNotifications = () => {
    const { socket ,setNewMessage,loading,setLoading} = useContext(SocketContext);

    useEffect(() => {
      if (socket) {
        const eventName = `newMessage`;
     
        socket.on(eventName, (newMessage) => {
          console.log("Received Message:", newMessage);

          setNewMessage({role:"ai",message:newMessage});
          setLoading(false)
          // alert("Received Message:", newMessage)
        
        });
  
        return () => {
          socket.off(eventName);
        };
      }
    }, [socket]);
  
    
  };
  
  export default useListenNotifications;
  