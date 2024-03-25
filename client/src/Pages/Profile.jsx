import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const Profile = ({ auth, setAuth }) => {
    const [userData, setUserData] = useState();
    const token = localStorage.getItem('token');
    const tokenObj = {
        token
    };
    const [userId, setuserId] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:3000/profile', tokenObj);
                setUserData(response.data.user); // Assuming the user data is in response.data
                console.log(response.data.user); // Assuming the user data is in response.data
                
                const name = document.getElementById("name")
                const email = document.getElementById("email")
                setuserId(response.data.user._id)
                // if(userData){
                //     name.innerText = userData.data.user.Name 
                // }
            } catch (error) {
                // console.error('Error fetching user data:', error);
                // Handle error if needed
            }
        }

        // Fetch data only if the token is present
       fetchData();
    }, []); // Trigger the effect when the token changes

    // useEffect(()=>{
    //     fetchData();
    // },[])


    return (
        <div>
            {/* {console.log(userData.Name)} */}
                <Navbar auth={auth} setAuth={setAuth} userId={userId} />    
                        {
                         userData && <>
                          <h1>Name:  {userData.Name}  </h1>
                             <h1>Email:  {userData.Email} </h1>
                         </>
                        }
        </div>
    );
};

export default Profile;
