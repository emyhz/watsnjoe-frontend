import { useState } from 'react'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'

function Faq() {
    return (
        <>
            <Phoneheader />
            <section id="center">
                <h1>FAQ</h1>
            </section>
            <Phonefooter />
        </>
    )
}

export default Faq