import { useState, useCallback, useEffect } from 'react'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import '../../styles/Map.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import { FaPrint } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import floorplanImg from '../../images/0floor_Page_1.png'

const NODES = [
    { id: "0.01", label: "Ingang", area: "", px: 65.9, py: 78.3 },
    { id: "0.80", label: "Grand Café", area: "", px: 24.5, py: 48.4 },
    { id: "0.70", label: "Bruisend Hart", area: "", px: 40.9, py: 52 },
    { id: "0.60", label: "Open Ruimte", area: "", px: 41.1, py: 20.2 },
    { id: "0.93", label: "0.93", area: "", px: 24.5, py: 7.5 },
    { id: "0.64", label: "0.64", area: "", px: 26.2, py: 22.1 },
    { id: "0.65", label: "0.65", area: "", px: 26.6, py: 27.1 },
    { id: "0.66", label: "0.66", area: "", px: 28.2, py: 31.8 },
    { id: "0.71", label: "0.71", area: "", px: 26.4, py: 36.8 },
    { id: "0.61", label: "0.61", area: "", px: 56.4, py: 21.6 },
    { id: "0.62", label: "0.62", area: "", px: 54.3, py: 30.7 },
    { id: "0.72", label: "0.72", area: "", px: 54.6, py: 42.9 },
    { id: "0.73", label: "0.73", area: "", px: 56.6, py: 49.5 },
    { id: "0.74", label: "0.74", area: "", px: 54.4, py: 57.8 },
    { id: "0.75", label: "0.75", area: "", px: 54.6, py: 68.2 },
    { id: "0.54", label: "0.54", area: "", px: 34.4, py: 7.4 },
    { id: "0.53", label: "0.53", area: "", px: 40.6, py: 7.3 },
    { id: "0.52", label: "0.52", area: "", px: 46.7, py: 7.5 },
    { id: "0.44", label: "0.44", area: "", px: 58.6, py: 10.8 },
    { id: "0.42", label: "0.42", area: "", px: 76.5, py: 15.9 },
    { id: "0.41", label: "0.41", area: "", px: 76.9, py: 21.9 },
    { id: "0.24", label: "0.24", area: "", px: 71.8, py: 48.1 },
    { id: "0.22", label: "0.22", area: "", px: 80.5, py: 51.2 },
    { id: "0.23", label: "0.23", area: "", px: 71.6, py: 54.6 },
    { id: "0.14", label: "0.14", area: "", px: 81.5, py: 68.2 },
    { id: "c.L1", label: "cL1", px: 33.3, py: 21.8, corridor: true },
    { id: "c.L2", label: "cL2", px: 33.6, py: 27.1, corridor: true },
    { id: "c.L3", label: "cL3", px: 19.6, py: 33.1, corridor: true },
    { id: "c.L4", label: "cL4", px: 20.5, py: 41.6, corridor: true },
    { id: "c.L5", label: "cL5", px: 24.5, py: 57.9, corridor: true },
    { id: "c.H2", label: "cH2", px: 39, py: 49, corridor: true },
    { id: "c.H4", label: "cH4", px: 61.5, py: 52.3, corridor: true },
    { id: "c.R1", label: "cR1", px: 66.1, py: 15.6, corridor: true },
    { id: "c.R2", label: "cR2", px: 65.3, py: 36.1, corridor: true },
    { id: "c.R3", label: "cR3", px: 47.1, py: 20.8, corridor: true },
    { id: "c.R4", label: "cR4", px: 47.8, py: 40.2, corridor: true },
    { id: "c.F3", label: "cF3", px: 65.2, py: 42.4, corridor: true },
    { id: "c.F4", label: "cF4", px: 65.3, py: 52.7, corridor: true },
    { id: "c.F5", label: "cF5", px: 66.1, py: 58.5, corridor: true },
    { id: "c.B1", label: "cB1", px: 39.5, py: 61.4, corridor: true },
    { id: "c.X20", label: "c.X20", px: 33.2, py: 16.5, corridor: true },
    { id: "c.X22", label: "c.X22", px: 43.2, py: 53.9, corridor: true },
    { id: "c.X23", label: "c.X23", px: 59.4, py: 63.6, corridor: true },
    { id: "c.X24", label: "c.X24", px: 52.3, py: 63.4, corridor: true },
    { id: "c.X25", label: "c.X25", px: 78.5, py: 64.1, corridor: true },
    { id: "c.X26", label: "c.X26", px: 19.7, py: 14.1, corridor: true },
    { id: "c.X27", label: "c.X27", px: 35.9, py: 11.3, corridor: true },
    { id: "c.X28", label: "c.X28", px: 44.4, py: 11.3, corridor: true },
    { id: "c.X29", label: "c.X29", px: 65.7, py: 23.7, corridor: true },
    { id: "c.X30", label: "c.X30", px: 47.7, py: 15.8, corridor: true },
    { id: "c.X31", label: "c.X31", px: 51.5, py: 36.3, corridor: true },
    { id: "c.X32", label: "c.X32", px: 80.6, py: 42.2, corridor: true },
    { id: "c.X33", label: "c.X33", px: 80.8, py: 58.8, corridor: true }
]

