import React, { useState, useEffect } from 'react';
import styles from './myprofile.module.scss'; // Import the SCSS module

const Myprofile = () => {
  const [activeSection, setActiveSection] = useState('myInfo');
  const baseURL = 'http://localhost:8005'
  const [email, setEmail] = useState(null);

  const [udata, setUdata] = useState({
    opassword: "",
    npassword: "",
    cnpassword: ""
  });

  useEffect(() => {
    const fetchProfiledata = async() => {
      try{
        const res =await fetch(`${baseURL}/myprofile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setEmail(data);
      }
      catch(error)
      {
        console.log("error here bro at myprofile page", error.message);
      }
    }
    fetchProfiledata();
  }, [] )
  
  const addData = (e) => {
    const {name, value} = e.target;
    setUdata((pre) => {
      return {
        ...pre,
          [name]: value
      }
    })
  }

  const handlePasswordChange = async(e) => {
    e.preventDefault();
    const {opassword, npassword, cnpassword} = udata;
    if(npassword !== cnpassword) {
      console.log('Both new passwords dont match')
      return;
    }
    if(npassword.length <6) {
      console.log('Password must be at least 6 characters');
      return;
    }
    try{
      const res = await fetch(`${baseURL}/changepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          opassword, npassword, cnpassword
        }),
        credentials: 'include'
      });
      const data = await res.json();
      if(res.status == 400 || !data)
          console.log("erorr came bro at myrofile page in if condition");
      else
      {
        console.log("password changed succes");
        setUdata({...udata, opassword:"", npassword:"", cnpassword:""})
        console.log(data);
      }
    }
    catch(error){
      console.log("error bro", error.message);
    }

  }

  const renderContent = () => {
    switch (activeSection) {
      case 'myInfo':
        return (
          <div className={styles.infoSection}>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className={styles.profilePic}
            />
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Mobile:</strong> +1234567890</p>
          </div>
        );

      case 'changePassword':
        return(
          <>
        <div>Change Password Section</div>
        <form onSubmit={handlePasswordChange}>
            <label>Old password</label>
            <input
              type= "password"
              value = {udata.opassword}
              name= "opassword"
              onChange={addData}            
            ></input>
            <br/>
            <label>New password</label>
            <input
             type= "password"
             value = {udata.npassword}
             name= "npassword"
             onChange={addData} 
             ></input>
            <br/>
            <label>Confirm new password</label>
            <input
             type= "password"
             value = {udata.cnpassword}
             name= "cnpassword"
             onChange={addData} 
             ></input>
             <button type="submit">Change</button>
        </form>
        </>
      );

      case 'settings':
        return <div>Settings Section</div>;

      default:
        return <div>Select an option</div>;
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.sidebar}>
        <ul>
          <li onClick={() => setActiveSection('myInfo')}>My Info</li>
          <li onClick={() => setActiveSection('changePassword')}>Change Password</li>
          <li onClick={() => setActiveSection('settings')}>Settings</li>
        </ul>
      </div>
      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Myprofile;
