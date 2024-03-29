    export function checkSender(loggedInuser:any,users:any[]){

 // Find the user ID that doesn't match the loggedInUser
        const senderId = users.find(user => user._id != loggedInuser)
        return senderId

}

export function isLastMessageBySameSender(messages:any[], index:number, senderId:string  ) {
    if (index === messages.length-1 || index ==0) {
        return true;
    }
    if(messages[index-1].sender._id === senderId ) return false
    

    const nextMessageSender = messages[index + 1].sender._id;
    return nextMessageSender !== senderId;
  }
  