import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Navbar from './Navbar';

const Homepage = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const itemsFetch = axios.get("http://localhost:3000/items")
            .then(res => {
                setItems(res.data);
            })
            .catch(err => {
                console.error("Error fetching items:", err);
            });
    }, []);

    return (
    <>
        <Navbar/>
        <br/>
        <div className="container">
            <div className='flex flex-wrap'>
                {items && items.map((ele) => (
                    <Card key={ele._id} name={ele.Name} description={ele.Description} price={ele.Price} image = {ele.Image} />
                ))}
            </div>
        </div>
        </>
    );
}

export default Homepage;
