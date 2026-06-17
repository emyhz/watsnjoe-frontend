import { useNavigate } from 'react-router-dom'
import '../../styles/Onboarding.css'
import welcome_1_img from '../../images/icons/welcome_1_img.png'
import flagEN from '../../images/icons/English.png'
import flagNL from '../../images/icons/NL.webp'
import useLangStore from '../../store/langStore'

const translations = {
    nl: {
        title: 'Fijn dat u er bent.',
        body: 'Wij helpen u de weg te vinden in ons woonzorgcentrum. Geen gedoe, gewoon rustig op uw eigen tempo.',
        next: 'Volgende',
        skip: 'Overslaan',
    },
    en: {
        title: 'Welcome, glad you\'re here.',
        body: 'We\'ll help you find your way around our care home. No fuss, just take it at your own pace.',
        next: 'Next',
        skip: 'Skip',
    }
}

function Welcome1() {
    const navigate = useNavigate()
    const { lang, setLang } = useLangStore()
    const t = translations[lang]

    return (
        <div className="welcomePage">
            <div className="welcomeBlob welcomeBlob--left" />

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
                <img src={welcome_1_img} alt="Man met stok en hond" />
            </div>

            <div className="welcomeContent">
                <h2 className="welcomeTitle">{t.title}</h2>
                <p className="welcomeBody">{t.body}</p>
            </div>

            <div className="welcomeDots">
                <span className="dot dot--active" />
                <span className="dot" />
                <span className="dot" />
            </div>

            <div className="welcomeActions">
                <button className="welcomeBtn welcomeBtn--primary" onClick={() => navigate('/Welcome2')}>
                    {t.next}
                </button>
                <button className="welcomeBtn welcomeBtn--secondary" onClick={() => navigate('/App?skipped=1')}>
                    {t.skip}
                </button>
            </div>
        </div>
    )
}
export default Welcome1