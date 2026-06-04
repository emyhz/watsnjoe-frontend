import { useNavigate } from 'react-router-dom'
import '../../styles/Onboarding.css'
import welcome_3_img from '../../images/icons/welcome_3_img.png'


function Welcome3() {
    const navigate = useNavigate()

    return (
        <div className="welcomePage">
            <div className="welcomeBlob welcomeBlob--right" />

            {/* Image */}
            <div className="welcomeIllustration">
                {<img src={welcome_3_img} alt="Vrouw aan de telefoon" />}
                
            </div>

            <div className="welcomeContent">
                <h2 className="welcomeTitle">Alles wat u nodig heeft.</h2>
                <p className="welcomeBody">
                    De app heeft alles bij de hand, van plattegrond tot
                    openingstijden en veelgestelde vragen.
                </p>
            </div>

             <div className="welcomeDots">
                <span className="dot" />
                <span className="dot" />
                <span className="dot dot--active" />
            </div>
 
            <div className="welcomeActions">
                <button className="welcomeBtn welcomeBtn--primary" onClick={() => navigate('/App')}>
                    Aan de slag!
                </button>
                <button className="welcomeBtn welcomeBtn--secondary" onClick={() => navigate('/App?skipped=1')}>
                    Overslaan
                </button>
            </div>
        </div>
    )
}

export default Welcome3