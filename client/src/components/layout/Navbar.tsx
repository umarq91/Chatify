import axios from "axios"

const Navbar = () => {


 async function handleLogout(){
  try {
    
    const res = await axios.get("/api/auth/logout")
    
    if(res.status==200){
      window.location.href="/"
    }
    
  } catch (error) {
    console.log(error);
    
  }
  }


  return (
    <div className='w-full flex justify-around bg-[#1C1E22]'>
        <h1> </h1>
        <button onClick={handleLogout}>Logout</button>
    
    </div>
  )
}

export default Navbar
