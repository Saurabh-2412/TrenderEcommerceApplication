import React,{useEffect, useState} from "react";
import axios from "axios";

export function Address() {
  const  { token } = JSON.parse(localStorage?.getItem("login")) || {};
  const [user, setUserData] = useState([]);
  
  //for fetching data
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )

  useEffect(() => {
    (async function () {
      try{
        const { data } = await axios.get(
          "https://ecommercedata.saurabhsharma11.repl.co/v1/userData"
        );
        setUserData(data.userData[0]);
      }
      catch(err){
        console.log(err);
      }
    })();
  },[]);

  return (
    <div>
      <h1 style={{color:"orange",border:"2px solid gray",borderRadius:"5px"}}><em>User Details</em></h1>
      <ul style={{margin:"0",padding:"0"}}>
        <li key={user._id} style={{listStyleType:"none"}}>
        <div style={{padding:"15px 0",fontSize:"larger",color:"#41464b"}}>Name : {user.name}</div>
        <div style={{padding:"15px 0",fontSize:"larger",color:"#41464b"}}>User-ID : {user._id}</div>
        <div style={{padding:"15px 0",fontSize:"larger",color:"#41464b"}}>Email-ID: {user.mail}</div>
        <div style={{padding:"15px 0",fontSize:"larger",color:"#41464b"}}>Contact-No : {user.phone}</div>
        </li>
      </ul>
    </div>
  );
}
