import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import AddEditStu from './components/AddEditStu';
import './App.css';

function App() {
  return (
    <>
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container'>
          <div className='navbar-header'>
            <NavLink to='/' className='navigation'>
              <span className='sys-version'>SMS 1.0</span>
            </NavLink>
          </div>
          <div id='navbar' className='collapse navbar-collapse'>
            <ul className='nav navbar-nav'>
              <NavLink to='/home' className='navigation'>
                Home
              </NavLink>
              <NavLink to='/about' className='navigation'>
                About
              </NavLink>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <NavLink to='/add' className='navigation'>
                Add
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>

      <div className='content'>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/add' element={<AddEditStu />} />
          <Route path="/edit/:id" element={<AddEditStu />} />
          <Route path='/' element={<Navigate replace to='/home' />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
