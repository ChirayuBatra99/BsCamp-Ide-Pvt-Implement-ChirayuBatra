import React, {useState} from 'react'
import styles from './login.module.scss'
import { useNavigate } from "react-router-dom";

function Login() {
  const baseURL = 'http://localhost:8005'
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [udata, setUdata] = useState({
    email: "",
    password: ""
  })
  const handleSubmit = async(event) => {
    event.preventDefault();
    const {email, password} = udata;

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try{
      const res = await fetch(`${baseURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if(res.status != 201 || !data)
        console.log("invalid details");
      else
      {
        console.log("data valid");
        setUdata({...udata, email: "", password: "" })  
        console.log(data);
        navigate("/")
      } 
    }
    catch(error){
      console.log("error bro", error.message);
    }
    setError('');
    console.log({ email, password }); // Handle login logic here
  };





  const addData = (e) => {
    const {name, value} = e.target;
    setUdata((pre)=> {
      return {
        ...pre,
          [name]: value
      }
    })
  }

  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
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

        <button className={styles.button} onClick={handleSubmit}>Login</button><br />
        <button className={styles.button} onClick={() => navigate('/register')}>New User?</button>

      </form>
    </div>
  );
}

export default Login
