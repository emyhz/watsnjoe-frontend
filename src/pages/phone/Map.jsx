import { useState, useCallback, useEffect } from 'react'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import '../../styles/Map.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import { FaPrint } from "react-icons/fa"
import floorplanImg from '../../images/0floor_Page_1.png'

// ─── NODES ────────────────────────────────────────────────────────────────────
// Rooms: visible clickable markers
// Corridors (corridor: true): invisible waypoints along actual hallways
// px/py = % of image width/height from top-left

const NODES = [
    // ── Rooms ──────────────────────────────────────────────────────────────────
    { id: "0.01", label: "Ingang", area: "229.63 m²", px: 50.5, py: 88.5 },
    { id: "0.80", label: "Digitaal Grand Café", area: "178.19 m²", px: 19.5, py: 71.5 },
    { id: "0.70", label: "Bruisend Hart", area: "110.01 m²", px: 40.5, py: 74.5 },
    { id: "0.60", label: "Open Ruimte", area: "307.36 m²", px: 36, py: 38 },
    { id: "0.93", label: "Lokaal 0.93", area: "101.79 m²", px: 25, py: 10 },
    { id: "0.63", label: "Lokaal 0.63", area: "~25 m²", px: 25, py: 28 },
    { id: "0.64", label: "Lokaal 0.64", area: "38.54 m²", px: 21, py: 36 },
    { id: "0.65", label: "Lokaal 0.65", area: "29.94 m²", px: 22, py: 42 },
    { id: "0.66", label: "Lokaal 0.66", area: "22.97 m²", px: 22, py: 49 },
    { id: "0.71", label: "Lokaal 0.71", area: "38.07 m²", px: 18, py: 57 },
    { id: "0.61", label: "Lokaal 0.61", area: "91.62 m²", px: 49, py: 37 },
    { id: "0.62", label: "Lokaal 0.62", area: "45.87 m²", px: 49, py: 47 },
    { id: "0.72", label: "Lokaal 0.72", area: "56.78 m²", px: 55, py: 31 },
    { id: "0.73", label: "Lokaal 0.73", area: "55.34 m²", px: 48, py: 70 },
    { id: "0.74", label: "Lokaal 0.74", area: "56.78 m²", px: 44, py: 79 },
    { id: "0.75", label: "Lokaal 0.75", area: "38.75 m²", px: 49, py: 89 },
    { id: "0.54", label: "Lokaal 0.54", area: "30.29 m²", px: 50, py: 10 },
    { id: "0.53", label: "Lokaal 0.53", area: "30.25 m²", px: 57, py: 10 },
    { id: "0.52", label: "Lokaal 0.52", area: "30.99 m²", px: 64, py: 10 },
    { id: "0.44", label: "Lokaal 0.44", area: "72.20 m²", px: 57, py: 20 },
    { id: "0.42", label: "Lokaal 0.42", area: "77.63 m²", px: 74, py: 24 },
    { id: "0.41", label: "Lokaal 0.41", area: "37.19 m²", px: 71, py: 34 },
    { id: "0.24", label: "Lokaal 0.24", area: "61.82 m²", px: 72, py: 52 },
    { id: "0.22", label: "Lokaal 0.22", area: "195.38 m²", px: 75, py: 69 },
    { id: "0.23", label: "Lokaal 0.23", area: "27.76 m²", px: 67, py: 78 },
    { id: "0.14", label: "Lokaal 0.14", area: "40.46 m²", px: 80, py: 88 },

    // ── LEFT CORRIDOR — x≈32, runs top-to-bottom along left wing ───────────────
    // Connects 0.93/0.63 at top down to 0.71/0.80 at bottom
    { id: "c.L0", corridor: true, px: 32, py: 18 }, // near 0.93
    { id: "c.L1", corridor: true, px: 32, py: 26 }, // near 0.63
    { id: "c.L2", corridor: true, px: 32, py: 34 }, // near 0.64
    { id: "c.L3", corridor: true, px: 32, py: 42 }, // near 0.65
    { id: "c.L4", corridor: true, px: 32, py: 50 }, // near 0.66
    { id: "c.L5", corridor: true, px: 32, py: 57 }, // near 0.71 — junction with horizontal

    // ── CENTRAL HORIZONTAL CORRIDOR — y≈57, runs left-to-right ────────────────
    // Connects left wing corridor to central open area to right corridor
    { id: "c.H1", corridor: true, px: 32, py: 57 }, // same as c.L5 — left entry
    { id: "c.H2", corridor: true, px: 40, py: 57 }, // through open area / staircase
    { id: "c.H3", corridor: true, px: 48, py: 57 }, // centre — junction with right corridor top
    { id: "c.H4", corridor: true, px: 57, py: 57 }, // right of centre — junction with c.R corridor
    { id: "c.H5", corridor: true, px: 64, py: 57 }, // junction towards far-right corridor

    // ── RIGHT CORRIDOR — x≈57, runs top-to-bottom along right wing ─────────────
    // Connects 0.44/0.52-54 at top down to 0.75/0.01 at bottom
    { id: "c.R0", corridor: true, px: 57, py: 14 }, // top near 0.52/0.53/0.54
    { id: "c.R1", corridor: true, px: 57, py: 20 }, // near 0.44
    { id: "c.R2", corridor: true, px: 57, py: 28 }, // near top of 0.61
    { id: "c.R3", corridor: true, px: 57, py: 37 }, // alongside 0.61
    { id: "c.R4", corridor: true, px: 57, py: 47 }, // alongside 0.62
    { id: "c.R5", corridor: true, px: 57, py: 57 }, // junction with horizontal corridor
    { id: "c.R6", corridor: true, px: 57, py: 65 }, // alongside 0.72/0.73
    { id: "c.R7", corridor: true, px: 57, py: 74 }, // alongside 0.73
    { id: "c.R8", corridor: true, px: 57, py: 82 }, // alongside 0.74
    { id: "c.R9", corridor: true, px: 57, py: 89 }, // bottom near 0.75/0.01

    // ── FAR-RIGHT CORRIDOR — x≈70, runs top-to-bottom for 0.42/0.41/0.24/0.22 ─
    { id: "c.F1", corridor: true, px: 70, py: 22 }, // near 0.42
    { id: "c.F2", corridor: true, px: 70, py: 34 }, // near 0.41
    { id: "c.F3", corridor: true, px: 70, py: 47 }, // near 0.24
    { id: "c.F4", corridor: true, px: 70, py: 57 }, // junction with horizontal corridor
    { id: "c.F5", corridor: true, px: 70, py: 69 }, // near 0.22
    { id: "c.F6", corridor: true, px: 70, py: 78 }, // near 0.23

    // ── BOTTOM CORRIDOR — y≈89, entrance area ──────────────────────────────────
    { id: "c.B1", corridor: true, px: 45, py: 89 }, // left of entrance
    { id: "c.B2", corridor: true, px: 57, py: 89 }, // centre entrance
    { id: "c.B3", corridor: true, px: 70, py: 89 }, // right near 0.14
]

