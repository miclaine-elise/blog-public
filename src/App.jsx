import { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import github from './assets/github.svg';
let localToken = localStorage.getItem('private-jwt');
localToken = localToken ? localToken : null;
export default function App() {
  const [token, setToken] = useState(localToken);

  const navigate = useNavigate();
  return (
    <div className="app">
      <header>
        <h1>hi friends, welcome to my blog</h1>
        <nav className="navbar">
          <button onClick={(() => navigate("/posts"))}>
            home
          </button>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <span>made by miclaine</span>
        <a href="https://github.com/miclaine-elise">
          <img src={github}></img>
        </a>
      </footer >
    </div >
  );
}