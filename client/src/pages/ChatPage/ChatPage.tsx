import React from 'react'
import SideChat from './components/SideChat'

const ChatPage = () => {
  return (
    <div className='flex'>
<div className="w-[30%] bg-slate-700 h-screen">
  <div className="mt-10">

  <SideChat 
  profile='https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp'
  name='name'
  lastMessage='lastMessage'
  time={new Date()}
  />
  <SideChat 
  profile='https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp'
  name='name'
  lastMessage='lastMessage'
  time={new Date()}
  />
  </div>
</div>
<div className="flex-1 bg-black h-screen">Right</div>

    </div>
  )
}

export default ChatPage