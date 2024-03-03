// import React, { useEffect, useState } from 'react'
// import {NavLink} from 'react-router-dom'

// const Navbar = () => {

//     const [userData,setUserData]=useState();    
  
//   useEffect(()=>{
//     callAboutPage();  // can't use async function in useeffect hook
//   },[])

//   // authenticate using cookie
//   const callAboutPage=async()=>{
//     try{
 
//       const res=await fetch("http://localhost:5000/providingCookieDetail",{
//         method:"GET",
//         headers:{
//           Accept:"application/json", 
//           "Content-Type":"application/json"
//         },
//         credentials:"include"
//       });

      
//       const data=await res.json(); 
//       // console.log(data);
//       // console.log(data.name);
//       setUserData(data);          //data contain user details



//     }
//     catch(err){
//       console.log(err);
//     }
//   }  


//   return (
//     <>

        
          


//             <div className='flex justify-around items-center bg-black text-white
//             p-3'>
//                 <div>
//                     <NavLink to='/'>
//                         SJ Blog
//                     </NavLink>
//                 </div>

//                 <ul className='flex justify-between items-center gap-10'>
//                     <li>
//                         <NavLink to='/'>
//                             Home
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to='/login'>
//                             Login
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to='/signup'>
//                             Sign up
//                         </NavLink>
//                     </li>
//                 </ul>
//             </div>
    
//     </>
//   )
// }

// export default Navbar


















import React, { useEffect, useState } from 'react'
import {NavLink, Navigate, useNavigate} from 'react-router-dom'

const Navbar = () => {

    const [userData,setUserData]=useState();    
    const navigate=useNavigate();
  
  useEffect(()=>{
    callAboutPage();  // can't use async function in useeffect hook
  },[])

  // authenticate using cookie
  const callAboutPage=async()=>{
    try{
 
      const res=await fetch("http://localhost:5000/providingCookieDetail",{
        method:"GET",
        headers:{
          Accept:"application/json", 
          "Content-Type":"application/json"
        },
        credentials:"include"
      });

      
      const data=await res.json(); 
      // console.log(data);
      // console.log(data.name);
      setUserData(data);          //data contain user details
    }
    catch(err){
      console.log(err);
    }
  }  



//   logout ka code 
  const logoutRelogout=async()=>{
    try{ 
        const res=await fetch("http://localhost:5000/logout",{
          method:"GET",
          headers:{
            Accept:"application/json", 
            "Content-Type":"application/json"
          },
          credentials:"include"
        });
  
        
        const data=await res.json(); 

        alert(data);
        navigate('/login');
        window.location.reload();
       
      }
      catch(err){
        console.log(err);
      }
  }


  if(userData){
    return (<>
        <div className='flex justify-around items-center bg-black text-white
            p-3'>
                <div>
                    <NavLink to='/'>
                        SJ Blog
                    </NavLink>
                </div>

                <ul className='flex justify-between items-center gap-10'>
                    <li>
                        <NavLink to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/create'>
                            create
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={logoutRelogout}>
                            logout
                        </NavLink>
                    </li>
                </ul>
            </div>
    </>)
  }
  else{
    
    return( <>
        <div className='flex justify-around items-center bg-black text-white
            p-3'>
                <div>
                    <NavLink to='/'>
                        SJ Blog
                    </NavLink>
                </div>

                <ul className='flex justify-between items-center gap-10'>
                    <li>
                        <NavLink to='/'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/login'>
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/signup'>
                            Sign up
                        </NavLink>
                    </li>
                </ul>
                
            </div>
    </>)
  }


}

export default Navbar

