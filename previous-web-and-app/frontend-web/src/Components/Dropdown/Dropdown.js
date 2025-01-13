import React from 'react'
import styles from "./dropdown.module.scss"
import { useNavigate } from "react-router-dom";

function Dropdown() {
  const baseURL = 'http://localhost:8005'
  const navigate = useNavigate();

  const logoutLogic = async () => {
    try {
      const res = await fetch(`${baseURL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include'
      });
      const data = await res.json();
      if (res.status(200))
        console.log("User logged out successfullt");
      else
        console.log("Failed to log out user");
    }
    catch (error)
    {
      console.log("error bro, at logging out frontend");
    }
  }

  return (
    <div className={styles.dropdown}>
      <ul>
        <p onClick={() => navigate("/myprofile")}>Profile</p>
        <p>Settings</p>
        <p onClick={logoutLogic}>Logout</p>
      </ul>
    </div>
  )
}

export default Dropdown
