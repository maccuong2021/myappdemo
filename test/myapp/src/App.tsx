import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import InventoryList from './components/InventoryList/InventoryList';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='app-content'>
        <InventoryList/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
