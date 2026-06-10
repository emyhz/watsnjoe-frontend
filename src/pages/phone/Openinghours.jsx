import { useState } from 'react'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import BannerTitle from '../../components/BannerTitle'
import { FaChevronRight, FaChevronDown } from "react-icons/fa"

function OpeningHours() {
    const [activeIndex, setActiveIndex] = useState(null);

    const scheduleData = [
        {
            title: "Openingstijden",
            days: [
                { label: "Ma-Vri", time: "9.00 - 21.00" },
                { label: "Zaterdag", time: "9.00 - 20.00" },
                { label: "Zondag", time: "9.00 - 18.00" }
            ]
        },
        {
            title: "Kapper",
            days: [
                { label: "Ma-Vri", time: "10.00 - 16.00" },
                { label: "Zaterdag", time: "12.00 - 16.00" },
                { label: "Zondag", time: "Gesloten" }
            ]
        },
        {
            title: "Supermarkt",
            days: [
                { label: "Ma-Vri", time: "12.00 - 16.00" },
                { label: "Zaterdag", time: "12.00 - 14.00" },
                { label: "Zondag", time: "Gesloten" }
            ]
        }
    ];

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <Phoneheader title="Openingstijden" />
            <BannerTitle title="Openingstijden" />
            
            <section id="center" className="hours-container">
                

                <div className="hours-accordion-list">
                    {scheduleData.map((item, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div key={index} className={`hours-card-wrapper ${isOpen ? 'hours-is-open' : ''}`}>
                                <button 
                                    className="hours-toggle-btn"
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="hours-card-title">{item.title}</span>
                                    <span className="hours-arrow-icon">
                                        {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                                    </span>
                                </button>
                                
                                <div className="hours-dropdown-panel">
                                    <div className="hours-dropdown-content">
                                        {item.days.map((day, dIdx) => (
                                            <div key={dIdx} className="hours-data-row">
                                                <span className="hours-day-label">{day.label}</span>
                                                <span className="hours-time-value">{day.time}</span>
                                            </div>
                                        ))}
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

export default OpeningHours