import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import styles from './navbar.module.scss';
import {  useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Assuming the user's name is provided as a prop or fetched from somewhere
  const userName = 'Chirayu Batra';
  const userInitial = userName.charAt(0).toUpperCase();  // Get the first character of the user's name
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>LOGO</div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => navigate("/buy")} >B</button>
        <button className={styles.button} onClick={() => navigate("/sell")}>S</button>
        {/* <button className={styles.button}>Explore campuses</button>   TO DO LATER-> FUTURE SCOPE */}
      </div>

      <div className={styles.userIcon}>
        {userInitial}
      </div>
      <Dropdown/>
    </nav>
  );
}

export default Navbar;
