import { useState, useRef, useEffect, useCallback } from "react";
import floorplanImg from "../../images/0floor_Page_1.png";
import "../../styles/FloorMap.css";

// ─── Room data ───────────────────────────────────────────────────────────────
// px/py are percentages (0-100) of the image width/height
// Adjust these values to fine-tune marker positions on your image
const ROOMS = [
    { id: "0.01", label: "Entrance Hall", area: "229.63 m²", px: 50.5, py: 88.5 },
    { id: "0.80", label: "Digitaal Grand Café", area: "178.19 m²", px: 19.5, py: 71.5 },
    { id: "0.70", label: "Bruisend Hart", area: "110.01 m²", px: 40.5, py: 74.5 },
    { id: "0.60", label: "Open Space", area: "307.36 m²", px: 36, py: 38 },
    { id: "0.63", label: "Room 0.63", area: "~25 m²", px: 25, py: 28 },
    { id: "0.64", label: "Room 0.64", area: "38.54 m²", px: 21, py: 36 },
    { id: "0.65", label: "Room 0.65", area: "29.94 m²", px: 22, py: 42 },
    { id: "0.66", label: "Room 0.66", area: "22.97 m²", px: 22, py: 49 },
    { id: "0.71", label: "Room 0.71", area: "38.07 m²", px: 18, py: 56 },
    { id: "0.61", label: "Room 0.61", area: "91.62 m²", px: 49, py: 37 },
    { id: "0.62", label: "Room 0.62", area: "45.87 m²", px: 49, py: 47 },
    { id: "0.72", label: "Room 0.72", area: "56.78 m²", px: 46, py: 60 },
    { id: "0.73", label: "Room 0.73", area: "55.34 m²", px: 48, py: 70 },
    { id: "0.74", label: "Room 0.74", area: "56.78 m²", px: 44, py: 79 },
    { id: "0.75", label: "Room 0.75", area: "38.75 m²", px: 49, py: 89 },
    { id: "0.44", label: "Room 0.44", area: "72.20 m²", px: 57, py: 18 },
    { id: "0.41", label: "Room 0.41", area: "37.19 m²", px: 71, py: 34 },
    { id: "0.42", label: "Room 0.42", area: "77.63 m²", px: 74, py: 24 },
    { id: "0.22", label: "Room 0.22", area: "195.38 m²", px: 75, py: 69 },
    { id: "0.23", label: "Room 0.23", area: "27.76 m²", px: 67, py: 78 },
    { id: "0.24", label: "Room 0.24", area: "61.82 m²", px: 72, py: 60 },
    { id: "0.52", label: "Room 0.52", area: "30.99 m²", px: 64, py: 10 },
    { id: "0.53", label: "Room 0.53", area: "30.25 m²", px: 57, py: 10 },
    { id: "0.54", label: "Room 0.54", area: "30.29 m²", px: 50, py: 10 },
    { id: "0.93", label: "Room 0.93", area: "101.79 m²", px: 16, py: 14 },
    { id: "0.14", label: "Room 0.14", area: "40.46 m²", px: 80, py: 88 },
];

// ─── Room graph (adjacency list) ─────────────────────────────────────────────
// Add or remove connections as needed to match actual walkable paths
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
};

