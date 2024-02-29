import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const Profile = ({ auth, setAuth }) => {
    const [userData, setUserData] = useState();
    const token = localStorage.getItem('token');
    const tokenObj = {
        token
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:3000/profile', tokenObj);
                setUserData(response.data); // Assuming the user data is in response.data
                const name = document.getElementById("name")
                const email = document.getElementById("email")
                if(userData){
                    name.value = userData.data.user.Name 
                }
            } catch (error) {
                // console.error('Error fetching user data:', error);
                // Handle error if needed
            }
        }

        // Fetch data only if the token is present
       
    }, []); // Trigger the effect when the token changes

    useEffect(()=>{

    })


    return (
        <div>
            {console.log(userData)}
            <Navbar auth={auth} setAuth={setAuth} />
                        <h1>Name:  <span className='name'></span> </h1>
                        <h1>Email:  <span className="email">
                            </span> </h1>
        </div>
    );
};

export default Profile;
