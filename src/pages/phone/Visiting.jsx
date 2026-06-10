import { useState } from 'react'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import BannerTitle from '../../components/BannerTitle'

function Visiting() {
    return (
        <>
            <Phoneheader />
            <section id="center">
                <h1>Bezoeken</h1>
            </section>
            <Phonefooter />
            <BannerTitle title="Bezoeken" />

        </>
    )
}

export default Visiting