import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KitchenPage = () => {
    const [designs, setDesigns] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/kitchen')
            .then(res => setDesigns(res.data))
            .catch(err => console.error("Error fetching kitchen designs:", err));
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Modular Kitchen Designs</h2>
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

export default KitchenPage;