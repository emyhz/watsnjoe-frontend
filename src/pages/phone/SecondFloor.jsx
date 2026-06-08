import { useState, useCallback, useEffect } from 'react'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import '../../styles/Map.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import { FaPrint } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import floorplanImg from '../../images/0floor_Page_2.jpeg'

// ─── NODES ────────────────────────────────────────────────────────────────────
// Approximate positions — use waypoint-editor.html to fine-tune
const NODES = [
    { id: "1.02", label: "Lokaal 1.02", area: "108.34 m²", px: 54.6, py: 76 },
    { id: "1.03", label: "Lokaal 1.03", area: "27.81 m²", px: 64.9, py: 80.5 },
    { id: "1.04", label: "Lokaal 1.04", area: "27.81 m²", px: 71.3, py: 80.4 },
    { id: "1.05", label: "Lokaal 1.05", area: "42.15 m²", px: 78.4, py: 80.4 },
    { id: "1.06", label: "Lokaal 1.06", area: "71.96 m²", px: 80.6, py: 75 },
    { id: "1.09", label: "Lokaal 1.09", area: "", px: 74.2, py: 74 },
    { id: "1.10", label: "Lokaal 1.10", area: "70.68 m²", px: 66.4, py: 63 },
    { id: "1.21", label: "Lokaal 1.21", area: "112.54 m²", px: 78.2, py: 60.5 },
    { id: "1.22", label: "Lokaal 1.22", area: "167.71 m²", px: 54.7, py: 49.3 },
    { id: "1.24", label: "Lokaal 1.24", area: "", px: 61.8, py: 51.6 },
    { id: "1.25", label: "Lokaal 1.25", area: "", px: 61.9, py: 48.9 },
    { id: "1.26", label: "Lokaal 1.26", area: "", px: 61.8, py: 45.1 },
    { id: "1.27", label: "Lokaal 1.27", area: "113.32 m²", px: 78.2, py: 50.1 },
    { id: "1.28", label: "Lokaal 1.28", area: "112.97 m²", px: 77.9, py: 39.7 },
    { id: "1.30", label: "Lokaal 1.30", area: "40.90 m²", px: 65.1, py: 35.9 },
    { id: "1.31", label: "Lokaal 1.31", area: "", px: 54.8, py: 32.8 },
    { id: "1.43", label: "Lokaal 1.43", area: "128.02 m²", px: 76.2, py: 18.2 },
    { id: "1.44", label: "Lokaal 1.44", area: "56.54 m²", px: 58.8, py: 10.6 },
    { id: "1.51", label: "Lokaal 1.51", area: "61.31 m²", px: 46.7, py: 9.5 },
    { id: "1.52", label: "Lokaal 1.52", area: "", px: 30.7, py: 9.4 },
    { id: "1.53", label: "Lokaal 1.53", area: "", px: 26.7, py: 12.5 },
    { id: "1.60", label: "Lokaal 1.60", area: "41.72 m²", px: 49.5, py: 36.8 },
    { id: "1.61", label: "Lokaal 1.61", area: "", px: 55.2, py: 29.2 },
    { id: "1.62", label: "Lokaal 1.62", area: "", px: 40.9, py: 37.3 },
    { id: "1.63", label: "Lokaal 1.63", area: "110.63 m²", px: 41.4, py: 16.2 },
    { id: "1.64", label: "Lokaal 1.64", area: "107.13 m²", px: 40.8, py: 62.6 },
    { id: "1.23", label: "Lokaal 1.23", area: "", px: 62, py: 54.3 },
    { id: "c.X23", label: "c.X23", px: 58.3, py: 15.5, corridor: true },
    { id: "c.X24", label: "c.X24", px: 65.2, py: 15.5, corridor: true },
    { id: "c.X25", label: "c.X25", px: 65.6, py: 21.3, corridor: true },
    { id: "c.X26", label: "c.X26", px: 66.1, py: 41.5, corridor: true },
    { id: "c.X27", label: "c.X27", px: 69.9, py: 42.7, corridor: true },
    { id: "c.X28", label: "c.X28", px: 65.7, py: 46.4, corridor: true },
    { id: "c.X29", label: "c.X29", px: 55.4, py: 36.3, corridor: true },
    { id: "c.X30", label: "c.X30", px: 40.7, py: 39.6, corridor: true },
    { id: "c.X31", label: "c.X31", px: 34.3, py: 37.4, corridor: true },
    { id: "c.X32", label: "c.X32", px: 34.4, py: 16.3, corridor: true },
    { id: "c.X33", label: "c.X33", px: 47.1, py: 16.1, corridor: true },
    { id: "c.X34", label: "c.X34", px: 38, py: 10.9, corridor: true },
    { id: "c.X35", label: "c.X35", px: 34.2, py: 12.2, corridor: true },
    { id: "c.X36", label: "c.X36", px: 47.4, py: 30, corridor: true },
    { id: "c.X37", label: "c.X37", px: 47.6, py: 37.6, corridor: true },
    { id: "c.X38", label: "c.X38", px: 54.7, py: 47, corridor: true },
    { id: "c.X39", label: "c.X39", px: 55.1, py: 53.4, corridor: true },
    { id: "c.X40", label: "c.X40", px: 52.5, py: 62.5, corridor: true },
    { id: "c.X41", label: "c.X41", px: 55.4, py: 58.6, corridor: true },
    { id: "c.X42", label: "c.X42", px: 65.7, py: 58.7, corridor: true },
    { id: "c.X43", label: "c.X43", px: 65.9, py: 51.3, corridor: true },
    { id: "c.X44", label: "c.X44", px: 65.5, py: 53.9, corridor: true },
    { id: "c.X45", label: "c.X45", px: 52.6, py: 39.1, corridor: true },
    { id: "c.X46", label: "c.X46", px: 54.7, py: 43.3, corridor: true },
    { id: "c.X47", label: "c.X47", px: 65.2, py: 74.3, corridor: true },
    { id: "c.X48", label: "c.X48", px: 65.2, py: 76.5, corridor: true },
    { id: "c.X49", label: "c.X49", px: 73, py: 76.5, corridor: true },
    { id: "c.X50", label: "c.X50", px: 77.5, py: 76.4, corridor: true },
    { id: "c.X51", label: "c.X51", px: 66.4, py: 48.9, corridor: true },
    { id: "c.X55", label: "c.X55", px: 70, py: 58.9, corridor: true },
    { id: "c.X56", label: "c.X56", px: 34.4, py: 61.1, corridor: true },
    { id: "c.X57", label: "c.X57", px: 56.6, py: 65.1, corridor: true },
    { id: "c.X58", label: "c.X58", px: 70.5, py: 46.8, corridor: true },
    { id: "c.X59", label: "c.X59", px: 33.9, py: 30.3, corridor: true },
    { id: "c.X60", label: "c.X60", px: 47.3, py: 61.2, corridor: true }
]
// ─── GRAPH ────────────────────────────────────────────────────────────────────
const GRAPH = {
    "1.02": ["c.X48"],
    "1.03": ["c.X48"],
    "1.04": ["c.X49"],
    "1.05": ["c.X50"],
    "1.06": ["c.X50"],
    "1.09": ["c.X50"],
    "1.10": ["c.X42", "1.21", "c.X47", "c.X55", "c.X57"],
    "1.21": ["1.10"],
    "1.22": ["c.X38", "c.X39", "1.25"],
    "1.24": ["c.X43", "c.X39"],
    "1.25": ["1.22", "c.X51"],
    "1.26": ["c.X28", "c.X38"],
    "1.27": ["c.X58"],
    "1.28": ["c.X27"],
    "1.30": ["c.X25", "c.X29", "c.X26"],
    "1.31": ["c.X29"],
    "1.43": ["c.X25"],
    "1.44": ["c.X23"],
    "1.51": ["c.X34", "c.X33"],
    "1.52": ["c.X35", "c.X34"],
    "1.53": ["c.X35"],
    "1.60": ["c.X37", "c.X29", "c.X45"],
    "1.61": ["c.X36"],
    "1.62": ["c.X31", "c.X37", "c.X30"],
    "1.63": ["c.X32", "c.X33"],
    "1.64": ["c.X40", "c.X56", "c.X60"],
    "1.23": ["c.X44", "c.X39"],
    "c.X23": ["c.X33", "1.44", "c.X24"],
    "c.X24": ["c.X23", "c.X25"],
    "c.X25": ["c.X24", "1.43", "1.30"],
    "c.X26": ["1.30", "c.X27", "c.X28", "c.X46"],
    "c.X27": ["c.X26", "1.28", "c.X55", "c.X58"],
    "c.X28": ["c.X26", "c.X43", "1.26", "c.X51", "c.X58"],
    "c.X29": ["1.60", "1.30", "c.X45", "1.31"],
    "c.X30": ["c.X37", "c.X31", "1.62"],
    "c.X31": ["1.62", "c.X30", "c.X56", "c.X32", "c.X59"],
    "c.X32": ["1.63", "c.X35", "c.X31", "c.X59"],
    "c.X33": ["1.63", "1.51", "c.X23", "c.X36"],
    "c.X34": ["c.X35", "1.51", "1.52"],
    "c.X35": ["c.X32", "1.53", "1.52", "c.X34"],
    "c.X36": ["c.X33", "1.61", "c.X37", "c.X59"],
    "c.X37": ["c.X36", "1.60", "c.X30", "1.62", "c.X45", "c.X60"],
    "c.X38": ["1.22", "c.X46", "1.26"],
    "c.X39": ["1.22", "c.X41", "1.24", "1.23"],
    "c.X40": ["1.64", "c.X41", "c.X57", "c.X60"],
    "c.X41": ["c.X39", "c.X42", "c.X40"],
    "c.X42": ["c.X43", "c.X41", "1.10", "c.X55"],
    "c.X43": ["c.X28", "1.24", "c.X42"],
    "c.X44": ["1.23"],
    "c.X45": ["c.X29", "c.X46", "1.60", "c.X37"],
    "c.X46": ["c.X45", "c.X26", "c.X38"],
    "c.X47": ["1.10", "c.X48"],
    "c.X48": ["c.X47", "1.02", "1.03", "c.X49"],
    "c.X49": ["c.X48", "1.04", "c.X50"],
    "c.X50": ["c.X49", "1.06", "1.09", "1.05"],
    "c.X51": ["c.X28", "1.25", "c.X58"],
    "c.X55": ["c.X27", "c.X42", "1.10", "c.X58"],
    "c.X56": ["1.64", "c.X31", "c.X60"],
    "c.X57": ["1.10", "c.X40"],
    "c.X58": ["c.X27", "1.27", "c.X28", "c.X51", "c.X55"],
    "c.X59": ["c.X36", "c.X31", "c.X32"],
    "c.X60": ["1.64", "c.X40", "c.X56", "c.X37"]
}

