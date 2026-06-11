import { useState } from 'react'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import BannerTitle from '../../components/BannerTitle'
import iconsBackground from '../../images/logos/icons-background.png'
import useLangStore from '../../store/langStore'

const translations = {
    nl: {
        title: 'FAQ',
        faqData: [
            { question: "Is er wifi beschikbaar?", answer: "Ja, in het hele gebouw is gratis wifi beschikbaar voor bewoners en bezoekers." },
            { question: "Is er parkeergelegenheid beschikbaar?", answer: "Ja, er is een parkeerplaats aan de achterzijde van het gebouw speciaal voor bezoekers en bewoners." },
            { question: "Kunnen bewoners deelnemen aan activiteiten?", answer: "Zeker! Er worden wekelijks verschillende activiteiten georganiseerd waar iedereen aan mee kan doen." },
            { question: "Wat gebeurt er als een gang of kamer tijdelijk geblokkeerd is?", answer: "In dat geval geeft de app automatisch een alternatieve route aan om je bestemming veilig te bereiken." },
            { question: "Werkt de app op elke verdieping?", answer: "Ja, de app maakt gebruik van interne lokatiebepaling en werkt op alle verdiepingen van het gebouw." },
            { question: "Waar kan ik de toiletten vinden?", answer: "De toiletten bevinden zich op elke verdieping direct naast de lift en de centrale trap." },
            { question: "In welke talen is de app beschikbaar?", answer: "De app is momenteel beschikbaar in het Nederlands en Engels. Je kunt dit aanpassen via de vlaggen bovenin." }
        ]
    },
    en: {
        title: 'FAQ',
        faqData: [
            { question: "Is wifi available?", answer: "Yes, free wifi is available throughout the entire building for residents and visitors." },
            { question: "Is parking available?", answer: "Yes, there is a car park at the rear of the building specifically for visitors and residents." },
            { question: "Can residents take part in activities?", answer: "Absolutely! Various activities are organised every week that everyone is welcome to join." },
            { question: "What happens if a corridor or room is temporarily blocked?", answer: "In that case the app automatically suggests an alternative route to reach your destination safely." },
            { question: "Does the app work on every floor?", answer: "Yes, the app uses internal location tracking and works on all floors of the building." },
            { question: "Where can I find the toilets?", answer: "Toilets are located on every floor directly next to the lift and the central staircase." },
            { question: "What languages is the app available in?", answer: "The app is currently available in Dutch and English. You can switch using the flags at the top." }
        ]
    }
}

function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [visible, setVisible] = useState(true);
    const { lang } = useLangStore();
    const t = translations[lang];

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <Phoneheader />
            <BannerTitle title={t.title} />

            {visible && (
                <div className="faq-bg-fixed-layer">
                    <img 
                        src={iconsBackground} 
                        alt="" 
                        className="faq-bg-image-bottom" 
                        aria-hidden="true" 
                    />
                </div>   
            )}

            <section id="center" className="faq-container">
                <div className="faq-list">
                    {t.faqData.map((item, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div key={index} className={`faq-item-wrapper ${isOpen ? 'open' : ''}`}>
                                <button 
                                    className="faq-button"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="faq-question">{item.question}</span>
                                    <span className="faq-arrow">
                                        {isOpen ? (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                                        )}
                                    </span>
                                </button>
                                
                                <div className="faq-answer-panel">
                                    <div className="faq-answer-content">
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            
            <Phonefooter />
        </>
    )
}

export default Faq