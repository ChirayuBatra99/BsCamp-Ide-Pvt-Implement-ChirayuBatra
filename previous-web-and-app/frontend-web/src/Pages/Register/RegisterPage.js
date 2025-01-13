import React, { useState } from 'react'
import styles from './register.module.scss'
import { useNavigate } from "react-router-dom";

function RegisterPage() {

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const baseURL = 'http://localhost:8005'
  const [udata, setUdata] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handleSubmitt = async (event) => {
    event.preventDefault();
    const {email, password, cpassword} = udata;
    // Basic validation
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }

    // If validation passes
    setError('');
    try {
      const res = await fetch(`${baseURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password, cpassword
        })
      });
      const data = await res.json();
      console.log(data);
      if(res.status==422 || !data)
        console.log("some error bro");
      else 
        {
          setUdata({
            ...udata, name:"", password:"", cpassword:""
          })
          console.log("registeration done");
          
        }
    }
    catch (error) {
        console.log(error.message);
        
    }
    console.log({ email, password }); // Handle login logic here
  };

  const addData = (e) =>{
    const {name, value} = e.target;
    setUdata((pre) =>{
      return{
        ...pre,
          [name]:value
      }
    })
  }

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={udata.email}
            name='email'
            onChange={addData}
            className={styles.input}
          />
        </div>

        {/* <div className={styles.formGroup}>
            <label>Search Campus:</label>
            <input
              type="text"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className={styles.input}
            />
          </div> */}

        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={udata.password}
            onChange={addData}
            name="password"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={udata.cpassword}
            name="cpassword"
            onChange={addData}
            className={styles.input}
          />
        </div>

        <button className={styles.button} onClick={handleSubmitt}>Register</button><br />
        <button className={styles.button} onClick={() => navigate("/login")}>Already a User?</button>

      </form>
    </div>
  );
}

export default RegisterPage
