
interface Props {
    content: string,
    sender: string,
    isSenderUser:boolean,
    avatar:string
}

function SingleMessage({content,sender,isSenderUser,avatar}:Props) {
  return (
    <div className="grid grid-cols-12 gap-y-2">
    
    {isSenderUser ? (
 <div className="col-start-1 col-end-8 p-3 rounded-lg">
 <div className="flex flex-row items-center">
<img 
src={avatar}
alt="picture"
className="w-10 h-10 rounded-full"
 />
   <div
       className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
   >
     <div>{content}</div>
   </div>
 </div>
</div>

    ):(
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
        <div className="flex items-center justify-start flex-row-reverse">
          <div
              className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
          >
            A
          </div>
          <div
              className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
          >
            <div>I'm ok what about you?</div>
          </div>
        </div>
      </div>
    )}
    </div>
  
  )
}

export default SingleMessage
