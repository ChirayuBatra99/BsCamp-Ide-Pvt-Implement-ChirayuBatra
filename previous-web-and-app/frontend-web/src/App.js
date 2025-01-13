import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Pages/Login/LoginPage';
import Home from './Pages/Home/Home';
import RegisterPage from './Pages/Register/RegisterPage';
import Myprofile from './Components/Myprofile/Myprofile';
import BuyPage from './Pages/BuyPage/BuyPage';
import './App.css';
import SellPage from './Pages/SellPage/SellPage';
import BidPage from './Pages/BidPage/BidPage';

function App() {
  return (
    <div className="App">
       <Router>
         <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/myprofile" element={<Myprofile />} />
            <Route path="/buy" element={<BuyPage/>} />
            <Route path="/sell" element={<SellPage/>} />
            <Route path="/placebid" element={<BidPage/>} />
         </Routes>
      </Router>
    </div>
  );
}

export default App;