// ─── Dijkstra ─────────────────────────────────────────────────────────────────
function dijkstra(from, to) {
    const dist = {}, prev = {}, visited = new Set()
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

// ─── Component ────────────────────────────────────────────────────────────────
function SecondFloor() {
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

                    {/* ── Floor switcher ── */}
                    <div className="map-floor-tabs">
                        <button
                            className="map-floor-tab"
                            onClick={() => navigate('/map')}
                        >
                            Begane grond
                        </button>
                        <button
                            className="map-floor-tab map-floor-tab--active"
                        >
                            Eerste verdieping
                        </button>
                    </div>

                    {/* ── Van / Naar selects ── */}
                    <div className="map-nav-controls">
                        <div className="map-nav-group">
                            <label className="map-nav-label" htmlFor="map-from">Van</label>
                            <select
                                id="map-from"
                                className="map-nav-select"
                                value={fromId}
                                onChange={(e) => setFromId(e.target.value)}
                            >
                                {ROOMS.map((r) => (
                                    <option key={r.id} value={r.id}>{r.id} – {r.label}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            className="map-swap-btn"
                            onClick={() => { setFromId(toId); setToId(fromId) }}
                            title="Wissel"
                        >⇄</button>

                        <div className="map-nav-group">
                            <label className="map-nav-label" htmlFor="map-to">Naar</label>
                            <select
                                id="map-to"
                                className="map-nav-select"
                                value={toId}
                                onChange={(e) => setToId(e.target.value)}
                            >
                                {ROOMS.map((r) => (
                                    <option key={r.id} value={r.id}>{r.id} – {r.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ── Floorplan ── */}
                    <div className="mapSection">
                        <div className="map-img-wrap">
                            <img
                                src={floorplanImg}
                                alt="Plattegrond eerste verdieping"
                                className="map-floor-img"
                                draggable={false}
                            />

                            <svg
                                className="map-svg-overlay"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <defs>
                                    <marker id="map-arrow" markerWidth="5" markerHeight="4" refX="3" refY="2" orient="auto">
                                        <polygon points="0 0, 5 2, 0 4" fill="#e08a1e" opacity="0.9" />
                                    </marker>
                                </defs>
                                {path.length > 1 && (
                                    <polyline
                                        points={pathPoints}
                                        fill="none"
                                        stroke="#e08a1e"
                                        strokeWidth="0.55"
                                        strokeDasharray="2,0.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        opacity="0.9"
                                        markerEnd="url(#map-arrow)"
                                    />
                                )}
                            </svg>

                            {ROOMS.map((room) => (
                                <button
                                    key={room.id}
                                    className={markerClass(room)}
                                    style={{ left: `${room.px}%`, top: `${room.py}%` }}
                                    onClick={() => { if (room.id !== fromId) setToId(room.id) }}
                                    onMouseEnter={() => setTooltip(room)}
                                    onMouseLeave={() => setTooltip(null)}
                                    aria-label={`Navigeer naar ${room.label}`}
                                >
                                    {room.id}
                                </button>
                            ))}

                            {tooltip && (
                                <div
                                    className="map-tooltip"
                                    style={{ left: `${tooltip.px}%`, top: `${tooltip.py}%` }}
                                >
                                    <strong>{tooltip.id}</strong> {tooltip.label}
                                    {tooltip.area && <span className="map-tooltip-area"> · {tooltip.area}</span>}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Route info ── */}
                    <div className="map-route-info">
                        {path.length > 1
                            ? <><span className="map-route-badge">{path.length - 1} stap{path.length - 1 !== 1 ? 'pen' : ''}</span> {routeMsg}</>
                            : <span className="map-route-empty">{routeMsg || 'Kies een start- en eindpunt.'}</span>
                        }
                    </div>

                    {/* ── Legend + print ── */}
                    <div className="mapbtns">
                        <div className="map-legend">
                            <span className="map-legend-dot map-legend-dot--from" /> Van
                            <span className="map-legend-dot map-legend-dot--to" /> Naar
                            <span className="map-legend-dot map-legend-dot--path" /> Route
                        </div>
                        <button className="printBtn" onClick={() => window.print()}>
                            <FaPrint /> Print
                        </button>
                    </div>

                </div>
            </section>

            <Phonefooter />
        </>
    )
}

export default SecondFloor
