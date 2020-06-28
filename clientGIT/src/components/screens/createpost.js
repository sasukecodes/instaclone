import React,{useState,useEffect} from 'react';
import M from 'materialize-css';
import {useHistory} from 'react-router-dom';

const CreatePost = () =>{

    const history = useHistory()
    const[title,setTitle] = useState("")
    const[body,setBody] = useState("")
    const[image,setImage] = useState("")
    const[url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
             
        if(data.error){
            M.toast({html: data.error,classes:"#f44336 red"})
        }
        else{
            M.toast({html:"posted successfully",classes:"#76ff03 light-green accent-3"})
            history.push('/')
        }
        }).catch(err=>{
            console.log(err)
        })
        }
    },[url])

    const postDetails = () =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","rajinstaclone")
        fetch("	https://api.cloudinary.com/v1_1/rajinstaclone/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })

        
    }
    
    return(
        <div className="card input-field"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" 
            placeholder="title" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}/>

            <input type="text" 
            placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
            />
            
            <div className="file-field input-field">
                <div className="btn #2979ff blue accent-3">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light #b2ff59 light-green accent-2" 
            onClick={()=>postDetails()}
            >Submit Post</button>

        </div>
    )
}

export default CreatePost