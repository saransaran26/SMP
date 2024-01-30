
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Protectedpage from './components/Protectedpage'
import Home from './pages/home page'
import Spinner from './components/Spinner'
import { useSelector } from 'react-redux'
import Profile from './pages/profile'
import Admin from './pages/Admin'
import Productinfo from './pages/productInfo'

function App() {
  const {loading} = useSelector((state)=>state.loaders)

  return (
    <div >
      {loading &&<Spinner/>}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protectedpage><Home /></Protectedpage>}/>
        <Route path='/product/:id' element={<Protectedpage><Productinfo /></Protectedpage>}/>
        <Route path='/profile' element={<Protectedpage><Profile /></Protectedpage>}/>
        <Route path='/admin' element={<Protectedpage><Admin /></Protectedpage>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
