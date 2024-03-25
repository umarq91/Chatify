    export function checkSender(loggedInuser:any,users:any[]){

 // Find the user ID that doesn't match the loggedInUser
        const senderId = users.find(user => user._id != loggedInuser)
        return senderId

}