import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const navigate=useNavigate();

  const [data,setData]=useState({});

  function entered(event){
    const value=event.target.value;
    const name=event.target.name;

    setData({
      ...data,
      [name]:value,
    })

  }


  const submitted=async(event)=>{
    event.preventDefault();

    const res=await fetch("http://localhost:5000/create",{
      method:'POST',
      credentials:'include',
      body:JSON.stringify({
        title1:data.title1,
        description1:data.description1,
      }),
      headers:{
        "Content-Type":"application/json",
      }
    })



    const data1=await res.json();
    // console.log(data1);


      alert(data1.msg);
      navigate('/home');
    


  }
    
  return (
    <div class="flex justify-center items-center min-h-screen bg-pink-200">
        {/* <!-- card container  --> */}
        <div class="flex flex-col relative shadow-2xl rounded-2xl bg-white md:flex-row m-6 space-y-10 md:space-y-0 md:m-15">
            {/* <!-- content container  --> */}
            <form onSubmit={submitted}>
            <div class=" p-6 md:p-20">
                <h1 class="text-4xl font-bold mb-5">Blog</h1>
                <p class="text-sm mb-10 text-justify">Please write your blog here</p>

                <input type="text" class="w-full border border-black py-2 my-2 rounded-md text-center" name='title1' onChange={entered} placeholder="Enter your title : "/>

                <textarea name="description1" class="w-full border border-black py-2 rounded-md text-center"  cols="30" rows="10" onChange={entered} placeholder="Enter your description : "></textarea>

                <div class="flex flex-col justify-center items-center md:flex-row mt-5 space-y-3 md:space-y-0 md:space-x-4 ">
                  
                    <button class="bg-cyan-600 rounded-md p-2 font-bold hover:scale-105 duration-200 flex w-full justify-center md:w-fit">create</button>
              
                </div>

                {/* <!-- bottom button container  --> */}

                <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:justify-around">

                </div>
            </div>
        
            </form>
            <img src="images/image.jpg" alt="error" class="w-[430px] hidden md:block"/>
        </div>
    </div>
  )
}

export default Create
