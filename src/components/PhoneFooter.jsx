import { Link } from "react-router-dom";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import '../styles/PhoneHeaderFooter.css';

function PhoneFooter() {
    return (
        <footer className="bottomNav">
            <Link to="/App" className="bottomNav__item">
                <FaHome />
            </Link>

            <Link to="/Map" className="bottomNav__pin">
                <MdLocationPin />
            </Link>

            <Link to="/Help" className="bottomNav__item">
                <FaQuestionCircle />
            </Link>
        </footer>
    );
}

export default PhoneFooter;