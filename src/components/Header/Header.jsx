import React from "react";
import "./index.css";
import { Link } from 'react-router-dom';

function Header() {
    return(
        <div className="header">
            <div className="wrapper">
                <h1 className="logo">instagram</h1>
                <nav className="navigation">
                    <ul className="nav-wrapper">
                        <Link to='/feed'>
                            <li className="nav">
                                <img src="/assets/header/feed-dac.svg" alt="피드로 가기" />
                            </li>
                        </Link>
                        <Link to='/profile'>
                            <li className="nav">
                                <img src="/assets/header/profile-dac.svg" alt="프로필로 가기" />
                            </li>
                        </Link>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Header