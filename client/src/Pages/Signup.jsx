import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [currRes, setRes] = useState({
    message: '',
    code: 1,
  });

  const [obj, setObj] = useState({
    Name: '',
    Email: '',
    Password: ''
  });

  useEffect(() => {
    if (currRes.message !== "" && currRes.code !== 1) {
      console.log("triggered");
      alert(currRes.message);
    }
  }, [currRes]);
  

  function handleChange(e) {
    const { name, value } = e.target;
    setObj((prevObj) => ({
      ...prevObj,
      [name]: value,
    }));
    console.log(obj);
  }

  async function handleClick(e) {
    e.preventDefault();
    const res = await axios.post('http://localhost:3000/signup', obj);
    setRes({
      message: res.data.message,
      code: res.data.status, // Assuming 'status' is the correct property name
    });
    localStorage.setItem("token",res.data.token)
    const userid = localStorage.setItem("userId",res.data.id)
    navigate('/');
  }

  return (
    
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Flowbite    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
              <div>
                      <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="Name" name="Name" id="Name" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} required="" />
                  </div>
                  <div>
                      <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="Email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange}/>
                  </div>
                  <div>
                      <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="Password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} required=""/>
                  </div>
                  
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleClick} >Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <button href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" 
                      onClick={()=>{navigate('/signin')}}>Login here</button>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>  
  );
};

export default Signup;
