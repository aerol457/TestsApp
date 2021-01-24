import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.css';

const navItem = ({ title, link, clicked }) => {
    return <div className="nav-item"><NavLink onClick={clicked} exact activeClassName="active" className="nav-item-link" to={link}>{title}</NavLink></div>
}

export default navItem;

