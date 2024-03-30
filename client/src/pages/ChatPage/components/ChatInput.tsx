import { chatContext } from '@/context/ChatContext';
import axios from 'axios';
import {  useState,  useContext } from 'react';

interface ChatInputProps {
  sendMessage: (e: any,msg:string) => void;
}
function ChatInput({ sendMessage }: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState('');

const {selectedChat}:any = useContext(chatContext)

 


  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e,inputMessage);
      setInputMessage('')
    }
  };

  return (
    <div className="rounded-xl ">
      <form className="flex relative justify-center">

      <textarea
  value={inputMessage}
  autoFocus
  onChange={(e) => setInputMessage(e.target.value)}
  onPaste={(e) => setInputMessage(e.clipboardData.getData('text'))}
  onKeyPress={handleKeyPress}
  placeholder={``}
  className="fixed bottom-8 w-[60%] rounded-md  outline-none border bg-gray-300 border-gray-300 text-black resize-vertical" 
  style={{ whiteSpace: 'pre-wrap' }}
/>

      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ChatInput;