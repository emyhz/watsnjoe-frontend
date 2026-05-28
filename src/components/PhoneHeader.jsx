import { useState } from "react";
import { Link } from "react-router-dom";
import LogoWhite from "../images/logos/logo_white.png";
import "./../styles/phone.css";
import './../styles/PhoneHeaderFooter.css';


function PhoneHeader() {
    return (
        <header className="header">
            <Link to="/">
                <img src={LogoWhite} alt="Watsnjoe Logo" className="phoneLogo" />
            </Link>
        </header>
    );
}

export default PhoneHeader;