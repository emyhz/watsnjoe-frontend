import { Link, useNavigate } from "react-router-dom";
import logoColour from "../images/logos/logo_no-bg.png";
import '../styles/PhoneHeaderFooter.css';

function HeaderBanner({ title }) {
    if (!title) return null; // Don't render anything if there's no title

    return (
        <div className="header-banner">
            <div className="banner-red">
                <span className="banner-title">{title}</span>
            </div>
            <div className="banner-purple" />
            <div className="banner-blue" />
        </div>
    );
}

export default HeaderBanner;