const GRAPH = {
    "0.01": ["c.F5"],
    "0.80": ["c.L5", "c.H2", "c.L4"],
    "0.70": ["c.B1", "c.H2"],
    "0.60": ["c.L2", "c.R3", "c.X20", "c.L1", "c.X28"],
    "0.93": ["c.X26"],
    "0.64": ["c.L1"],
    "0.65": ["c.L3", "c.L2"],
    "0.66": ["c.L2"],
    "0.71": ["c.X31"],
    "0.61": ["c.R3", "0.62"],
    "0.62": ["0.61"],
    "0.72": ["c.X31"],
    "0.73": ["c.X22", "c.H4"],
    "0.74": ["c.X24"],
    "0.75": ["c.X24"],
    "0.54": ["c.X27"],
    "0.53": ["c.X28"],
    "0.52": ["c.X28"],
    "0.44": ["c.R1"],
    "0.42": ["c.R1"],
    "0.41": ["c.X29"],
    "0.24": ["c.F3", "0.22"],
    "0.22": ["c.F5", "0.24", "0.23", "c.X32", "c.X33"],
    "0.23": ["0.22"],
    "0.14": ["c.X25"],
    "c.L1": ["c.L2", "c.X20", "0.64", "0.60"],
    "c.L2": ["c.L1", "0.64", "0.60", "c.H2", "0.66", "0.65"],
    "c.L3": ["0.65", "c.L4", "c.X26"],
    "c.L4": ["c.L3", "0.66", "c.L5", "0.80"],
    "c.L5": ["c.L4", "0.71", "0.80", "c.H2"],
    "c.H2": ["c.L5", "0.70", "c.R4", "c.X22", "c.L2", "0.80"],
    "c.H4": ["0.73", "c.F4"],
    "c.R1": ["0.44", "c.R2", "0.42", "c.X29", "c.X30"],
    "c.R2": ["c.R1", "c.F3", "c.X31"],
    "c.R3": ["0.60", "0.61", "c.R4", "c.X28", "c.X30"],
    "c.R4": ["c.R3", "0.62", "c.H2", "c.X22", "c.X31"],
    "c.F3": ["0.24", "c.F4", "c.R2", "c.X32"],
    "c.F4": ["c.F3", "c.F5", "c.H4"],
    "c.F5": ["c.F4", "0.22", "0.01", "c.X33"],
    "c.B1": ["0.70", "c.X24", "c.X23"],
    "c.X20": ["c.L1", "0.60", "c.X27", "c.X30"],
    "c.X22": ["0.73", "c.H2", "c.R4"],
    "c.X23": ["c.X24", "c.X25"],
    "c.X24": ["c.B1", "0.74", "c.X23", "0.75"],
    "c.X25": ["c.X23", "0.14"],
    "c.X26": ["0.93", "c.L3"],
    "c.X27": ["c.X20", "0.54", "c.X28"],
    "c.X28": ["c.X27", "0.53", "0.52", "c.R3", "0.60", "c.X30"],
    "c.X29": ["c.R1", "0.41"],
    "c.X30": ["c.R1", "c.R3", "c.X20", "c.X28"],
    "c.X31": ["c.R2", "0.72", "c.R4"],
    "c.X32": ["c.F3", "0.22"],
    "c.X33": ["0.22", "c.F5"]
}

function dijkstra(from, to) {
    const dist = {}
    const prev = {}
    const visited = new Set()
    NODES.forEach((n) => (dist[n.id] = Infinity))
    dist[from] = 0
    const queue = NODES.map((n) => n.id)
    while (queue.length) {
        queue.sort((a, b) => dist[a] - dist[b])
        const u = queue.shift()
        if (u === to) break
        visited.add(u)
            ; (GRAPH[u] || []).forEach((v) => {
                if (visited.has(v)) return
                const alt = dist[u] + 1
                if (alt < dist[v]) { dist[v] = alt; prev[v] = u }
            })
    }
    const path = []
    let cur = to
    while (cur) { path.unshift(cur); cur = prev[cur] }
    return path[0] === from ? path : []
}

function nodeById(id) { return NODES.find((n) => n.id === id) }
const ROOMS = NODES.filter((n) => !n.corridor)

