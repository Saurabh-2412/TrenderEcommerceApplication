import React,{ useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexter/AuthContext";
import { useProduct } from "../../Contexter/ProductContext";

export function Login() {
	const { dispatchProduct } = useProduct();
	const { isUserLoggedIn, setIsUserLoggedIn, token } = useAuth();
	const [notify, setNotify] = useState("");
	const navigate = useNavigate();
	const usernameRef = React.useRef();
	const passwordRef = React.useRef();
	
	async function handleSubmit() {
		axios.interceptors.request.use(
			config => {
				config.headers.authorization = token;
				return config;
			},
			error => {
				return Promise.reject(error);
			}
		)

		if(!isUserLoggedIn){
			try{
				const userId = usernameRef.current.value;
				const password = passwordRef.current.value;
				if(userId !== "" || password !== "") {
					const { data,status } = await axios.post(
						"https://ecommercedata.saurabhsharma11.repl.co/v1/userData/60b4af4ee2cd0c0028a55988",
						{ userId:userId, password: password }
					);
					if(status === 200){
						setIsUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn);
						isUserLoggedIn || navigate("/");
						localStorage?.setItem(
							"login",
							JSON.stringify({ isUserLoggedIn:true, token:data.token })
						);
						dispatchProduct({type:"LoggedIN"})
					} else if(status === 401 || status === 500){
						setNotify("Invalid UserID or Password..!");
					}
				} else {
					setNotify("Please enter valid UserID or Password..!");
				}
			}
			catch(err){
				setNotify("Invalid UserID or Password..!");
			}
		} else {
			setIsUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn);
			isUserLoggedIn || navigate("/");
			localStorage?.removeItem("login");
			dispatchProduct({type:"LoggedOut"})
		}
	};

	function SignUp(){
		navigate("/Register")
	}

	return (
		<>
			<h1 style={{color:"gray"}}>Login</h1>
			<label style={{marginRight:"15px"}}>UserID</label>
			<input type="text" ref={usernameRef} disabled={isUserLoggedIn ? true : false} required/>
			<br /><br />
			<label style={{marginRight:"4px"}}>Password</label>
			<input type="password" ref={passwordRef} disabled={isUserLoggedIn ? true : false} required/>
			<br /><br />
			<button	onClick={handleSubmit}>
			{isUserLoggedIn ? "Logout" : "Login"}
			</button>
			<button onClick={SignUp} disabled={isUserLoggedIn ? true : false}>SignUp?</button>
			<br/>
			<p style={{fontSize:"larger",fontWeight:"600",color: "red"}}>{notify}</p>
			<p>
				UserID : sid@gmail.com<br/>
				Password 12345
			</p>
		</>
	);
}
