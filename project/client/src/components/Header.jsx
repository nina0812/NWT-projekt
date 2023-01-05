import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { checkLogged } from '../actions/helpers';

const Header = () => {
  const [opened, setOpened] = useState(false);
  const [logged, setLogged] = useState(null);

  useEffect(() => {
    checkLogged().then(e => { setLogged(e); });
  }, [logged]);

  return (
    <header>
        <div className="logo">
            CHARM
        </div>
        <div className="hamburger" onClick={() => {setOpened(!opened)}}>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
        </div>
        <div className="navbar" {...opened && {opened: ''}}>
            <Link to="/" className="nav">Home</Link>
            {!logged && <Link to="/login" className="nav">Login</Link>}
            {!logged && <Link to="/register" className="nav">Register</Link>}
            {logged && <Link to="/myproducts" className="nav">My products</Link>}
            {logged && <Link to="/login" onClick={() => {localStorage.removeItem("user"); window.location.reload(false);}} className="nav">Logout</Link>}
        </div>
    </header>
  );
}

/* 
  
*/

export default Header;
