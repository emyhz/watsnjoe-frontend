import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import '../../styles/Map.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import BannerTitle from '../../components/BannerTitle'

const ROOMS_0 = [
    { id: "0.70a", label: "Ingang" },
    { id: "0.80", label: "Grand Café" },
    { id: "0.01", label: "Project ruimte" },
    { id: "0.70", label: "Bruisend Hart" },
    { id: "0.60", label: "Open Ruimte" },
    { id: "0.93", label: "0.93" },
    { id: "0.64", label: "0.64" },
    { id: "0.65", label: "0.65" },
    { id: "0.66", label: "0.66" },
    { id: "0.71", label: "0.71" },
    { id: "0.61", label: "0.61" },
    { id: "0.62", label: "0.62" },
    { id: "0.72", label: "0.72" },
    { id: "0.73", label: "0.73" },
    { id: "0.74", label: "0.74" },
    { id: "0.75", label: "0.75" },
    { id: "0.54", label: "0.54" },
    { id: "0.53", label: "0.53" },
    { id: "0.52", label: "0.52" },
    { id: "0.44", label: "0.44" },
    { id: "0.42", label: "0.42" },
    { id: "0.41", label: "0.41" },
    { id: "0.24", label: "0.24" },
    { id: "0.22", label: "0.22" },
    { id: "0.23", label: "0.23" },
    { id: "0.14", label: "0.14" },
]

const ROOMS_1 = [
    { id: "1.02", label: "Lokaal 1.02" },
    { id: "1.03", label: "Lokaal 1.03" },
    { id: "1.04", label: "Lokaal 1.04" },
    { id: "1.05", label: "Lokaal 1.05" },
    { id: "1.06", label: "Lokaal 1.06" },
    { id: "1.09", label: "Lokaal 1.09" },
    { id: "1.10", label: "Lokaal 1.10" },
    { id: "1.21", label: "Lokaal 1.21" },
    { id: "1.22", label: "Lokaal 1.22" },
    { id: "1.23", label: "Lokaal 1.23" },
    { id: "1.24", label: "Lokaal 1.24" },
    { id: "1.25", label: "Lokaal 1.25" },
    { id: "1.26", label: "Lokaal 1.26" },
    { id: "1.27", label: "Lokaal 1.27" },
    { id: "1.28", label: "Lokaal 1.28" },
    { id: "1.30", label: "Lokaal 1.30" },
    { id: "1.31", label: "Lokaal 1.31" },
    { id: "1.43", label: "Lokaal 1.43" },
    { id: "1.44", label: "Lokaal 1.44" },
    { id: "1.51", label: "Lokaal 1.51" },
    { id: "1.52", label: "Lokaal 1.52" },
    { id: "1.53", label: "Lokaal 1.53" },
    { id: "1.60", label: "Lokaal 1.60" },
    { id: "1.61", label: "Lokaal 1.61" },
    { id: "1.62", label: "Lokaal 1.62" },
    { id: "1.63", label: "Lokaal 1.63" },
    { id: "1.64", label: "Lokaal 1.64" },
]

ROOMS_0.sort((a, b) => {
    if (a.id === '0.70a') return -1
    if (b.id === '0.70a') return 1
    return a.id.localeCompare(b.id, undefined, { numeric: true })
})
ROOMS_1.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))

function Visiting() {
    const navigate = useNavigate()
    const [fromId, setFromId] = useState(ROOMS_0[0].id)
    const [toId, setToId] = useState(ROOMS_0[1].id)

    const handleSwap = () => {
        setFromId(toId)
        setToId(fromId)
    }

    const handleSubmit = () => {
        navigate('/mapCombined', { state: { from: fromId, to: toId } })
    }

    return (
        <>
            <Phoneheader />
            <BannerTitle title="Bezoeken" />
            <section id="center">

                <div className="map-nav-controls">
                    <div className="map-nav-group">
                        <label className="map-nav-label" htmlFor="visit-from">Van</label>
                        <select
                            id="visit-from"
                            className="map-nav-select"
                            value={fromId}
                            onChange={(e) => setFromId(e.target.value)}
                        >
                            <optgroup label="Begane grond">
                                {ROOMS_0.map((r) => (
                                    <option key={r.id} value={r.id}>{r.id} – {r.label}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Eerste verdieping">
                                {ROOMS_1.map((r) => (
                                    <option key={r.id} value={r.id}>{r.id} – {r.label}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>

                    <button
                        className="map-swap-btn"
                        onClick={handleSwap}
                        title="Wissel van en naar"
                    >
                        ⇄
                    </button>

                    <div className="map-nav-group">
                        <label className="map-nav-label" htmlFor="visit-to">Naar</label>
                        <select
                            id="visit-to"
                            className="map-nav-select"
                            value={toId}
                            onChange={(e) => setToId(e.target.value)}
                        >
                            <optgroup label="Begane grond">
                                {ROOMS_0.map((r) => (
                                    <option key={r.id} value={r.id}>{r.id} – {r.label}</option>
                                ))}
                            </optgroup>
                            <optgroup label="Eerste verdieping">
                                {ROOMS_1.map((r) => (
                                    <option key={r.id} value={r.id}>{r.id} – {r.label}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                </div>

                <div style={{ padding: '0 1rem' }}>
                    <button
                        className="greenBtn"
                        style={{ width: '100%', marginTop: '0.75rem' }}
                        onClick={handleSubmit}
                        disabled={fromId === toId}
                    >
                        Toon route →
                    </button>
                    {fromId === toId && (
                        <p style={{ fontSize: '0.82rem', color: '#c0392b', textAlign: 'center', marginTop: '0.4rem' }}>
                            Kies een andere bestemming dan het vertrekpunt.
                        </p>
                    )}
                </div>

            </section>
            <Phonefooter />
        </>
    )
}

export default Visiting
