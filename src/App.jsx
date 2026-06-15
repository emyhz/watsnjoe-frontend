import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import chickenImg from "./images/icons/duck_icon.png";
import Phoneheader from './components/PhoneHeader';
import Phonefooter from './components/PhoneFooter';
import BannerTitle from './components/BannerTitle';
import useLangStore from './store/langStore';
import './App.css';
import './styles/phone.css';
import './styles/PhoneHeaderFooter.css';

const translations = {
    nl: {
        greeting: 'Hallo!',
        visiting: 'Bezoeken',
        floorplan: 'Plattegrond',
        openingHours: 'Openingstijden',
        faq: 'Veelgestelde vragen',
        skipTitle: 'Introductie gemist?',
        skipBody: 'Als je perongelijk op overslaan hebt gedrukt, kan je via hier terug.',
        skipBtn: 'Overslaan',
        introBtn: 'Intro',
    },
    en: {
        greeting: 'Hello!',
        visiting: 'Visiting',
        floorplan: 'Floor plan',
        openingHours: 'Opening hours',
        faq: 'Frequently asked questions',
        skipTitle: 'Missed the introduction?',
        skipBody: 'If you accidentally pressed skip, you can go back from here.',
        skipBtn: 'Skip',
        introBtn: 'Intro',
    },
};

function App() {
    const [showSkipModal, setShowSkipModal] = useState(false);
    const { lang } = useLangStore();
    const t = translations[lang];

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
            <BannerTitle title={t.greeting} />

            <section className="homeNav">
                <Link to="/Visiting" className="greenBtn homeNav__btn">
                    {t.visiting} <FaArrowRight />
                </Link>
                <Link to="/MapCombined" className="greenBtn homeNav__btn">
                    {t.floorplan} <FaArrowRight />
                </Link>
                <Link to="/OpeningHours" className="greenBtn homeNav__btn">
                    {t.openingHours} <FaArrowRight />
                </Link>
                <Link to="/Faq" className="greenBtn homeNav__btn">
                    {t.faq} <FaArrowRight />
                </Link>
            </section>

            <Phonefooter />

            {showSkipModal && (
                <div className="skipOverlay" onClick={() => setShowSkipModal(false)}>
                    <div className="skipCard" onClick={e => e.stopPropagation()}>
                        <div className="skipChick">
                            <img src={chickenImg} alt="Kip met vraagteken" />
                        </div>
                        <h2 className="skipTitle">{t.skipTitle}</h2>
                        <p className="skipBody">{t.skipBody}</p>
                        <div className="skipActions">
                            <button
                                className="skipBtn skipBtn--red"
                                onClick={() => setShowSkipModal(false)}
                            >
                                {t.skipBtn}
                            </button>
                            <Link
                                to="/Welcome1"
                                className="skipBtn skipBtn--green"
                                onClick={() => setShowSkipModal(false)}
                            >
                                {t.introBtn}
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;