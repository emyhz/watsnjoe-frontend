import { useState } from 'react'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import { FaMinus, FaPlus, FaPrint } from "react-icons/fa"
import mapPhoneImage from '../../images/icons/mapPhoneImage.png'

function Map() {
    return (
        <>
            <Phoneheader />
            <section id="center">
                <div>
                    <h1>Plattegrond</h1>
                    <div className="mapSection">
                        <img src={mapPhoneImage} alt="Plattegrond" />
                    </div>
                    <div className="mapbtns">
                        <button className="redBtn"> <FaPlus /> </button>
                        <button className="redBtn"> <FaMinus /> </button>
                        <button className="greenBtn"> <FaPrint />Print</button>
                    </div>
                </div>
            </section>
            <Phonefooter />

        </>
    )
}


export default Map