// ─── Dijkstra's shortest path ─────────────────────────────────────────────────
function dijkstra(from, to) {
    const dist = {};
    const prev = {};
    const visited = new Set();

    ROOMS.forEach((r) => (dist[r.id] = Infinity));
    dist[from] = 0;

    const queue = ROOMS.map((r) => r.id);

    while (queue.length) {
        queue.sort((a, b) => dist[a] - dist[b]);
        const u = queue.shift();
        if (u === to) break;
        visited.add(u);
        (GRAPH[u] || []).forEach((v) => {
            if (visited.has(v)) return;
            const alt = dist[u] + 1;
            if (alt < dist[v]) {
                dist[v] = alt;
                prev[v] = u;
            }
        });
    }

    const path = [];
    let cur = to;
    while (cur) {
        path.unshift(cur);
        cur = prev[cur];
    }
    return path[0] === from ? path : [];
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function roomById(id) {
    return ROOMS.find((r) => r.id === id);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function FloorMap() {
    const [fromId, setFromId] = useState(ROOMS[0].id);
    const [toId, setToId] = useState(ROOMS[5].id);
    const [path, setPath] = useState([]);
    const [tooltip, setTooltip] = useState(null); // { room, x, y }
    const [routeMsg, setRouteMsg] = useState("");
    const mapRef = useRef(null);

    const navigate = useCallback(
        (from = fromId, to = toId) => {
            if (from === to) {
                setPath([]);
                setRouteMsg("You are already there.");
                return;
            }
            const result = dijkstra(from, to);
            if (result.length > 1) {
                setPath(result);
                setRouteMsg(
                    result.map((id) => `${id} ${roomById(id).label}`).join(" → ")
                );
            } else {
                setPath([]);
                setRouteMsg("No route found between these rooms.");
            }
        },
        [fromId, toId]
    );

    // Navigate whenever selects change
    useEffect(() => {
        navigate(fromId, toId);
    }, [fromId, toId, navigate]);

    const handleMarkerClick = (room) => {
        if (room.id === fromId) return;
        setToId(room.id);
    };

    const getMarkerClass = (room) => {
        if (room.id === fromId) return "fm-marker fm-marker--origin";
        if (room.id === toId) return "fm-marker fm-marker--dest";
        if (path.includes(room.id)) return "fm-marker fm-marker--onpath";
        return "fm-marker";
    };

    const pathPoints = path
        .map((id) => {
            const r = roomById(id);
            return `${r.px},${r.py}`;
        })
        .join(" ");

    return (
        <div className="fm-page">
            <header className="fm-header">
                <h1 className="fm-title">
                    <span className="fm-title-floor">Ground Floor</span>
                    Locomotiefboulevard 103
                </h1>
                <p className="fm-subtitle">ML – Mindlabs, Tilburg</p>
            </header>

            {/* ── Controls ── */}
            <div className="fm-controls">
                <div className="fm-control-group">
                    <label className="fm-label" htmlFor="from-select">From</label>
                    <select
                        id="from-select"
                        className="fm-select"
                        value={fromId}
                        onChange={(e) => setFromId(e.target.value)}
                    >
                        {ROOMS.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.id} – {r.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="fm-swap" onClick={() => { setFromId(toId); setToId(fromId); }} title="Swap">
                    ⇄
                </div>

                <div className="fm-control-group">
                    <label className="fm-label" htmlFor="to-select">To</label>
                    <select
                        id="to-select"
                        className="fm-select"
                        value={toId}
                        onChange={(e) => setToId(e.target.value)}
                    >
                        {ROOMS.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.id} – {r.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* ── Map ── */}
            <div className="fm-map-wrap" ref={mapRef}>
                <img
                    className="fm-map-img"
                    src={floorplanImg}
                    alt="Fontys ground floor floorplan"
                    draggable={false}
                />

                {/* SVG path overlay */}
                <svg
                    className="fm-svg-overlay"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <marker
                            id="fm-arrow"
                            markerWidth="5"
                            markerHeight="4"
                            refX="3"
                            refY="2"
                            orient="auto"
                        >
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
                            markerEnd="url(#fm-arrow)"
                        />
                    )}
                </svg>

                {/* Room markers */}
                {ROOMS.map((room) => (
                    <button
                        key={room.id}
                        className={getMarkerClass(room)}
                        style={{ left: `${room.px}%`, top: `${room.py}%` }}
                        onClick={() => handleMarkerClick(room)}
                        onMouseEnter={(e) => setTooltip({ room, x: room.px, y: room.py })}
                        onMouseLeave={() => setTooltip(null)}
                        aria-label={`Navigate to ${room.label}`}
                    >
                        <span className="fm-dot-label">{room.id}</span>
                    </button>
                ))}

                {/* Tooltip */}
                {tooltip && (
                    <div
                        className="fm-tooltip"
                        style={{ left: `${tooltip.x}%`, top: `${tooltip.y}%` }}
                    >
                        <strong>{tooltip.room.id}</strong> {tooltip.room.label}
                        {tooltip.room.area && (
                            <span className="fm-tooltip-area"> · {tooltip.room.area}</span>
                        )}
                    </div>
                )}
            </div>

            {/* ── Route info ── */}
            <div className="fm-route-panel">
                {path.length > 1 ? (
                    <>
                        <span className="fm-route-steps">{path.length - 1} step{path.length - 1 !== 1 ? "s" : ""}</span>
                        <span className="fm-route-text">{routeMsg}</span>
                    </>
                ) : (
                    <span className="fm-route-empty">{routeMsg || "Select a start and destination."}</span>
                )}
            </div>

            {/* ── Legend ── */}
            <div className="fm-legend">
                <div className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--origin" />
                    Start
                </div>
                <div className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--dest" />
                    Destination
                </div>
                <div className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--onpath" />
                    On route
                </div>
                <div className="fm-legend-item">
                    <span className="fm-legend-dot fm-legend-dot--room" />
                    Room
                </div>
            </div>
        </div>
    );
}
