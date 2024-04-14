import { MdEmojiEmotions } from "react-icons/md";
import {  useState,  useContext, ReactEventHandler, EventHandler } from 'react';
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';

interface ChatInputProps {
  sendMessage: (e: any,msg:string) => void;
}
function ChatInput({ sendMessage }: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

 


  const handleKeyPress = (e:any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e,inputMessage);
      setInputMessage('')
      setShowEmojiPicker(false)
    }
  };


  const handleSelectEmoji = (emoji:any) => {
      setInputMessage((prevInputMessage) => prevInputMessage + emoji.emoji)
      setShowEmojiPicker(false)
  }

  const handleSendMessage = (e:EventHandler<any>) => {
    e.preventDefault();
    if(inputMessage === ''){
      setError('Please enter a message')
      return
    }
    sendMessage(e,inputMessage);
    setInputMessage('')
    setShowEmojiPicker(false)
  }

  return (
    <div className="rounded-xl ">
      <form
      className=" absolute bottom-0 flex bg-[#17191C] w-full items-center  py-2  px-2 gap-3 ">
      <MdEmojiEmotions
      className=" rounded-full p-1 self-center text-center cursor-pointer"
      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
      color='Gray'  size={40}/>
      <input
          value={inputMessage}
          autoFocus
          onChange={(e) => setInputMessage(e.target.value)}
          onPaste={(e) => setInputMessage(e.clipboardData.getData('text'))}
          onKeyPress={handleKeyPress}
          placeholder={`Type you message`}
          className="bg-[#17191C] border-2  flex-1 rounded-[20px] border-[#272A30] py-2   px-4 text-gray-300 outline-none resize-vertical"
          style={{ whiteSpace: 'pre-wrap' }}
        />
{/*TODO :  Plus button here for images and files */}
<button
onClick={(e)=>handleSendMessage(e)}>
<IoMdSend 
className='bg-[#4C525C] rounded-full p-1 self-center text-center cursor-pointer' color='white' size={42}/>
</button>
</form>

      {error && <p className="error">{error}</p>}
      {showEmojiPicker && <EmojiPicker
      style={{ position: 'absolute', bottom: '50px', left: '0' }}
      onEmojiClick={handleSelectEmoji} />}
          </div>
  );
}

export default ChatInput;