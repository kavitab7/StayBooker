import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Header from '../src/components/Header'
import Home from './screens/Home';
import Booking from './screens/Booking';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Route path='/home' exact Component={Home} />
        <Route path='/book/:roomid' exact Component={Booking} />
      </BrowserRouter>
    </>
  );
}

export default App;
