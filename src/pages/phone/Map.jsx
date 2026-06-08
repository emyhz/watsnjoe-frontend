import { useState, useRef, useEffect, useCallback } from 'react'
import '../../App.css'
import '../../styles/phone.css'


<parameter name="file_text">import {useState, useCallback, useEffect} from 'react'</parameter>
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import '../../styles/Map.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import { FaPrint } from "react-icons/fa"
import floorplanImg from '../../images/0floor_Page_1.png'

// ─── Room data ────────────────────────────────────────────────────────────────
// px/py = position as % of image width/height. Adjust to fine-tune markers.
const ROOMS = [
    { id: "0.01", label: "Ingang", area: "229.63 m²", px: 50.5, py: 88.5 },
    { id: "0.80", label: "Digitaal Grand Café", area: "178.19 m²", px: 19.5, py: 71.5 },
    { id: "0.70", label: "Bruisend Hart", area: "110.01 m²", px: 40.5, py: 74.5 },
    { id: "0.60", label: "Open Ruimte", area: "307.36 m²", px: 36, py: 38 },
    { id: "0.63", label: "Lokaal 0.63", area: "~25 m²", px: 25, py: 28 },
    { id: "0.64", label: "Lokaal 0.64", area: "38.54 m²", px: 21, py: 36 },
    { id: "0.65", label: "Lokaal 0.65", area: "29.94 m²", px: 22, py: 42 },
    { id: "0.66", label: "Lokaal 0.66", area: "22.97 m²", px: 22, py: 49 },
    { id: "0.71", label: "Lokaal 0.71", area: "38.07 m²", px: 18, py: 56 },
    { id: "0.61", label: "Lokaal 0.61", area: "91.62 m²", px: 49, py: 37 },
    { id: "0.62", label: "Lokaal 0.62", area: "45.87 m²", px: 49, py: 47 },
    { id: "0.72", label: "Lokaal 0.72", area: "56.78 m²", px: 46, py: 60 },
    { id: "0.73", label: "Lokaal 0.73", area: "55.34 m²", px: 48, py: 70 },
    { id: "0.74", label: "Lokaal 0.74", area: "56.78 m²", px: 44, py: 79 },
    { id: "0.75", label: "Lokaal 0.75", area: "38.75 m²", px: 49, py: 89 },
    { id: "0.44", label: "Lokaal 0.44", area: "72.20 m²", px: 57, py: 18 },
    { id: "0.41", label: "Lokaal 0.41", area: "37.19 m²", px: 71, py: 34 },
    { id: "0.42", label: "Lokaal 0.42", area: "77.63 m²", px: 74, py: 24 },
    { id: "0.22", label: "Lokaal 0.22", area: "195.38 m²", px: 75, py: 69 },
    { id: "0.23", label: "Lokaal 0.23", area: "27.76 m²", px: 67, py: 78 },
    { id: "0.24", label: "Lokaal 0.24", area: "61.82 m²", px: 72, py: 60 },
    { id: "0.52", label: "Lokaal 0.52", area: "30.99 m²", px: 64, py: 10 },
    { id: "0.53", label: "Lokaal 0.53", area: "30.25 m²", px: 57, py: 10 },
    { id: "0.54", label: "Lokaal 0.54", area: "30.29 m²", px: 50, py: 10 },
    { id: "0.93", label: "Lokaal 0.93", area: "101.79 m²", px: 16, py: 14 },
    { id: "0.14", label: "Lokaal 0.14", area: "40.46 m²", px: 80, py: 88 },
]

// ─── Graph (walkable connections between rooms) ───────────────────────────────
const GRAPH = {
    "0.01": ["0.70", "0.75", "0.14"],
    "0.70": ["0.01", "0.80", "0.73", "0.72"],
    "0.80": ["0.70", "0.71", "0.66"],
    "0.60": ["0.63", "0.61", "0.44", "0.54"],
    "0.63": ["0.60", "0.64", "0.93"],
    "0.64": ["0.63", "0.65"],
    "0.65": ["0.64", "0.66"],
    "0.66": ["0.65", "0.71", "0.80"],
    "0.71": ["0.66", "0.80", "0.72"],
    "0.61": ["0.60", "0.62", "0.41", "0.44"],
    "0.62": ["0.61", "0.72", "0.24"],
    "0.72": ["0.70", "0.62", "0.73", "0.71"],
    "0.73": ["0.72", "0.70", "0.74", "0.23"],
    "0.74": ["0.73", "0.75", "0.01"],
    "0.75": ["0.74", "0.01"],
    "0.44": ["0.60", "0.61", "0.52", "0.53", "0.54"],
    "0.41": ["0.61", "0.42", "0.24"],
    "0.42": ["0.41", "0.44"],
    "0.22": ["0.23", "0.24", "0.14"],
    "0.23": ["0.22", "0.73", "0.24"],
    "0.24": ["0.22", "0.23", "0.62", "0.41"],
    "0.52": ["0.44", "0.53"],
    "0.53": ["0.52", "0.54", "0.44"],
    "0.54": ["0.53", "0.60", "0.44"],
    "0.93": ["0.63"],
    "0.14": ["0.22", "0.01"],
}

// ─── Dijkstra pathfinding ─────────────────────────────────────────────────────
function dijkstra(from, to) {
    const dist = {}
    const prev = {}
    const visited = new Set()
    ROOMS.forEach((r) => (dist[r.id] = Infinity))
    dist[from] = 0
    const queue = ROOMS.map((r) => r.id)
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

function roomById(id) {
    return ROOMS.find((r) => r.id === id)
}

// ─── Map page ─────────────────────────────────────────────────────────────────
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
            setRouteMsg(result.map((id) => roomById(id).label).join(' → '))
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
        const r = roomById(id)
        return `${r.px},${r.py}`
    }).join(' ')

    return (
        <>
            <Phoneheader />

            <section id="center">
                <div>
                    <h1>Plattegrond</h1>

                    {/* ── From / To selects ── */}
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

                    {/* ── Interactive floorplan ── */}
                    <div className="mapSection">
                        <div className="map-img-wrap">
                            <img
                                src={floorplanImg}
                                alt="Plattegrond begane grond"
                                className="map-floor-img"
                                draggable={false}
                            />

                            {/* Route line */}
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

                            {/* Room markers */}
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

                            {/* Tooltip */}
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
                            <span className="map-legend-dot map-legend-dot--to" />   Naar
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
