import React,{ useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import {UserContext} from '../App';

const Logout = () =>{
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext);

   const LogoutUser = async() =>{

        try{
            const res = await fetch('/logout',{
                Method:"GET",
                header:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            });
            const data = await res.json();
            console.log(data);
            if(res.status===200){
                dispatch({type:"USER",payload:false});
                history.push('/',{replace:true});
            }else{
                alert(data.error);
            }
    
        }catch(err){
            console.log(err);
        }
    }
     useEffect(()=>{
        LogoutUser();
    },[]);

    return true;
}


export default Logout;
