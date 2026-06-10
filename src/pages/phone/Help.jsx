import { Link } from 'react-router-dom'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import BannerTitle from '../../components/BannerTitle'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'

function Help() {
    return (
        <>
            <Phoneheader title="Help" />
            <BannerTitle title="Bezoeken" />

            <section className="help-page-container">
                <div className="address-info-card">
                    <h2 className="address-title">Adres</h2>
                    <p className="address-line">Kloosterdreef 3,</p>
                    <p className="address-line">5066 AA</p>
                    <p className="address-line">Moergestel</p>
                    
                    <div className="inner-phone-card">
                        <p className="phone-label">Telefoonnummer</p>
                        <p className="phone-digits">0881175700</p>
                    </div>
                </div>

                <Link to="/Faq" className="faq-capsule-button">
                    <span>FAQ</span>
                    <span className="faq-chevron">&gt;</span>
                </Link>
            </section>

            <Phonefooter />
        </>
    )
}

export default Help