import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Map from "./pages/phone/Map";
import Visiting from "./pages/phone/Visiting";
import OpeningHours from "./pages/phone/Openinghours";
import Faq from "./pages/phone/Faq";
import Help from "./pages/phone/Help";
import Contactinfo from "./pages/phone/Contactinfo";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Visiting" element={<Visiting />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/OpeningHours" element={<OpeningHours />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Contactinfo" element={<Contactinfo />} />
        <Route path="/Help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
