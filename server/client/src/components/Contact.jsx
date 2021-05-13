import React, { useEffect, useState } from 'react';

const Contact = () => {

const [userData, setUserData] = useState({name:"",email:"",subject:"",message:""})
 const callContactpage = async () =>{
        try{
            const res = await fetch('/getdata',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                },
                
            });
            const data = await res.json();
            setUserData({...userData, name:data.name, email:data.email });
            // console.log(data);

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }
        }catch(err){
            console.log(err);
        }
  }

    useEffect(()=>{

        callContactpage();
        
    },[]);

    // we are storing data in states
    let name, value;
    const hendleInput = (e) =>{
        name = e.target.name;
        value = e.target.value;
        setUserData({...userData, [name]:value})
    }
console.log(userData);

    const contactForm = async (e)=>{
        e.preventDefault();
        const {name, email, subject, message} = userData;
        console.log(name);
        const res = await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, subject, message
            })
        });

        const data = await res.json();

        if(res.status === 201){
            setUserData({...userData,subject:"", message:""});
            alert(data.success);
        }else{

             console.log(data.error);


        }


    }

    return (
        <>
            
        <div className="jumbotron jumbotron-sm">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-12">
                        <h1 className="h1">
                            Contact us <small></small></h1>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <div className="well well-sm">
                        <form method="POST">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Name</label>
                                    <input type="text" onChange={hendleInput} value={userData.name} className="form-control" name="name" id="name" placeholder="Enter name" required="required" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-envelope"></span>
                                        </span>
                                        <input type="email" onChange={hendleInput} value={userData.email} className="form-control" name="email" id="email" placeholder="Enter email" required="required" /></div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">
                                        Subject</label>
                                    <input type="text" value={userData.subject} onChange={hendleInput} className="form-control"  id="subject" name="subject" placeholder="Subject" required="required" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Message</label>
                                    <textarea id="message" value={userData.message} onChange={hendleInput} name="message" className="form-control" rows="9" cols="25" required="required"
                                        placeholder="Message"></textarea>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" onClick={contactForm} className="btn btn-primary pull-right" id="btnContactUs">
                                    Send Message</button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-4">
                    <form>
                    <legend><span className="glyphicon glyphicon-globe"></span> Our office</legend>
                    <address>
                        <strong>Twitter, Inc.</strong><br />
                        795 Folsom Ave, Suite 600<br />
                        San Francisco, CA 94107<br />
                        <abbr title="Phone">
                            P:</abbr>
                        (123) 456-7890
                    </address>
                    <address>
                        <strong>Full Name</strong><br />
                        <a href="mailto:#">first.last@example.com</a>
                    </address>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default Contact
