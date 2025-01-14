import { useState } from 'react'
import './App.css'
import ChatBody from './components/chatBody/ChatBody'
import ChatInput from './components/ChatInput/ChatInput'
import { useMutation } from 'react-query'
import api from './api/api.js'
import Login from './Page/Login/Login.jsx'
import Signup from './Page/signup/Signup.jsx'
import MainRoute from './Routes/MainRoute.jsx'

function App() {

  const [chat, setChat] = useState([])
  const mutation = useMutation({
    mutationFn:api.message
  })


  const sendMessage = async (message) => {
    console.log("Message to send:", message);
  
   
    const updatedChat = [...chat, message];
    console.log("Updated Chat Array:", updatedChat);

    await Promise.resolve(setChat(updatedChat)); 
  

       mutation.mutate(updatedChat, {
      onSuccess: (data) => {
        console.log("Success:", data);
        setChat((pre)=>[...pre,{sender:"ai",message:data.data.trim()}])

      },
    });
  };
  



 
  return (
    // <Login/>
  <MainRoute/>

    // <div className=' border-2 bg-[#1A232E] h-screen py-6 relative sm:px-28  text-white overflow-hidden flex flex-col justify-between align-middle'>
    //   {/* {gradient} */}

    //   <div className='gradient-01 z-0 absolute'></div>
    //   <div className='gradient-02 z-0 absolute'></div>


    //   {/* {header} */}
    //   <div className='uppercase font-bold text-2xl text-center '>
    //     ChatBot 
    //   </div>


    //   {/* {body} */}

    //   <div className='h-[90%] overflow-auto w-full max-w-6xl min-w-[20rem] py-8 self-center px-4 mb-2'>
    //     <ChatBody  chat={chat}></ChatBody>
    //   </div>

    //   {/* {input} */}

    //   <div className='w-full max-w-6xl min-w-[20rem] self-center bg-[#000000] rounded-full my-2'>
    //     <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} ></ChatInput>
    //   </div>
    // </div>

  )
}

export default App
