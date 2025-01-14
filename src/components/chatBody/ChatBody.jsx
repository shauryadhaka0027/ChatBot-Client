import React, { useEffect, useRef } from 'react';
import autoAnimate from "@formkit/auto-animate";
import SynatxHighlighter from '../SynatxHighlighter/SynatxHighlighter';

const ChatBody = ({ chat }) => {
  const aiStyle = "bg-[#888282] bg-opacity-40 backdrop-blur-lg dropshadow-md mr-auto";
  const parent = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (parent.current) autoAnimate(parent.current);
  }, [parent]);


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }

  }, [chat]);

  return (
    <>
      <div className="flex flex-col gap-4" ref={parent}>
        {chat.map((message, idx) => (
          <div
            key={idx}
            className={`border-[#888282] break-words border-2 rounded-xl self-end px-3 max-w-[80%] py-3 ${
              message.role === "ai" && aiStyle
            }`}
          >
            <pre className="whitespace-pre-wrap">
              {message.role === "ai" ? (
                <span>{message?.message.split("```")[0]}</span>
              ) : (
                <span>{message.message}</span>
              )}
              {message.role === "ai" && message?.message?.split("```")[1] && (
                <div className={`${aiStyle}`}>
                  <SynatxHighlighter
                    languageType={message?.message?.split("```")[1]?.split(" ")[0]}
                    codeString={message?.message?.split("```")[1]}
                    chat={chat}
                  />
                </div>
              )}
            </pre>
          </div>
        ))}
       
        <div ref={bottomRef} className="h-2"></div>
      </div>
    </>
  );
};

export default ChatBody;
