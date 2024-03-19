import React from 'react'
import {ModeToggle} from "@/components/ui/mode-toggle"

const Navbar = () => {
  return (
    <div className='w-full flex justify-around'>
        <h1> Logo </h1>
        <ModeToggle />
    </div>
  )
}

export default Navbar
