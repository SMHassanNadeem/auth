import { useState } from 'react'
import './App.css'
import { auth } from './firebase';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from 'firebase/auth';

function App() {
  const [email, setEmail] = useState("")
  const [passw, setPassw] = useState("")
  // const [loginError,setLoginError] = useState("")

  const [uid, setUid] = useState("");
  async function submit(param) {
    try {
      param.preventDefault()
      const userCredential = await createUserWithEmailAndPassword(auth, email, passw)
      console.log(userCredential.user.uid);
      setUid(userCredential.user.uid);
    }
    catch (e) {
      console.log(e.message);
    }
  }
  const handleLogin = async (e) => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth,email,passw)
      console.log("logged in")
      const existingUid = userCredential.user.uid;
      console.log(existingUid)
      setUid(existingUid)
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
  const signout = async()=>{
    try{
      await signOut(auth)
      setUid("");
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <>
      <form onSubmit={submit}>
        <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input type="number" value={passw} onChange={(e) => { setPassw(e.target.value) }} />
        <button type='submit'>Sign up</button>
      </form>
      <button onClick={signout}>Sign out</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={()=> console.log(uid)}>Check</button>
    </>
  )
}
export default App