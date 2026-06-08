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
import Splash from './pages/phone/Splash.jsx';
import Welcome1 from './pages/phone/Welcome1.jsx';
import Welcome2 from './pages/phone/Welcome2.jsx';
import Welcome3 from './pages/phone/Welcome3.jsx';
import Email from "./pages/phone/Email.jsx";
import FloorMap from "./pages/phone/FloorMap.jsx";
import SecondFloor from "./pages/phone/SecondFloor.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Email />} />
        <Route path="/App" element={<App />} />
        <Route path="/Splash" element={<Splash />} />
        <Route path="/Welcome1" element={<Welcome1 />} />
        <Route path="/Welcome2" element={<Welcome2 />} />
        <Route path="/Welcome3" element={<Welcome3 />} />
        <Route path="/Visiting" element={<Visiting />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/OpeningHours" element={<OpeningHours />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/Email" element={<Email />} />
        <Route path="/FloorMap" element={<FloorMap />} />
        <Route path="/SecondFloor" element={<SecondFloor />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
