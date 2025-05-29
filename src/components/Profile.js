import React, { useState, useEffect } from "react";
import "./Profile.css";
import axiosInstance from "./AxiosInstance"; // Import axiosInstance

export default function Profile() {
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profile, setProfile] = useState({
    username: "",
    dob: "",
    email: "",
    city: "",
    contact: "",
    password: "",
    photoUrl: "https://via.placeholder.com/150", // Placeholder image
  });

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) {
      setUserData(user);
      setProfile({
        username: user.username || "",
        dob: user.dob || "",
        email: user.email || "",
        city: user.city || "",
        contact: user.contact || "",
        password: user.password || "********",
        photoUrl: user.photoUrl || "https://via.placeholder.com/150",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const enableEditing = () => {
    setIsEditable(true);
  };

  const saveProfile = async () => {
    try {
      const { profileImage, ...updatedProfile } = profile;
      const formData = new FormData();
      formData.append(
        "user",
        new Blob([JSON.stringify(updatedProfile)], { type: "application/json" })
      );
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await axiosInstance.put(
        "/users/updateProfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        const updatedUser = { ...userData, ...response.data };
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        setUserData(updatedUser);
        setIsEditable(false);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <div className="profile-card">
        <div className="profile-image">
          <img src={profile.photoUrl} alt="Profile" />
          {isEditable && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-upload"
            />
          )}
        </div>
        <div className="profile-details">
          <div className="detail">
            <label>Username:</label>
            {isEditable ? (
              <input
                className="input-profile"
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.username}</span>
            )}
          </div>
          <div className="detail">
            <label>Date of Birth:</label>
            {isEditable ? (
              <input
                className="input-profile"
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.dob}</span>
            )}
          </div>
          <div className="detail">
            <label>Email:</label>
            {isEditable ? (
              <input
                className="input-profile"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </div>
          <div className="detail">
            <label>City:</label>
            {isEditable ? (
              <input
                className="input-profile"
                type="text"
                name="city"
                value={profile.city}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.city}</span>
            )}
          </div>
          <div className="detail">
            <label>Phone Number:</label>
            {isEditable ? (
              <input
                className="input-profile"
                type="tel"
                name="contact"
                value={profile.contact}
                onChange={handleInputChange}
              />
            ) : (
              <span>{profile.contact}</span>
            )}
          </div>
          <div className="detail">
            <label>Password:</label>
            {isEditable ? (
              <input
                className="input-profile"
                type="password"
                name="password"
                value={profile.password}
              />
            ) : (
              <span>●●●●●●●●</span>
            )}
          </div>
        </div>
        <button
          className="update-btn"
          onClick={isEditable ? saveProfile : enableEditing}
        >
          {isEditable ? "Save Profile" : "Update Profile"}
        </button>
      </div>
    </div>
  );
}