// ─── GRAPH ────────────────────────────────────────────────────────────────────
const GRAPH = {
    // Left wing rooms → left corridor
    "0.93": ["c.L0"],
    "0.63": ["c.L1"],
    "0.64": ["c.L2"],
    "0.65": ["c.L3"],
    "0.66": ["c.L4"],
    "0.71": ["c.L5"],
    "0.80": ["c.L5"],        // 0.80 opens onto the horizontal junction

    // Left corridor chain
    "c.L0": ["0.93", "c.L1"],
    "c.L1": ["c.L0", "0.63", "c.L2"],
    "c.L2": ["c.L1", "0.64", "c.L3"],
    "c.L3": ["c.L2", "0.65", "c.L4"],
    "c.L4": ["c.L3", "0.66", "c.L5"],
    "c.L5": ["c.L4", "0.71", "0.80", "c.H2"], // joins horizontal corridor

    // Open Ruimte — large space, connects left corridor mid-point and right corridor
    "0.60": ["c.L2", "c.R3"],

    // Horizontal corridor chain
    "c.H2": ["c.L5", "c.H3"],
    "c.H3": ["c.H2", "c.R5", "c.H4"],
    "c.H4": ["c.H3", "c.R5", "c.H5"],
    "c.H5": ["c.H4", "c.F4"],

    // Right corridor chain
    "c.R0": ["0.54", "0.53", "0.52", "c.R1"],
    "c.R1": ["c.R0", "0.44", "c.R2"],
    "c.R2": ["c.R1", "c.R3"],
    "c.R3": ["c.R2", "0.61", "0.60", "c.R4"],
    "c.R4": ["c.R3", "0.62", "c.R5"],
    "c.R5": ["c.R4", "0.72", "c.H3", "c.H4", "c.R6"],
    "c.R6": ["c.R5", "0.73", "c.R7"],
    "c.R7": ["c.R6", "0.73", "0.74", "c.R8"],
    "c.R8": ["c.R7", "0.74", "c.R9"],
    "c.R9": ["c.R8", "0.75", "c.B2"],

    // Right wing rooms → right corridor
    "0.54": ["c.R0"],
    "0.53": ["c.R0"],
    "0.52": ["c.R0"],
    "0.44": ["c.R1"],
    "0.61": ["c.R3"],
    "0.62": ["c.R4"],
    "0.72": ["c.R5"],
    "0.73": ["c.R6", "c.R7"],
    "0.74": ["c.R7", "c.R8"],
    "0.75": ["c.R9", "c.B2"],

    // Far-right corridor chain
    "c.F1": ["0.42", "c.F2"],
    "c.F2": ["c.F1", "0.41", "c.F3"],
    "c.F3": ["c.F2", "0.24", "c.F4"],
    "c.F4": ["c.F3", "c.H5", "c.F5"],
    "c.F5": ["c.F4", "0.22", "c.F6"],
    "c.F6": ["c.F5", "0.23", "c.B3"],

    // Far-right rooms
    "0.42": ["c.F1"],
    "0.41": ["c.F2"],
    "0.24": ["c.F3"],
    "0.22": ["c.F5"],
    "0.23": ["c.F6"],

    // Bottom corridor
    "c.B1": ["0.70", "0.01", "c.B2"],
    "c.B2": ["c.B1", "c.R9", "0.01", "c.B3"],
    "c.B3": ["c.B2", "0.14", "c.F6"],

    // Entrance area
    "0.70": ["c.B1", "c.H2"],
    "0.01": ["c.B1", "c.B2"],
    "0.14": ["c.B3"],
}

// ─── Dijkstra ─────────────────────────────────────────────────────────────────
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

// ─── Component ────────────────────────────────────────────────────────────────
function Map() {
    const [fromId, setFromId] = useState(ROOMS[0].id)
    const [toId, setToId] = useState(ROOMS[1].id)
    const [path, setPath] = useState([])
    const [routeMsg, setRouteMsg] = useState('')
    const [tooltip, setTooltip] = useState(null)

    const navigate = useCallback((from, to) => {
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

    useEffect(() => { navigate(fromId, toId) }, [fromId, toId, navigate])

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
                                alt="Plattegrond begane grond"
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

export default Map
