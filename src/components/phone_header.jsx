import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneLogo from "/images/logos/logo_white.png";

function PhoneHeader() {
    return (
        <header>
            <Link to="/">
                <img src={PhoneLogo} alt="Phone Header" />
            </Link>
        </header>
    );
}

export default PhoneHeader;