function Map() {
    const navigate = useNavigate()
    const [fromId, setFromId] = useState(ROOMS[0].id)
    const [toId, setToId] = useState(ROOMS[1].id)
    const [path, setPath] = useState([])
    const [routeMsg, setRouteMsg] = useState('')
    const [tooltip, setTooltip] = useState(null)

    const doNavigate = useCallback((from, to) => {
        if (from === to) { setPath([]); setRouteMsg('Je bent er al.'); return }
        const result = dijkstra(from, to)
        if (result.length > 1) {
            setPath(result)
            const roomSteps = result
                .map((id) => nodeById(id))
                .filter((n) => !n.corridor)
                .map((n) => n.label)
            setRouteMsg(roomSteps.join(' → '))
        } else {
            setPath([])
            setRouteMsg('Geen route gevonden.')
        }
    }, [])

    useEffect(() => { doNavigate(fromId, toId) }, [fromId, toId, doNavigate])

    const markerClass = (room) => {
        if (room.id === fromId) return 'map-marker map-marker--from'
        if (room.id === toId) return 'map-marker map-marker--to'
        if (path.includes(room.id)) return 'map-marker map-marker--path'
        return 'map-marker'
    }

    const pathPoints = path.map((id) => {
        const n = nodeById(id)
        return `${n.px},${n.py}`
    }).join(' ')

    return (
        <>
            <Phoneheader />
            <section id="center">
                <div>
                    <h1>Plattegrond</h1>

                    <div className="map-floor-tabs">
                        <button className="map-floor-tab map-floor-tab--active">
                            Begane grond
                        </button>
                        <button
                            className="map-floor-tab"
                            onClick={() => navigate('/secondfloor')}
                        >
                            Eerste verdieping
                        </button>
                    </div>

                    <div className="map-nav-controls">
                        <div className="map-nav-group">
                            <label className="map-nav-label" htmlFor="map-from">Van</label>
                            <select id="map-from" className="map-nav-select" value={fromId} onChange={(e) => setFromId(e.target.value)}>
                                {ROOMS.map((r) => (<option key={r.id} value={r.id}>{r.id} – {r.label}</option>))}
                            </select>
                        </div>
                        <button className="map-swap-btn" onClick={() => { setFromId(toId); setToId(fromId) }} title="Wissel">⇄</button>
                        <div className="map-nav-group">
                            <label className="map-nav-label" htmlFor="map-to">Naar</label>
                            <select id="map-to" className="map-nav-select" value={toId} onChange={(e) => setToId(e.target.value)}>
                                {ROOMS.map((r) => (<option key={r.id} value={r.id}>{r.id} – {r.label}</option>))}
                            </select>
                        </div>
                    </div>

                    <div className="mapSection">
                        <div className="map-img-wrap">
                            <img src={floorplanImg} alt="Plattegrond begane grond" className="map-floor-img" draggable={false} />
                            <svg className="map-svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                <defs>
                                    <marker id="map-arrow" markerWidth="5" markerHeight="4" refX="3" refY="2" orient="auto">
                                        <polygon points="0 0, 5 2, 0 4" fill="#e08a1e" opacity="0.9" />
                                    </marker>
                                </defs>
                                {path.length > 1 && (
                                    <polyline points={pathPoints} fill="none" stroke="#e08a1e" strokeWidth="0.55" strokeDasharray="2,0.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" markerEnd="url(#map-arrow)" />
                                )}
                            </svg>
                            {ROOMS.map((room) => (
                                <button key={room.id} className={markerClass(room)} style={{ left: `${room.px}%`, top: `${room.py}%` }} onClick={() => { if (room.id !== fromId) setToId(room.id) }} onMouseEnter={() => setTooltip(room)} onMouseLeave={() => setTooltip(null)} aria-label={`Navigeer naar ${room.label}`}>
                                    {room.id}
                                </button>
                            ))}
                            {tooltip && (
                                <div className="map-tooltip" style={{ left: `${tooltip.px}%`, top: `${tooltip.py}%` }}>
                                    <strong>{tooltip.id}</strong> {tooltip.label}
                                    {tooltip.area && <span className="map-tooltip-area"> · {tooltip.area}</span>}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="map-route-info">
                        {path.length > 1
                            ? <><span className="map-route-badge">{path.length - 1} stap{path.length - 1 !== 1 ? 'pen' : ''}</span> {routeMsg}</>
                            : <span className="map-route-empty">{routeMsg || 'Kies een start- en eindpunt.'}</span>
                        }
                    </div>

                    <div className="mapbtns">
                        <div className="map-legend">
                            <span className="map-legend-dot map-legend-dot--from" /> Van
                            <span className="map-legend-dot map-legend-dot--to" /> Naar
                            <span className="map-legend-dot map-legend-dot--path" /> Route
                        </div>
                        <button className="printBtn" onClick={() => window.print()}><FaPrint /> Print</button>
                    </div>
                </div>
            </section>
            <Phonefooter />
        </>
    )
}

export default Map
