import { useNavigate } from 'react-router-dom'
import '../../styles/Onboarding.css'
import welcome_1_img from '../../images/icons/welcome_1_img.png'

function Welcome1() {
    const navigate = useNavigate()

    return (
        <div className="welcomePage">
            <div className="welcomeBlob welcomeBlob--left" />

            {/* Image */}
            <div className="welcomeIllustration">
                {<img src={welcome_1_img} alt="Man met stok en hond" />}
            </div>

            <div className="welcomeContent">
                <h2 className="welcomeTitle">Fijn dat u er bent.</h2>
                <p className="welcomeBody">
                    Wij helpen u de weg te vinden in ons woonzorgcentrum.
                    Geen gedoe, gewoon rustig op uw eigen tempo.
                </p>
            </div>

           <div className="welcomeDots">
                <span className="dot dot--active" />
                <span className="dot" />
                <span className="dot" />
            </div>
 
            <div className="welcomeActions">
                <button className="welcomeBtn welcomeBtn--primary" onClick={() => navigate('/Welcome2')}>
                    Volgende
                </button>
                <button className="welcomeBtn welcomeBtn--secondary" onClick={() => navigate('/App?skipped=1')}>
                    Overslaan
                </button>
            </div>
        </div>
    )
}
export default Welcome1