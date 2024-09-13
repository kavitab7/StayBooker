import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Header from '../src/components/Header'
import Home from './screens/Home';
import Booking from './screens/Booking';
import Login from './screens/Login';
import Register from './screens/Register';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/home' exact Component={Home} />
          <Route path='/book/:roomid/:fromDate/:toDate' exact Component={Booking} />
          <Route path='/login' exact Component={Login} />
          <Route path='/register' exact Component={Register} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
