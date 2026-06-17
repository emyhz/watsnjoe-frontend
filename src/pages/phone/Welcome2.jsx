import { useNavigate } from 'react-router-dom'
import '../../styles/Onboarding.css'
import welcome_2_img from '../../images/icons/welcome_2_img.png'
import flagEN from '../../images/icons/English.png'
import flagNL from '../../images/icons/NL.webp'
import useLangStore from '../../store/langStore'

const translations = {
    nl: {
        title: 'Zo vindt u de weg.',
        body: 'U ontvangt de route stap voor stap op uw eigen telefoon. De route leid u precies naar uw gewenste locatie.',
        next: 'Volgende',
        skip: 'Overslaan',
    },
    en: {
        title: 'Here\'s how you\'ll find your way.',
        body: 'You\'ll receive step-by-step directions on your own phone. The route guides you exactly to your destination.',
        next: 'Next',
        skip: 'Skip',
    }
}

function Welcome2() {
    const navigate = useNavigate()
    const { lang, setLang } = useLangStore()
    const t = translations[lang]

    return (
        <div className="welcomePage">
            <div className="welcomeBlob welcomeBlob--right" />

            <div className="welcomeLang">
                <button
                    className={`langFlag ${lang === 'en' ? 'langFlag--active' : ''}`}
                    onClick={() => setLang('en')}
                    aria-label="Switch to English"
                >
                    <img src={flagEN} alt="English" />
                </button>
                <button
                    className={`langFlag ${lang === 'nl' ? 'langFlag--active' : ''}`}
                    onClick={() => setLang('nl')}
                    aria-label="Schakel naar Nederlands"
                >
                    <img src={flagNL} alt="Nederlands" />
                </button>
            </div>

            <div className="welcomeIllustration">
                <img src={welcome_2_img} alt="Vrouw met telefoon en bord" />
            </div>

            <div className="welcomeContent">
                <h2 className="welcomeTitle">{t.title}</h2>
                <p className="welcomeBody">{t.body}</p>
            </div>

            <div className="welcomeDots">
                <span className="dot" />
                <span className="dot dot--active" />
                <span className="dot" />
            </div>

            <div className="welcomeActions">
                <button className="welcomeBtn welcomeBtn--primary" onClick={() => navigate('/Welcome3')}>
                    {t.next}
                </button>
                <button className="welcomeBtn welcomeBtn--secondary" onClick={() => navigate('/App?skipped=1')}>
                    {t.skip}
                </button>
            </div>
        </div>
    )
}

export default Welcome2