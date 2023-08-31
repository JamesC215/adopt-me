import {useState} from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import Payment from '../../components/Payment/Payment';
import Completion from '../../components/CompletionPage/Completion';

import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewDonationPage/NewDonationPage';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../components/NavBar/NavBar';


  export default function App() {
    const [user, setUser] = useState(getUser());
  return (
    <main> 
      { user ? 
      <>
      <NavBar user={user} setUser={setUser}/>
        <Routes> 
          <Route path='/orders/new' element={<NewOrderPage/>} />
          <Route path='/orders' element={<OrderHistoryPage/>} />
          <Route path='/' element={<Payment />} />
          <Route path='/completion' element={<Completion />} />
        </Routes>
      </>
        :
        <AuthPage setUser={setUser}/>
      }
    </main>
  );
  
}


