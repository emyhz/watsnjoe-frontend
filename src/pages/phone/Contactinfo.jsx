import { useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import Phonefooter from '../../components/PhoneFooter'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import Phoneheader from '../../components/PhoneHeader'


function Contactinfo() {
    return (
        <>
            <Phoneheader />
            <section id="center">
                <h1>Contactinfo</h1>

                <div className="contactInfo">
                    <h2>Adres</h2>
                    <p> Kloosterdreef 3, </p>
                    <p> 5066 AA </p>
                    <p> Moergestel</p>
                    <h2>Telefoonnummer</h2>
                    <button className="greenBtn"><FaPhoneAlt /> 0881175700</button>
                </div>
            </section>
            <Phonefooter />
        </>
    )
}

export default Contactinfo