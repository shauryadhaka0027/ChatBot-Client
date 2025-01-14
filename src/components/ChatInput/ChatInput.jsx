import React, { useState } from 'react'
import send from "../../assets/send.png"


const ChatInput = ({sendMessage,loading}) => {
    const [value,setValue]=useState("")
    
    const handleSubmit = () => {
        console.log("value",value)
        if(value === "") return
        if(value) {
            
             sendMessage({sender:"user",message:value})
             setValue("")
        }
    }
   
  return (
    <>
   {loading ?  <img className='w-20 h-12 m-auto' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif" alt="" /> :  <div className='w-full text-white bg-opacity-10 max-h-40 rounded-lg px-4  py-4 overflow-auto relative'>
    <textarea  onKeyDown={(e)=>{
      e.keyCode ===13 && e.shiftKey === false && handleSubmit() 
    }} rows={1} className='border-0  bg-transparent  outline-none w-11/12' value={value} type="text" onChange={(e)=>setValue(e.target.value)}/>
    <img src={send} onClick={handleSubmit} alt="send button " width={20}  className='absolute  top-4 right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125'/>
  </div>}
  </>
  )
}

export default ChatInput
