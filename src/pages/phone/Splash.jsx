import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/logos/logo_no-bg.png'
import iconsBackground from '../../images/logos/icons-background.png'
import '../../styles/onboarding.css'

function Splash() {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const t1 = setTimeout(() => setVisible(true), 100)
        const t2 = setTimeout(() => navigate('/Welcome1'), 2600)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [navigate])

    return (
        <div className="splashPage">
            <img src={iconsBackground} alt="" className="splashBg splashBg--topRight" aria-hidden="true" />
            <img src={iconsBackground} alt="" className="splashBg splashBg--bottomLeft" aria-hidden="true" />

            <div className={`splashLogo ${visible ? 'splashLogo--visible' : ''}`}>
                <img src={logo} alt="WatsNJoe" />
            </div>
        </div>
    )
}

export default Splash