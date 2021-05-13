import React, { useState, useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {UserContext} from '../App';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const {state, dispatch} = useContext(UserContext);
    
const submiteLogin = async (e) =>{
    e.preventDefault();

    const res = await fetch("/signin",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
                email,
                password
        })
    });
    
    const data = await res.json();
    // console.log(res.status);
   //  result of error or success
    if(data.error){
        window.alert(data.error);
        console.log(data.error);
    }else{
        dispatch({type:"USER",payload:true});
        window.alert(data.success);
        console.log(data.success);
        history.push('/');
    }


}



return (
<>
    <div className="sidenav">
         <div className="login-main-text">
            <h2>Application<br /> Login Page</h2>
            <p>Login or register from here to access.</p>
            <p>Cokies Value is = </p>
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form method="">
                  <div className="form-group">
                     <label>User Name</label>
                     <input type="text"  onInput={(e)=> setEmail(e.target.value)} className="form-control" value={email} name="email" placeholder="User Name" />
                  </div>
                  <div className="form-group">
                     <label>Password</label>
                     <input type="password" onInput={(e)=>setPwd(e.target.value)} name="password" value={password} className="form-control" placeholder="Password" />
                  </div>
                  <button type="submit" className="btn btn-primary mr-2" onClick={submiteLogin}>Login</button>
                  <NavLink className="btn btn-secondary" to="/signup">Register</NavLink>
               </form>
            </div>
         </div>
      </div>
</>
    );
}

export default Login;
