import React, { useEffect, useRef } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SynatxHighlighter = ({codeString,languageType,chat}) => {
  
    const solite = languageType.split("")
    const newlineIndex = solite.indexOf('\n');
     const bottomRef = useRef(null);

      useEffect(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [chat]);
    
    
  return (
    <>
    <div>
      <SyntaxHighlighter language={solite.slice(0, newlineIndex).join('')=="react"?"jsx":solite.slice(0, newlineIndex).join('')} style={dark}  >
      {codeString}
    </SyntaxHighlighter>
    
    
    </div>
    <div ref={bottomRef} className="h-2"></div>
    </>
  )
}

export default SynatxHighlighter
