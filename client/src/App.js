import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import NavMenu from './Components/NavMenu';
import Footer from './Components/Footer';
import Index from './Components/Index';
import Customers  from './Components/Cutomers';
import Transactions from './Components/Transactions';
import AddUser from './Components/AddUser';
import './App.css';
import Home from './Components/Home';
import About from './Components/About';

function App() {
    return (
        <div className="App">
            <NavMenu />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/customers" element={<Index />} />
                <Route path="/customers/:id" element={<Customers />} />
                <Route path="/customers/:id/transactions" element={<Transactions />} />
                <Route path="/adduser" element={<AddUser />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;