import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BedroomPage = () => {
    const [designs, setDesigns] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/bedroom')
            .then(res => setDesigns(res.data))
            .catch(err => console.error("Error fetching bedroom designs:", err));
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Bedroom Designs</h2>
            <div className="row">
                {designs.map((item) => (
                    <div className="col-md-4 mb-4" key={item._id}>
                        <div className="card shadow-sm border-0">
                            <img src={item.image} className="card-img-top rounded" alt={item.title} />
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="text-success fw-bold">Price: ₹{item.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BedroomPage;