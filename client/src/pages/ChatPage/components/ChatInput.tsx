import React, { useRef, useState, useEffect } from 'react';

function ChatInput() {
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState('');



  const sendMessage = async (e: any) => {
    e.preventDefault();
  
};


  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e);
    }
  };

  return (
    <div className="rounded-xl ">
      <form className="flex relative justify-center">

      <textarea
  value={inputMessage}
  onChange={(e) => setInputMessage(e.target.value)}
  onPaste={(e) => setInputMessage(e.clipboardData.getData('text'))}
  onKeyPress={handleKeyPress}
  placeholder={``}
  className="fixed bottom-8 w-[60%] rounded-md  outline-none border bg-gray-300 border-gray-300 text-black resize-vertical" 
  style={{ whiteSpace: 'pre-wrap' }}
/>


        <button
          type="submit"
          onClick={sendMessage}
          style={{ display: "none" }}> SEND </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ChatInput;