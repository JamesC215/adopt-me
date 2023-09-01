import {useState} from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import Payment from '../../components/Payment/Payment';
import Completion from '../../components/CompletionPage/Completion';
import Logo from '../../components/Logo/Logo';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewOrderPage from '../NewDonationPage/NewDonationPage';
import OrderHistoryPage from '../CheckoutPage/CheckoutPage';
import NavBar from '../../components/NavBar/NavBar';
import Homepage from '../HomePage/HomePage';
import NavButtons from '../../components/NavButtons/NavButtons';


  export default function App() {
    const [user, setUser] = useState(getUser());
  return (
    <>
      <NavButtons />
      <Logo />
    <main> 
      { user ? 
      <>
      <NavBar user={user} setUser={setUser}/>
        <Routes> 
          <Route path='/orders/new' element={<NewOrderPage/>} />
          <Route path='/orders' element={<OrderHistoryPage/>} />
          <Route path='/completion' element={<Completion />} />
        </Routes>
      </>
        :
        <>
        <Homepage/>
        <AuthPage setUser={setUser}/>
        </>
      }
    </main>
      </>
  );
  
}


