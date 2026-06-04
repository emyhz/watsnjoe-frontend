import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import iconsBackground from "./images/logos/icons-background.png";
import chickenImg from "./images/icons/duck_icon.png"; // replace with your chicken image path
import Phoneheader from './components/PhoneHeader';
import Phonefooter from './components/PhoneFooter';
import './App.css';
import './styles/phone.css';
import './styles/PhoneHeaderFooter.css';

function App() {
    const [showSkipModal, setShowSkipModal] = useState(false);

    // Called from Welcome pages via location state
    // Check on mount if we arrived here via a skip action
    useState(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('skipped') === '1') {
            setShowSkipModal(true);
            window.history.replaceState({}, '', '/App');
        }
    });

    return (
        <div className="appPage">
            <Phoneheader />

            <div className="halloBanner">
                <span className="halloBanner__text">Hallo!</span>
                <img src={iconsBackground} alt="" aria-hidden="true" className="halloBanner__shapes" />
            </div>

            <section className="homeNav">
                <Link to="/Visiting" className="greenBtn homeNav__btn">
                    Bezoeken <FaArrowRight />
                </Link>
                <Link to="/Map" className="greenBtn homeNav__btn">
                    Plattegrond <FaArrowRight />
                </Link>
                <Link to="/OpeningHours" className="greenBtn homeNav__btn">
                    Openingstijden <FaArrowRight />
                </Link>
                <Link to="/Faq" className="greenBtn homeNav__btn">
                    Veelgestelde vragen <FaArrowRight />
                </Link>
            </section>

            <Phonefooter />

            {/* Skip confirmation modal */}
            {showSkipModal && (
                <div className="skipOverlay" onClick={() => setShowSkipModal(false)}>
                    <div className="skipCard" onClick={e => e.stopPropagation()}>
                        <div className="skipChick">
                            <img src={chickenImg} alt="Kip met vraagteken" />
                        </div>
                        <h2 className="skipTitle">Introductie gemist?</h2>
                        <p className="skipBody">
                            Als je perongelijk op overslaan hebt gedrukt,
                            kan je via hier terug.
                        </p>
                        <div className="skipActions">
                            <button
                                className="skipBtn skipBtn--red"
                                onClick={() => setShowSkipModal(false)}
                            >
                                Overslaan
                            </button>
                            <Link
                                to="/Welcome1"
                                className="skipBtn skipBtn--green"
                                onClick={() => setShowSkipModal(false)}
                            >
                                Intro
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;