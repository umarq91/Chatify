import { chatContext } from '@/context/ChatContext';
import axios from 'axios';
import {  useState,  useContext } from 'react';


function ChatInput() {
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState('');

const {selectedChat}:any = useContext(chatContext)

  const sendMessage = async (e: any) => {
    e.preventDefault();
    setInputMessage('')
  const res =   await axios.post('/api/message',{content:inputMessage,chatId:selectedChat._id})

  
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