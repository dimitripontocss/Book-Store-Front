import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from '../Components/GlobalStyle.js';
import Home from '../Components/Home.js';
import Login from '../Components/Login.js';
import SignUp from '../Components/Signup.js';
import Cart from './Cart.js';

import UserContext from "../Context/userContext.js";

export default function App(){

    const [token,setToken] = useState(null);
    const [username,setUsername] = useState(null);

    return(

        <UserContext.Provider value={{token,setToken,username,setUsername}}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<SignUp />} />
                    <Route path="/carrinho" element={<Cart />} />
                </Routes>
            </BrowserRouter>         
        </UserContext.Provider>
    )
}