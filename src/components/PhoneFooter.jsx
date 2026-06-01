import { Link } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaPhoneAlt, FaRegQuestionCircle } from "react-icons/fa";
import './../styles/phone.css'
import '../styles/PhoneHeaderFooter.css';
import Map from "../pages/phone/Map";
import Contactinfo from "../pages/phone/Contactinfo";
import Help from "../pages/phone/Help";


function PhoneFooter() {
    return (
        <footer className="bottomNav">
            <Link to="/">
                <FaHome />
                <span>Home</span>
            </Link>
            <Link to="/Map">
                <FaMapMarkerAlt />
                <span>Kaart</span>
            </Link>
            <Link to="/Contactinfo">
                <FaPhoneAlt />
                <span>Contact</span>
            </Link>
            <Link to="/Help">
                <FaRegQuestionCircle />
                <span>Help</span>
            </Link>
        </footer>
    );
}

export default PhoneFooter;