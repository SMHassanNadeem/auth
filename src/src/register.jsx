import { useEffect, useState } from 'react'
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {global} from "./global-context"
export default function Register() {
  const [email, setEmail] = useState("")
  const [passw, setPassw] = useState("")
  const navigate = useNavigate()
  const {uid,setUid} = useContext(global)
  async function submit(param) {
    try {
      param.preventDefault()
      const userCredential = await createUserWithEmailAndPassword(auth, email, passw)
      console.log(userCredential.user.uid);
      setUid(userCredential.user.uid);
      localStorage.setItem("uid",userCredential.user.uid)
      navigate('/home')
    }
    catch (e) {
        if(e.code === 'auth/email-already-in-use'){
            navigate('/login')
            alert("User alredy exist please login")
        }
        else{
            console.log(e.message);
        }
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("uid")){
        navigate('/home')
    }
  },[])
  return (
    <>
      <h1>Register</h1>
      <form style={{display:'flex', flexDirection:'column', gap:'10px'}} onSubmit={submit}>
        <input placeholder='Enter email address' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input placeholder='Enter Password' type="number" value={passw} onChange={(e) => { setPassw(e.target.value) }} />
        <button type='submit'>Sign up</button>
      </form>
    </>
  )
}