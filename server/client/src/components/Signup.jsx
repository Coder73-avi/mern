import React, {useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:""
    });

let name, value;
const handleInputs = (e) =>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value});
}


const postData = async (e)=> {
    e.preventDefault();
    const {name, email, phone, work, password, cpassword} = user;

    const res = await fetch("/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
                name, email, phone, work, password, cpassword
        })
    });
    
    const data = await res.json();

    // console.log(data.message);
    if(data.error){
        window.alert(data.error);
        console.log(data.error);
    }else{
        window.alert(data.success);
        console.log(data.success);
        history.push('/login');
    }

}

    return (
        <>
            
        <main className="my-form">
            <div className="cotainer">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Register your account</h2>
                                    <p className="right-align">Already Registered <NavLink to="/login"> Login </NavLink></p>
                                </div>
                                <div className="card-body">
                                    <form name="my-form"  >
                                        <div className="form-group row">
                                            <label htmlFor="full_name" className="col-md-4 col-form-label text-md-right">Full Name</label>
                                            <div className="col-md-6">
                                                <input type="text" id="full_name" className="form-control" name="name"
                                                value={user.name}
                                                onChange={handleInputs}  />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="email_address" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                            <div className="col-md-6">
                                                <input type="text" id="email_address" className="form-control" name="email" 
                                                value={user.email}
                                                onChange={handleInputs} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="phone_number" className="col-md-4 col-form-label text-md-right">Phone Number</label>
                                            <div className="col-md-6">
                                                <input type="text" id="phone_number" name="phone" className="form-control"
                                                value={user.phone}
                                                onChange={handleInputs}  />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="" className="col-md-4 col-form-label text-md-right">Profession</label>
                                            <div className="col-md-6">
                                                <input type="text" id="" name="work" className="form-control"
                                                value={user.work}
                                                onChange={handleInputs}  />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="Password" className="col-md-4 col-form-label text-md-right">Password</label>
                                            <div className="col-md-6">
                                                <input type="text" id="Password" className="form-control" name="password" 
                                                value={user.password}
                                                onChange={handleInputs} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="cpassword" className="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                            <div className="col-md-6">
                                                <input type="text" id="cpassword" className="form-control" name="cpassword"
                                                value={user.cpassword}
                                                onChange={handleInputs}  />
                                            </div>
                                        </div>

                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" onClick={postData} className="btn btn-primary">
                                                Register
                                                </button>
                                            </div>
                                    </form>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

        </main>
        </>
    );
}

export default Signup
