
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UrlShortner from './Routes/UrlShortner';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Routes/Login';
import Register from './Routes/Register';
import Home from './Home';
import Forgot from './Routes/Forgot';
import Reset from './Routes/Reset';
import ProtectedRout from './Routes/ProtectedRout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
 <BrowserRouter>
<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/signup' element={<Register/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
  <Route path='/forgot' element={<Forgot/>}></Route>
  <Route element={<ProtectedRout/>}>
  <Route path='/urlshortner/:name' element={<UrlShortner/>}></Route>
  </Route>
  <Route path='/:userid/:token' element={<Reset/>}></Route>
</Routes>
<ToastContainer/>
</BrowserRouter> 


  );
}

export default App;
