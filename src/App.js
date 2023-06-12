import { Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Routs/Dashboard';
import NewBike from './Routs/NewBike';
import Card from './Routs/Card';
import BikeBook from './Routs/BikeBook';
import SignUp from './Routs/User/SignUp';
import ValidateEmail from './Routs/User/Validate';
import ForgetEmail from './Routs/User/Forget';
import SignIn from './Routs/User/SignIn';
import ConfirmBooking from './Routs/ConfirmBooking';
import BookDetail from './Routs/BookDetail';
import LogOut from './Routs/LogOut';
import { ToastContainer } from 'react-toastify';

export const url = 'http://localhost:7000'

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/dashboard/:id' element={<Dashboard/>}/>
      <Route path='/:id/new' element={<NewBike/>}/>
      <Route path='/:id/:userid' element={<Card/>}/>
      <Route path=':id/book/:userid' element={<BikeBook/>}/>
      <Route path='/validate' element={<ValidateEmail/>}/>
      <Route path='/forget' element={<ForgetEmail/>}/>
      <Route path=':id/booking/:userid' element={<ConfirmBooking/>} />
      <Route path='/:id/bike' element={<BookDetail/>}/>
      <Route path='/:id' element={<LogOut/>}/>
    </Routes>
    <ToastContainer/>
    </div>
  );
}

export default App;
