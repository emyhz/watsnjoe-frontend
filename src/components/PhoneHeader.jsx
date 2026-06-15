import { Link, useNavigate } from "react-router-dom";
import logoColour from "../images/logos/logo_no-bg.png";
import flagEN from "../images/icons/English.png";
import flagNL from "../images/icons/NL.webp";
import useLangStore from "../store/langStore";
import '../styles/PhoneHeaderFooter.css';

function PhoneHeader() {
    const navigate = useNavigate();
    const { lang, setLang } = useLangStore();

    return (
        <header className="header">
            <div className="header__top-row">
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

                <div className="header__logo-container">
                    <Link to="/App">
                        <img src={logoColour} alt="WatsNJoe" />
                    </Link>
                </div>

                <div className="header__lang">
                    <button
                        className={`langFlag ${lang === 'en' ? 'langFlag--active' : ''}`}
                        onClick={() => setLang('en')}
                        aria-label="Switch to English"
                    >
                        <img src={flagEN} alt="English" />
                    </button>
                    <button
                        className={`langFlag ${lang === 'nl' ? 'langFlag--active' : ''}`}
                        onClick={() => setLang('nl')}
                        aria-label="Schakel naar Nederlands"
                    >
                        <img src={flagNL} alt="Nederlands" />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default PhoneHeader;