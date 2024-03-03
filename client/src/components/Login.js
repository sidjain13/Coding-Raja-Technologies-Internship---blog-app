import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';

const Login = () => {
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

    const res=await fetch("http://localhost:5000/login",{
      method:'POST',
      credentials:'include',
      body:JSON.stringify({
        name1:data.name,
        password1:data.password,
      }),
      headers:{
        "Content-Type":"application/json",
      }
    })



    const data1=await res.json();
    // console.log(data1);

    if(res.status==400){
      alert(data1.error);
    }
    else{
      alert(data1.msg);
      navigate('/');
      window.location.reload();
    }
  }
  


  return (
    <div class="flex justify-center items-center min-h-screen bg-pink-200">
        {/* <!-- card container  --> */}
        <div class="flex flex-col relative shadow-2xl rounded-2xl bg-white md:flex-row m-6 space-y-10 md:space-y-0 md:m-15">
            {/* <!-- content container  --> */}
            <form onSubmit={submitted}>
            <div class=" p-6 md:p-20">
                <h1 class="text-4xl font-bold mb-5">login</h1>
                <p class="text-sm mb-10 text-justify">login kar le re beta login kar le re</p>

                <input type="text" class="w-full border border-gray-300 py-2 my-2 rounded-md text-center" name='name' onChange={entered} placeholder="Enter your name : "/>

                <input type="text" class="w-full border border-gray-300 py-2 rounded-md text-center" name='password' onChange={entered} placeholder="Enter your password : "/>

                <div class="flex flex-col justify-between items-center md:flex-row mt-5 space-y-3 md:space-y-0 md:space-x-4 ">
                    <p class="text-cyan-500">Forgot Password ? </p>
                    <button class="bg-cyan-600 rounded-md p-2 font-bold hover:scale-105 duration-200 flex w-full justify-center md:w-fit">Next -- </button>
                </div>

                {/* <!-- border line  --> */}
                <div class="border-b-gray-300 border mt-12"></div>
                <p class="text-center text-gray-600 mb-10">or login with</p>

                {/* <!-- bottom button container  --> */}

                <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:justify-around">

                    {/* <!-- facebook --> */}
                    <div class="border-2 flex justify-center items-center border-gray-400 rounded-2xl space-x-2 py-1 px-4">
                        <img src="images/facebook.png" alt="error" class="w-10"/>
                    <span>facebook</span>
                    </div>

          
                    <div class="border-2 flex justify-center items-center border-gray-400 rounded-2xl space-x-2 py-1 px-4">
                        <img src="images/google.png" alt="error" class="w-10"/>
                    <span>facebook</span>
                    </div>
                </div>
            </div>
        
            </form>
            <img src="images/image.jpg" alt="error" class="w-[430px] hidden md:block"/>
        </div>
    </div>
  )
}

export default Login
