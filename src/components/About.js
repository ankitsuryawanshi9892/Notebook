import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/profile.css'
import '../css/style.css'

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // To display uploaded image
    const host = "http://localhost:5000";

    // Function to fetch user data including avatar URL
    const fetchUserData = async () => {
        try {
            // Fetch user data including avatar URL
            const response = await axios.get(`${host}/api/auth/getuser`, {
                headers: {
                    'auth-token': localStorage.getItem('token') // Include auth token
                }
            });
            if (response.data && response.data.avatar) {
                setImageUrl(response.data.avatar);
            }
        } catch (error) {
            console.error(error.message);
            // Handle error gracefully
        }
    };

    
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };
    
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('avatar', selectedImage);
        
        try {
            const response = await axios.post(`${host}/api/auth/upload-avatar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file uploads
                    'auth-token': localStorage.getItem('token') // Include auth token
                }
            });

            setImageUrl(response.data.user.avatar); // Update the image URL for display
        } catch (error) {
            console.error(error.message);
            // Handle upload errors gracefully
        }
    };

    // Fetch user data including avatar URL on component mount
    useEffect(() => {
        fetchUserData();
    }, []);

    return (

        <div className="main">
            <div className='container'>
                <div className='profession'>
                    <h4>Name</h4>
                    <h4>Profession</h4>
                </div>
                <div className="profile">
                    {/* Dynamically set the image source */}
                    <img src={imageUrl || 'image/avatar.jpg'} alt="Uploaded avatar" /><br></br>
                    <input className='my-1' type="file" accept='.jpg' onChange={handleImageChange} /><br></br>
                    <button className='button my-3' onClick={handleUpload}>Upload Image</button>
                </div>
            </div>
            <div className="notes">
                
            </div>
        </div>
    );
};

export default ImageUpload;
