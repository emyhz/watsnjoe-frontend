import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneAlt } from 'react-icons/fa'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'


function Help() {
    return (
        <>
            <Phoneheader />
            <section id="center">
                <h1>Help</h1>
                <div className="helpBtns">
                    <Link to="/Contactinfo" className="blueBtn">Contact info</Link>
                    <Link to="/Faq" className="redBtn">FAQ</Link>
                </div>
                <Link to="/Contactinfo" className="greenBtn"><FaPhoneAlt /> 0881175700</Link>
            </section>
            <Phonefooter />
        </>
    )
}
export default Help