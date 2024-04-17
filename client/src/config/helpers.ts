    export function checkSender(loggedInuser:any,users:any[]){

 // Find the user ID that doesn't match the loggedInUser
        const senderId = users?.find(user => user._id != loggedInuser)
        return senderId

}
export function isLastMessageBySameSender(messages: any[], index: number, senderId: string) {
    if (messages.length === 1||index===0) { // Only one message, always show avatar
      return true;
    }
  
    const previousMessage = messages[index - 1];
  
    // Check if there's a previous message and the senders are different
    return previousMessage && previousMessage.sender._id !== senderId;
  }