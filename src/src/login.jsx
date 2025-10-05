import { useState } from 'react'
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {global} from "./global-context"

export default function Login() {
  const [email, setEmail] = useState("")
  const [passw, setPassw] = useState("")

  const {uid,setUid} = useContext(global)
  const handleLogin = async (e) => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth,email,passw)
      const existingUid = userCredential.user.uid;
      console.log(existingUid)
      setUid(existingUid)
      localStorage.setItem("uid",userCredential.user.uid)
      navigate('/home')
    }
    catch(e){
      if(e.code === 'auth/invalid-credential'){
        console.log("Wrong Password or Email")
      }
      else{
        console.log(e)
      }
    }
  }
  const navigate = useNavigate()
  return (
    <>
      <h1>Login</h1>
      <form style={{display:'flex', flexDirection:'column', gap:'10px'}}>
        <input placeholder='Enter email address' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input placeholder='Enter Password' type="number" value={passw} onChange={(e) => { setPassw(e.target.value) }} />
      </form>
      <button onClick={handleLogin}>Login</button>
      <button onClick={()=>navigate('/')}>Register</button>
    </>
  )
}