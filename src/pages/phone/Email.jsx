import { Link } from 'react-router-dom'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import { FaArrowRight } from "react-icons/fa";
import logowatsnjoe from '../../images/logos/logo_white.png'


function EmailPage() {
    return (
        <>
            <section id="center" style={{ padding: 0 }}> {}
                
                {}
                <div className="email-app-wrapper">
                    
                    {/* 1. Dark Blue Brand Header */}
                    <div className="email-header-banner">
                        <div className="brand-logo">
                            <span className="wats"><img src={logowatsnjoe} alt="Watsnjoe Logo" className="logo-img" /></span>
                            {/* <div className="logo-dots">
                                <span className="dot blue"></span>
                                <span className="dot red"></span>
                            </div> */}
                        </div>
                    </div>

                    {/* 2. Grey Welcome Banner */}
                    <div className="welcome-banner">
                        <h2>Goedemiddag, Beste Joost</h2>
                        <p>Fijn dat u binnenkort langskomt. Hieronder vindt u alles voor een fijne aankomst bij Mijzo Zandley.</p>
                    </div>

                    {/* 3. Main Email Body Content */}
                    <div className="email-body-content">
                        
                        <h3 className="section-title">Bezoekgegevens</h3>
                        
                        <div className="email-detail-row">
                            <span className="email-icon">👤</span>
                            <div className="email-text">
                                <strong>Uw moeder verblijft op</strong>
                                <p>Afdeling Duinen - Kamer 50</p>
                            </div>
                        </div>

                        <div className="email-detail-row">
                            <span className="email-icon">📍</span>
                            <div className="email-text">
                                <strong>Adres & Ingang</strong>
                                <p className="underlined-link">Burgemeester van de Heijdenstraat 1, Drunen</p>
                            </div>
                        </div>

                        <div className="email-detail-row">
                            <span className="email-icon">🅿️</span>
                            <div className="email-text">
                                <strong>Parkeren</strong>
                                <p>Gratis parkeren voor de ingang</p>
                            </div>
                        </div>

                        <div className="email-detail-row">
                            <span className="email-icon">🕒</span>
                            <div className="email-text">
                                <strong>Bezoektijden</strong>
                                <p>Dagelijks 10:00 - 23:00</p>
                            </div>
                        </div>

                        <hr className="email-divider" />

                        <h3 className="section-title">Brasserie</h3>
                        <p className="body-text">
                            Warme maaltijden en drankjes zijn beschikbaar op de begane grond, dagelijks vanaf 10:00 - 17:00. U bent van harte welkom om mee te lunchen.
                        </p>

                        <hr className="email-divider" />

                        <h3 className="section-title">Huisregels & algemene informatie</h3>
                        <ul className="rules-list">
                            <li>Ziek? Wacht even met uw bezoek</li>
                            <li>Bloemen: verwijder de plastic hoes voor u de kamer in gaat</li>
                            <li>Huisdieren welkom, mits aangelijnd</li>
                            <li>Bel aan bij gesloten deuren</li>
                        </ul>

                        {/* 4. Action Area with Button */}
                        <div className="email-action-zone">
                            <Link to="/Splash" className="purple-app-btn">
                                Open routekaart via de app <FaArrowRight />
                            </Link>
                            <p className="kiosk-note">Of gebruik de kiosk bij de ingang voor een persoonlijke route.</p>
                        </div>
                    </div>

                    {/* 5. Email Footer */}
                    <div className="email-footer-banner">
                        <p>Watsnjoe • Mijzo Zandley • <span className="underlined-link">info@mijzozandley.nl</span></p>
                    </div>

                </div>

            </section>
        </>
    )
}

export default EmailPage