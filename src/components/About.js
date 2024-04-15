import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        <div>
            <input type="file" accept='.jpg' onChange={handleImageChange} />
            <button onClick={handleUpload}>Upload Image</button>
            {/* Dynamically set the image source */}
            <img src={imageUrl || 'image/avatar.jpg'} alt="Uploaded avatar" />
        </div>
    );
};

export default ImageUpload;
