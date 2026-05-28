import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import { FaArrowRight } from "react-icons/fa";


function OpeningHours() {
    return (
        <>
            <Phoneheader />
            <section id="center">
                <h1>Openingstijden</h1>
                <div className="openingHours">
                    <button className="blueBtn" >Openingstijden <FaArrowRight /></button>
                    <button className="blueBtn">Kapper <FaArrowRight /></button>
                    <button className="blueBtn">Supermarkt <FaArrowRight /></button>
                </div>
            </section>
            <Phonefooter />
        </>
    )
}

export default OpeningHours