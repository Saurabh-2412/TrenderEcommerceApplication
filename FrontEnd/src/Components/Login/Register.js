import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../Contexter/ProductContext";

export function Register() {
    const navigate = useNavigate();
    const { dispatchProduct } = useProduct();
    const [records, setRecords] = useState([]);
    const [userRegisteration, setUserRegisteration] = useState({
        username : "",
        email : "",
        number : "",
        password : ""
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegisteration({ ...userRegisteration, [name] : value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //const newRecord = { ...userRegisteration, userId : new Date().getTime().toString()};
        //setRecords([ ...records, newRecord]);
        
        try {
            const { data, status } = await axios.post("https://ecommercedata.saurabhsharma11.repl.co/v1/userData",
            {
                name: userRegisteration.username, password: userRegisteration.password, mail: userRegisteration.email,
                phone: userRegisteration.number
            })
            //console.log("server resp", data.UserRecord);
            if(status === 200){
                const filteredData = data.UserRecord.filter((currentUser) => currentUser.name === userRegisteration.username);
                setRecords(filteredData);
                setUserRegisteration({username:"",email:"",number:"",password:""})
                dispatchProduct({ type:"Registered"});
                navigate("/Login")
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const HandleReset = () => {
        setUserRegisteration([...records])
    }

    const loginHandler = () => {
        navigate("/Login")
    }

    return (
        <div style={{padding:"10px"}}>
            <h3 style={{color:"#41464b"}}>Register ur'self with <i className="material-icons" style={{fontSize:"1.5rem"}}>&#xe8e5;</i>TC</h3>
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" style={{margin:"10px"}}>FullName</label>
                    <input type="text" onChange={handleInput} id="username" name="username" value={userRegisteration.username} required/>
                </div><br/>
                <div>
                    <label htmlFor="email" style={{margin:"20px"}}>E-Mail</label>
                    <input type="text" onChange={handleInput} id="email" name="email" value={userRegisteration.email} required/>
                </div><br/>
                <div>
                    <label htmlFor="number" style={{margin:"18px"}}>Number</label>
                    <input type="text" onChange={handleInput} id="number" name="number" value={userRegisteration.number} required/>
                </div><br/>
                <div>
                    <label htmlFor="password" style={{margin:"12px"}}>Password</label>
                    <input type="password" onChange={handleInput} autoComplete="off" id="password" name="password" value={userRegisteration.password} required/>
                </div><br/>
                <button type="submit">Register</button>
                <button type="reset" onClick={HandleReset}>Reset</button>
                <button onClick={loginHandler}>Login</button>
            </form>
            {/**
                <div style={{fontSize:"larger",padding:"1.7rem 0"}}>
                    {records.map((currentUser) => {
                        return (
                            <div>
                                <p>Hello {currentUser.name},<br/>Please use this userId for LogingIn {currentUser._id}</p>
                            </div>
                        )
                    })}
                </div>
            */}
        </div>
    )
}
