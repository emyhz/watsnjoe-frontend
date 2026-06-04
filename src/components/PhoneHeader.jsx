import { Link } from "react-router-dom";
import logoColour from "../images/logos/logo_no-bg.png";
import '../styles/PhoneHeaderFooter.css';

function PhoneHeader() {
    return (
        <header className="header">
            <Link to="/">
                <img src={logoColour} alt="WatsNJoe" />
            </Link>
        </header>
    );
}

export default PhoneHeader;