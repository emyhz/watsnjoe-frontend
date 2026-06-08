import { Link, useNavigate } from "react-router-dom";
import logoColour from "../images/logos/logo_no-bg.png";
import '../styles/PhoneHeaderFooter.css';

function PhoneHeader() {
    const navigate = useNavigate();

    return (
        <header className="header">
            {/* Back Button with clean SVG Arrow */}
            <button className="header__back-btn" onClick={() => navigate(-1)} aria-label="Go back">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    className="header__back-icon"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
            
            {/* Logo container on the right */}
            <div className="header__logo-container">
                <Link to="/App">
                    <img src={logoColour} alt="WatsNJoe" />
                </Link>
            </div>
        </header>
    );
}

export default PhoneHeader;