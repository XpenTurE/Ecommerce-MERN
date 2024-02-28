import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';

const Profile = ({ auth, setAuth }) => {
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem('token');
    const tokenObj = {
        token,
    };

    async function fetchData() {
        try {
            const response = await axios.post('http://localhost:3000/profile', tokenObj);
            setUserData(response.data); // Assuming the user data is in response.data
        } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error if needed
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {console.log(userData)}
            <Navbar auth={auth} setAuth={setAuth} />
            <h1>Name: {userData ? userData.data.user.Name : ""}</h1>
            <h1>Email: {userData ? userData.data.user.Email : ""}</h1>
        </div>
    );
};

export default Profile;
