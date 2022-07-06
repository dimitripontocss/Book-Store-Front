import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from '../Components/GlobalStyle.js';
import Home from '../Components/Home.js';
import Login from '../Components/Login.js';
import SignUp from '../Components/Signup.js';


export default function App(){


    return(
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<SignUp />} />
                </Routes>
            </BrowserRouter>         
        </>
    )
}