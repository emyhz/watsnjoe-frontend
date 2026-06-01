import { useState } from 'react'
import heroImg from './assets/hero.png'
import { Link } from "react-router-dom"
import logo_white from './images/logos/logo_white.png'
import { FaArrowRight } from "react-icons/fa";
import Map from './pages/phone/Map'
import Visiting from './pages/phone/Visiting'
import OpeningHours from "./pages/phone/Openinghours";
import Faq from "./pages/phone/Faq";
import './App.css'
import './styles/phone.css'
import './styles/PhoneHeaderFooter.css';
import Phoneheader from './components/PhoneHeader'
import Phonefooter from './components/PhoneFooter'

function App() {
  return (
    <>
      <Phoneheader />
      <section id="center">
        <div className="navigationBtns">
          <Link to="/Visiting" className="blueBtn">Bezoeken <FaArrowRight /></Link>
          <Link to="/Map" className="blueBtn">Plattegrond <FaArrowRight /></Link>
          <Link to="/OpeningHours" className="blueBtn">Openingstijden <FaArrowRight /></Link>
          <Link to="/Faq" className="blueBtn">Veelgestelde vragen <FaArrowRight /></Link>
        </div>
      </section>
      <Phonefooter />
    </>
  )
}

export default App
