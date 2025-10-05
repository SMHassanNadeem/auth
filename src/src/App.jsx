import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './login'
import Register from './register'
import Home from './home'

function App() {
  return(
    <>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>} />
      </Routes>
    </>
  )
}
export default App