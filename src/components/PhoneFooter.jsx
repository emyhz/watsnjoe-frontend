import { Link } from "react-router-dom";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import '../styles/PhoneHeaderFooter.css';

function PhoneFooter() {
    return (
        <footer className="bottomNav">
            <Link to="/App" className="bottomNav__item" aria-label="Home">
                <FaHome />
            </Link>

            {/* Wrapper added here to create the clean cutout outline */}
            <div className="bottomNav__pin-wrapper">
                <Link to="/Map" className="bottomNav__pin" aria-label="Map">
                    <MdLocationPin />
                </Link>
            </div>

            <Link to="/Help" className="bottomNav__item" aria-label="Help">
                <FaQuestionCircle />
            </Link>
        </footer>
    );
}

export default PhoneFooter;