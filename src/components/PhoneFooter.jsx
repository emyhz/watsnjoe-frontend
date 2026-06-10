import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import '../styles/PhoneHeaderFooter.css';

function PhoneFooter() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                // If scrolling down, hide it. If scrolling up, show it.
                if (window.scrollY > lastScrollY && window.scrollY > 50) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
                setLastScrollY(window.scrollY);
            }
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    return (
        <footer className={`bottomNav ${isVisible ? "" : "bottomNav--hidden"}`}>
            <Link to="/App" className="bottomNav__item" aria-label="Home">
                <FaHome />
            </Link>

            <div className="bottomNav__pin-wrapper">
                <Link to="/MapCombined" className="bottomNav__pin" aria-label="Map">
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