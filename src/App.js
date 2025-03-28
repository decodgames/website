import React from 'react';
import './App.css';

import Privacypolicy from './components/privacypolicy/index';
import User from './components/userdetails/user';
import Terms from './components/Terms and conditions/terms';

import { Route, Routes } from 'react-router-dom';
// import { Routes,Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';


function App() {
    return (
        <div className="App">
     <Routes>
     <Route path='/terms' element={<Terms/>}/>
     <Route path='/Privacypolicy' element={<Privacypolicy/>}/>
     <Route path='/user' element={<User/>}/>
</Routes>
        </div>
    );
}
export default App;
