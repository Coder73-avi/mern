import React, {useEffect, useState} from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import Profile from '../image/login-img.jpg';

const About = () => {
    const [userData, setUserData] = useState({});
    const history = useHistory();

    const callAboutPage = async () =>{
        try{
            const res = await fetch('/about',{
                method:"GET",
                headers:{
                    Accept:"appllication/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
                
            });
            const data = await res.json();
            setUserData(data);
            // console.log(data);

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            // console.log(err);
            history.push('/login');
        }

        // set the object distructuring

    }
        // const {id, name, work, email, phone} = userData;

    useEffect(() => {
       callAboutPage();
    },[]);
    const edit = `/update/${userData._id}`;
    return (
        <>
            <div className="container emp-profile">
                <form action="GET" method="">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={Profile} alt="Profile" className="w-75 h-100"/>
                        </div>

                        <div className="col-md-4">
                            <div className="profile-head">
                                <h5>{ userData.name }</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5"> RANKINGS <span>1/10</span></p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#timeline" role="tab">Timeline</a>
                                    </li>
                                </ul>
                               
                            </div>
                        </div>

                        <div className="col-md-2">
                            <NavLink to={edit}>Edit Profile</NavLink>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="http://avishekmagar.com.np">website</a><br/>
                                <a href="http://avishekmagar.com.np">youtube</a><br/>
                                <a href="http://avishekmagar.com.np">facebook</a><br/>
                                <a href="http://avishekmagar.com.np">twitter</a><br/>
                                <a href="http://avishekmagar.com.np">instagram</a><br/>                   
                            </div>
                        </div>
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label> User Id</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData._id}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="User Id"> Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="User Id"> Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="User Id"> Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-2">
                                        <div className="col-md-6">
                                            <label htmlFor="User Id"> Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default About
