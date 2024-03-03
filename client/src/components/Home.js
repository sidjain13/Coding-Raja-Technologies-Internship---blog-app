import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const navigate=useNavigate();

  const [userData,setUserData]=useState();    
  
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








  // for the details of the blog 
  const [blogData,setBlogData]=useState([]);    //in this we store the items to display in cart

    useEffect(()=>{     //when we open about page then callAboutPage is called once
      callCartItem();  // can't use async function in useeffect hook
      // window.location.reload();
    },[])

    const callCartItem=async()=>{
      const res=await fetch('http://localhost:5000/gettingBlogs',{
      method:'GET',
      headers:{
        "Content-Type" : "application/json"
      },
      
      credentials:"include"
    })

    const data=await res.json()

    setBlogData(data)
    }



  


  return (
    <div>
      <h1 className='text-red-600 font-bold text-5xl text-center m-4'>Hello {userData}</h1>


      {
        blogData.map((element,id)=>{
          return (

            <>
            
            <div className='border border-black p-2 w-1/2 mx-auto py-2 my-4 rounded-lg'>
              
              <p className='text-center font-bold'>{element.title}</p>
              <p className='py-2 text-justify'>{element.description}</p>
              <p>{element.date}</p>

              <button
                onClick={async()=>{
      navigate('/update')
          const res=await fetch('http://localhost:5000/blogEdit',{
      method:'POST',
      credentials:"include",
      body:JSON.stringify({
          name:element.name,
          title:element.title,
      }),
      headers:{
        "Content-Type" : "application/json",
      },
      
    })
        }} 
              className='bg-blue-400 border border-black p-2 m-2 rounded-lg'>edit</button>
              
              
          <button onClick={async()=>{
          alert('BLOG DELETED');
          const res=await fetch('http://localhost:5000/blogDelete',{
      method:'POST',
      headers:{
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
          name:element.name,
          title:element.title,
      }),
      
      credentials:"include",
    })
      // window.location.reload(true);
        }}  className='bg-blue-400 border p-2 m-2 border-black  rounded-lg' >delete</button>
            </div>
            </>
          )
        })
      }

    </div>
  )
}

export default Home
