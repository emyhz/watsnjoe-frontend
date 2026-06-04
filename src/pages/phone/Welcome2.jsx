import { useNavigate } from 'react-router-dom'
import '../../styles/onboarding.css'
import welcome_2_img from '../../images/icons/welcome_2_img.png'


function Welcome2() {
    const navigate = useNavigate()

    return (
        <div className="welcomePage">
            <div className="welcomeBlob welcomeBlob--right" />

            {/* Image */}
            <div className="welcomeIllustration">
                {<img src={welcome_2_img} alt="Vrouw met telefoon en bord" />}
            </div>

            <div className="welcomeContent">
                <h2 className="welcomeTitle">Zo vindt u de weg.</h2>
                <p className="welcomeBody">
                    U ontvangt de route stap voor stap op uw eigen telefoon.
                    De route leid u precies naar uw gewenste locatie.
                </p>
            </div>

            {/* Progress dots */}
            <div className="welcomeDots">
                <span className="dot" />
                <span className="dot dot--active" />
                <span className="dot" />
            </div>

            <div className="welcomeActions">
                <button className="welcomeBtn welcomeBtn--primary" onClick={() => navigate('/Welcome3')}>
                    Volgende
                </button>
                <button className="welcomeBtn welcomeBtn--secondary" onClick={() => navigate('/WelcomeSkip')}>
                    Overslaan
                </button>
            </div>
        </div>
    )
}

export default Welcome2