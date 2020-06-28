import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup = ()=>{
    const history = useHistory(); 
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#f44336 red"})
            return}
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
        if(data.error){
            M.toast({html: data.error,classes:"#f44336 red"})
        }
        else{
            M.toast({html:data.message,classes:"#76ff03 light-green accent-3"})
            history.push('/login')
        }
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div className="mycard">
            <div className="card auth input-field">
            <h2>Instagram</h2>
            <input
                type="text"
                placeholder="name"
                value={name}
                onChange= {(e)=>setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="email"
                value={email}
                onChange= {(e)=>setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="password"
                value={password}
                onChange= {(e)=>setPassword(e.target.value)}
            />
            <button className="btn waves-effect waves-light #b2ff59 light-green accent-2" 
            onClick={()=>PostData()}
            >
            Signup
            </button>
            <h5>
            <Link to="/login">Already have an account ?</ Link>
            </h5>
            </div>
        </div>
    )
}

export default Signup;