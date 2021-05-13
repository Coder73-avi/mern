import React,{useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Axios from 'axios';

function Update() {
    let name, value;
    const {id} = useParams();
    const history = useHistory();
    const [user, setUser] = useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
    });


const handleInputs = (e) =>{
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]:value});
}

const checkUser = async() =>{

    const res = await fetch('/getData',{
        method:"GET",
        header:{
            "Content-Type":"application/json"
        }
    });
    const data = await res.json();
    if(res.status===200){
        setUser({name:data.name,email:data.email, phone:data.phone, work:data.work});
    }else{
        history.push('/login',{replace:true});
    }
}

const updateData = async(e) =>{
    e.preventDefault();
    const {name, email, phone, work, password} = user;
    
    const res = await fetch(`/update/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user),

        
    });
    
    // const res = await Axios.patch(`http://localhost:4000/update/${id}`,name,{
    //     headers:{
    //         "Content-Type":"application/json"
    //     }
    // });
    const data = await res.json();
    if(res.status===200){
        console.log(data.success);
    }else{
        console.log(data.error);
    }
}

useEffect(()=>{
    checkUser();
},[]);

    return (
        <>
           
        <main className="my-form">
            <div className="cotainer">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Edit your account</h2>
                                </div>
                                <div className="card-body">
                                    <form name="my-form" >
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
                                            <div className="col-md-6 offset-md-4">
                                                <button type="submit" onClick={updateData} className="btn btn-primary">
                                                Update
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
    )
}

export default Update
