import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../../App.css'
import '../../styles/phone.css'
import '../../styles/PhoneHeaderFooter.css'
import '../../styles/Map.css'
import Phoneheader from '../../components/PhoneHeader'
import Phonefooter from '../../components/PhoneFooter'
import BannerTitle from '../../components/BannerTitle'
import floorplan0Img from '../../images/0floor_Page_1.png'
import floorplan1Img from '../../images/0floor_Page_2.jpeg'

// ─── FLOOR 0 NODES ───────────────────────────────────────────────────────────
// Every waypoint on the ground floor: rooms, corridor waypoints, and the
// stairs/lift nodes that bridge to the first floor.
//
//   id       - unique identifier, used as the key in GRAPH and for routing
//   label    - display name (room name, or "Trap"/"Lift" for stairs/lift)
//   area     - room size in m² shown in the tooltip ("" if unknown/none)
//   px / py  - position on the floorplan image, as a percentage (0-100) of
//              the image width/height. Used to place markers and draw the
//              route line on the SVG overlay.
//   floor    - 0 = ground floor, 1 = first floor
//   corridor - true for invisible routing-only waypoints (not shown as rooms)
//   stairs / lift - true for nodes that bridge to the matching node on the
//              other floor (see the "cross-floor bridge" entries in GRAPH)
const NODES_0 = [
    { id: "0.70a", label: "Ingang", area: "", px: 44, py: 63, floor: 0 },
    { id: "0.80", label: "Grand Café", area: "", px: 24.5, py: 48.4, floor: 0 },
    { id: "0.01", label: "Project ruimte", area: "", px: 65.9, py: 77.4, floor: 0 },
    { id: "0.70", label: "Bruisend Hart", area: "", px: 40.9, py: 52, floor: 0 },
    { id: "0.60", label: "Open Ruimte", area: "", px: 41.1, py: 20.2, floor: 0 },
    { id: "0.93", label: "0.93", area: "", px: 24.5, py: 7.5, floor: 0 },
    { id: "0.64", label: "0.64", area: "", px: 26.2, py: 22.1, floor: 0 },
    { id: "0.65", label: "0.65", area: "", px: 26.6, py: 27.1, floor: 0 },
    { id: "0.66", label: "0.66", area: "", px: 28.2, py: 31.8, floor: 0 },
    { id: "0.71", label: "0.71", area: "", px: 26.4, py: 36.8, floor: 0 },
    { id: "0.61", label: "0.61", area: "", px: 56.4, py: 21.6, floor: 0 },
    { id: "0.62", label: "0.62", area: "", px: 55.8, py: 31.9, floor: 0 },
    { id: "0.72", label: "0.72", area: "", px: 54.6, py: 42.9, floor: 0 },
    { id: "0.73", label: "0.73", area: "", px: 56.6, py: 49.5, floor: 0 },
    { id: "0.74", label: "0.74", area: "", px: 54.4, py: 57.8, floor: 0 },
    { id: "0.75", label: "0.75", area: "", px: 54.6, py: 68.2, floor: 0 },
    { id: "0.54", label: "0.54", area: "", px: 34.4, py: 7.4, floor: 0 },
    { id: "0.53", label: "0.53", area: "", px: 40.6, py: 7.3, floor: 0 },
    { id: "0.52", label: "0.52", area: "", px: 46.7, py: 7.5, floor: 0 },
    { id: "0.44", label: "0.44", area: "", px: 61.6, py: 10.9, floor: 0 },
    { id: "0.42", label: "0.42", area: "", px: 76.5, py: 15.9, floor: 0 },
    { id: "0.41", label: "0.41", area: "", px: 76.9, py: 21.9, floor: 0 },
    { id: "0.24", label: "0.24", area: "", px: 71.5, py: 50.5, floor: 0 },
    { id: "0.22", label: "0.22", area: "", px: 80.5, py: 51.2, floor: 0 },
    { id: "0.23", label: "0.23", area: "", px: 71.6, py: 54.6, floor: 0 },
    { id: "0.14", label: "0.14", area: "", px: 81.5, py: 68.2, floor: 0 },
    { id: "0c.L1", corridor: true, px: 33.3, py: 21.8, floor: 0 },
    { id: "0c.L2", corridor: true, px: 33.6, py: 27.1, floor: 0 },
    { id: "0c.L3", corridor: true, px: 19.6, py: 33.1, floor: 0 },
    { id: "0c.L4", corridor: true, px: 20.5, py: 41.6, floor: 0 },
    { id: "0c.L5", corridor: true, px: 24.5, py: 57.9, floor: 0 },
    { id: "0c.H2", corridor: true, px: 39, py: 49, floor: 0 },
    { id: "0c.H4", corridor: true, px: 61.5, py: 52.3, floor: 0 },
    { id: "0c.R1", corridor: true, px: 66.1, py: 15.6, floor: 0 },
    { id: "0c.R2", corridor: true, px: 65.2, py: 37, floor: 0 },
    { id: "0c.R3", corridor: true, px: 47.1, py: 20.8, floor: 0 },
    { id: "0c.R4", corridor: true, px: 47.8, py: 40.2, floor: 0 },
    { id: "0c.F3", corridor: true, px: 65.2, py: 42.4, floor: 0 },
    { id: "0c.F4", corridor: true, px: 65.3, py: 52.7, floor: 0 },
    { id: "0c.F5", corridor: true, px: 66.1, py: 58.5, floor: 0 },
    { id: "0c.B1", corridor: true, px: 39.5, py: 61.4, floor: 0 },
    { id: "0c.X20", corridor: true, px: 33.2, py: 16.5, floor: 0 },
    { id: "0c.X22", corridor: true, px: 43.2, py: 53.9, floor: 0 },
    { id: "0c.X23", corridor: true, px: 59.4, py: 63.6, floor: 0 },
    { id: "0c.X24", corridor: true, px: 52.3, py: 63.4, floor: 0 },
    { id: "0c.X25", corridor: true, px: 78.5, py: 64.1, floor: 0 },
    { id: "0c.X26", corridor: true, px: 19.7, py: 14.1, floor: 0 },
    { id: "0c.X27", corridor: true, px: 35.9, py: 11.3, floor: 0 },
    { id: "0c.X28", corridor: true, px: 44.4, py: 11.3, floor: 0 },
    { id: "0c.X29", corridor: true, px: 65.7, py: 23.7, floor: 0 },
    { id: "0c.X30", corridor: true, px: 47.7, py: 15.8, floor: 0 },
    { id: "0c.X31", corridor: true, px: 52.6, py: 36.4, floor: 0 },
    { id: "0c.X32", corridor: true, px: 80.6, py: 42.2, floor: 0 },
    { id: "0c.X33", corridor: true, px: 80.8, py: 58.8, floor: 0 },
    { id: "stairs.0", label: "Trap", stairs: true, px: 69.4, py: 67.8, floor: 0 },
    { id: "lift.0", label: "Lift", lift: true, px: 61.3, py: 69.8, floor: 0 },
    { id: "stairs.02", label: "Trap 2", stairs: true, px: 71.4, py: 38.4, floor: 0 },
    { id: "lift.03", label: "Lift", lift: true, px: 61.2, py: 30.3, floor: 0 },
    { id: "stairs.03", label: "Trap", stairs: true, px: 61, py: 61.3, floor: 0 },
    { id: "stairs.04", label: "Trap", stairs: true, px: 43.3, py: 40.9, floor: 0 },
    { id: "stairs.05", label: "Trap", stairs: true, px: 38.2, py: 40.8, floor: 0 },
    { id: "0c.X34", corridor: true, px: 64.9, py: 69.4, floor: 0 },
    { id: "0c.X35", corridor: true, px: 64.9, py: 29.8, floor: 0 },
    { id: "0c.X37", corridor: true, px: 64.8, py: 69.3, floor: 0 },
    { id: "0c.X38", corridor: true, px: 64.8, py: 64.1, floor: 0 },
    { id: "0c.X39", corridor: true, px: 47.1, py: 36, floor: 0 }
]


// ─── FLOOR 1 NODES ───────────────────────────────────────────────────────────
// Same structure as NODES_0, but for the first floor. Node ids are prefixed
// with "1" / "1c." / ".1" so they never collide with the ground-floor ids
// (this matters because nodeById() does a flat search across both floors).
const NODES_1 = [
    { id: "1.02", label: "Lokaal 1.02", area: "108.34 m²", px: 54.6, py: 76, floor: 1 },
    { id: "1.03", label: "Lokaal 1.03", area: "27.81 m²", px: 64.9, py: 80.5, floor: 1 },
    { id: "1.04", label: "Lokaal 1.04", area: "27.81 m²", px: 71.3, py: 80.4, floor: 1 },
    { id: "1.05", label: "Lokaal 1.05", area: "42.15 m²", px: 78.4, py: 80.4, floor: 1 },
    { id: "1.06", label: "Lokaal 1.06", area: "71.96 m²", px: 80.6, py: 75, floor: 1 },
    { id: "1.09", label: "Lokaal 1.09", area: "", px: 74.2, py: 74, floor: 1 },
    { id: "1.10", label: "Lokaal 1.10", area: "70.68 m²", px: 66.4, py: 63, floor: 1 },
    { id: "1.21", label: "Lokaal 1.21", area: "112.54 m²", px: 78.2, py: 60.5, floor: 1 },
    { id: "1.22", label: "Lokaal 1.22", area: "167.71 m²", px: 54.7, py: 49.3, floor: 1 },
    { id: "1.24", label: "Lokaal 1.24", area: "", px: 61.8, py: 51.6, floor: 1 },
    { id: "1.25", label: "Lokaal 1.25", area: "", px: 61.9, py: 48.9, floor: 1 },
    { id: "1.26", label: "Lokaal 1.26", area: "", px: 61.8, py: 45.1, floor: 1 },
    { id: "1.27", label: "Lokaal 1.27", area: "113.32 m²", px: 78.2, py: 50.1, floor: 1 },
    { id: "1.28", label: "Lokaal 1.28", area: "112.97 m²", px: 77.9, py: 39.7, floor: 1 },
    { id: "1.30", label: "Lokaal 1.30", area: "40.90 m²", px: 65.1, py: 35.9, floor: 1 },
    { id: "1.31", label: "Lokaal 1.31", area: "", px: 54.8, py: 32.8, floor: 1 },
    { id: "1.43", label: "Lokaal 1.43", area: "128.02 m²", px: 76.2, py: 18.2, floor: 1 },
    { id: "1.44", label: "Lokaal 1.44", area: "56.54 m²", px: 58.8, py: 10.6, floor: 1 },
    { id: "1.51", label: "Lokaal 1.51", area: "61.31 m²", px: 46.7, py: 9.5, floor: 1 },
    { id: "1.52", label: "Lokaal 1.52", area: "", px: 30.7, py: 9.4, floor: 1 },
    { id: "1.53", label: "Lokaal 1.53", area: "", px: 26.7, py: 12.5, floor: 1 },
    { id: "1.60", label: "Lokaal 1.60", area: "41.72 m²", px: 49.5, py: 36.8, floor: 1 },
    { id: "1.61", label: "Lokaal 1.61", area: "", px: 55.2, py: 29.2, floor: 1 },
    { id: "1.62", label: "Lokaal 1.62", area: "", px: 40.9, py: 37.3, floor: 1 },
    { id: "1.63", label: "Lokaal 1.63", area: "110.63 m²", px: 41.4, py: 16.2, floor: 1 },
    { id: "1.64", label: "Lokaal 1.64", area: "107.13 m²", px: 40.8, py: 62.6, floor: 1 },
    { id: "1.23", label: "Lokaal 1.23", area: "", px: 62, py: 54.3, floor: 1 },
    { id: "1c.X23", corridor: true, px: 58.3, py: 15.5, floor: 1 },
    { id: "1c.X24", corridor: true, px: 65.2, py: 15.5, floor: 1 },
    { id: "1c.X25", corridor: true, px: 65.6, py: 21.3, floor: 1 },
    { id: "1c.X26", corridor: true, px: 66.1, py: 41.5, floor: 1 },
    { id: "1c.X27", corridor: true, px: 69.9, py: 42.7, floor: 1 },
    { id: "1c.X28", corridor: true, px: 65.7, py: 46.4, floor: 1 },
    { id: "1c.X29", corridor: true, px: 55.4, py: 36.3, floor: 1 },
    { id: "1c.X30", corridor: true, px: 40.7, py: 39.6, floor: 1 },
    { id: "1c.X31", corridor: true, px: 34.3, py: 37.4, floor: 1 },
    { id: "1c.X32", corridor: true, px: 34.4, py: 16.3, floor: 1 },
    { id: "1c.X33", corridor: true, px: 47.1, py: 16.1, floor: 1 },
    { id: "1c.X34", corridor: true, px: 38, py: 10.9, floor: 1 },
    { id: "1c.X35", corridor: true, px: 34.2, py: 12.2, floor: 1 },
    { id: "1c.X36", corridor: true, px: 47.4, py: 30, floor: 1 },
    { id: "1c.X37", corridor: true, px: 47.6, py: 37.6, floor: 1 },
    { id: "1c.X38", corridor: true, px: 54.7, py: 47, floor: 1 },
    { id: "1c.X39", corridor: true, px: 55.1, py: 53.4, floor: 1 },
    { id: "1c.X40", corridor: true, px: 52.5, py: 62.5, floor: 1 },
    { id: "1c.X41", corridor: true, px: 55.4, py: 58.6, floor: 1 },
    { id: "1c.X42", corridor: true, px: 65.7, py: 58.7, floor: 1 },
    { id: "1c.X43", corridor: true, px: 65.9, py: 51.3, floor: 1 },
    { id: "1c.X44", corridor: true, px: 65.5, py: 53.9, floor: 1 },
    { id: "1c.X45", corridor: true, px: 52.6, py: 39.1, floor: 1 },
    { id: "1c.X46", corridor: true, px: 54.7, py: 43.3, floor: 1 },
    { id: "1c.X47", corridor: true, px: 65.2, py: 74.3, floor: 1 },
    { id: "1c.X48", corridor: true, px: 65.2, py: 76.5, floor: 1 },
    { id: "1c.X49", corridor: true, px: 73, py: 76.5, floor: 1 },
    { id: "1c.X50", corridor: true, px: 77.5, py: 76.4, floor: 1 },
    { id: "1c.X51", corridor: true, px: 66.4, py: 48.9, floor: 1 },
    { id: "1c.X55", corridor: true, px: 70, py: 58.9, floor: 1 },
    { id: "1c.X56", corridor: true, px: 34.4, py: 61.1, floor: 1 },
    { id: "1c.X57", corridor: true, px: 56.6, py: 65.1, floor: 1 },
    { id: "1c.X58", corridor: true, px: 70.5, py: 46.8, floor: 1 },
    { id: "1c.X59", corridor: true, px: 33.9, py: 30.3, floor: 1 },
    { id: "1c.X60", corridor: true, px: 47.3, py: 61.2, floor: 1 },
    { id: "stairs.1", label: "Trap", stairs: true, px: 69.5, py: 67.4, floor: 1 },
    { id: "lift.1", label: "Lift", lift: true, px: 61.4, py: 70.3, floor: 1 },
    { id: "stairs.1.2", label: "Trap 2", stairs: true, px: 69.8, py: 32.5, floor: 1 },
    { id: "stairs.1.3", label: "Trap", stairs: true, px: 60.3, py: 61.3, floor: 1 },
    { id: "stairs.1.4", label: "Trap", stairs: true, px: 44.3, py: 38.8, floor: 1 },
    { id: "stairs.1.5", label: "Trap", stairs: true, px: 37, py: 38.9, floor: 1 },
    { id: "lift.1.3", label: "Lift", lift: true, px: 61.3, py: 30, floor: 1 },
    { id: "1c.X61", corridor: true, px: 64.7, py: 29.8, floor: 1 },
    { id: "1c.X62", corridor: true, px: 64.8, py: 69.6, floor: 1 }
]


// Combined list of every node on both floors. Dijkstra runs over this whole
// set, which is what lets a route "cross" from the floor-0 graph into the
// floor-1 graph via the matching stairs/lift bridge nodes.
const ALL_NODES = [...NODES_0, ...NODES_1]

// ─── GRAPH ────────────────────────────────────────────────────────────────────
// Adjacency list for pathfinding: for each node id, the list of node ids it's
// directly (and bidirectionally) connected to.
//
//   - Rooms connect to the nearby corridor waypoint(s) that lead to them.
//   - Corridor waypoints ("0c.X.." / "1c.X..") connect to each other to form
//     the walkable hallway network.
//   - Each stairs/lift node connects to its local corridor AND to its
//     matching stairs/lift node on the other floor — these are the
//     "cross-floor bridge" edges (marked with comments below). Without both
//     halves of a bridge pair listing each other, routes can't cross floors.
const GRAPH = {
    "0.70a": ["0.70", "0c.B1", "0c.X24", "0c.L5", "0c.X22", "0c.H2", "0c.X38"],
    "0.80": ["0c.H2", "0c.L4", "0c.L5"],
    "0.01": ["0c.F5", "0c.X37"],
    "0.70": ["0.70a", "0c.B1", "0c.H2"],
    "0.60": ["0c.L1", "0c.L2", "0c.R3", "0c.X20", "0c.X28"],
    "0.93": ["0c.X26"],
    "0.64": ["0c.L1", "0c.L2"],
    "0.65": ["0c.L2"],
    "0.66": ["0c.L2"],
    "0.71": ["0c.X31", "0c.X39"],
    "0.61": ["0.62", "0c.R3"],
    "0.62": ["0.61", "0c.X31"],
    "0.72": ["0c.X31"],
    "0.73": ["0c.H4", "0c.X22"],
    "0.74": ["0c.X24"],
    "0.75": ["0c.X24"],
    "0.54": ["0c.X27"],
    "0.53": ["0c.X28"],
    "0.52": ["0c.X28"],
    "0.44": ["0c.R1"],
    "0.42": ["0c.R1"],
    "0.41": ["0c.X29"],
    "0.24": ["0.22"],
    "0.22": ["0.23", "0.24", "0c.X32", "0c.X33"],
    "0.23": ["0.22"],
    "0.14": ["0c.X25"],
    "0c.L1": ["0.60", "0.64", "0c.L2", "0c.X20"],
    "0c.L2": ["0.60", "0.64", "0.65", "0.66", "0c.H2", "0c.L1"],
    "0c.L3": ["0c.L4", "0c.X26"],
    "0c.L4": ["0.80", "0c.L3", "0c.L5", "0c.H2"],
    "0c.L5": ["0.80", "0c.H2", "0c.L4", "0.70a"],
    "0c.H2": ["0.70", "0.80", "0c.L2", "0c.L5", "0c.R4", "stairs.05", "stairs.04", "0.70a", "0c.L4", "0c.X22"],
    "0c.H4": ["0.73", "0c.F4"],
    "0c.R1": ["0.42", "0.44", "0c.R2", "0c.X29", "0c.X30"],
    "0c.R2": ["0c.F3", "0c.R1", "0c.X31", "stairs.02", "0c.X35", "0c.X39"],
    "0c.R3": ["0.60", "0.61", "0c.R4", "0c.X28", "0c.X30", "0c.X39"],
    "0c.R4": ["0c.H2", "0c.R3", "0c.X22", "0c.X31", "0c.X39"],
    "0c.F3": ["0c.F4", "0c.R2", "0c.X32"],
    "0c.F4": ["0c.F3", "0c.F5", "0c.H4"],
    "0c.F5": ["0.01", "0c.F4", "0c.X33", "stairs.03", "0c.X37", "0c.X38"],
    "0c.B1": ["0.70", "0c.X23", "0c.X24", "0.70a", "0c.X22"],
    "0c.X20": ["0.60", "0c.L1", "0c.X27", "0c.X30"],
    "0c.X22": ["0.73", "0c.R4", "0.70a", "0c.B1", "0c.X24", "0c.H2"],
    "0c.X23": ["0c.B1", "0c.X24", "0c.X25", "0c.X38"],
    "0c.X24": ["0.74", "0.75", "0c.B1", "0c.X23", "0.70a", "0c.X22"],
    "0c.X25": ["0.14", "0c.X23", "0c.X38"],
    "0c.X26": ["0.93", "0c.L3"],
    "0c.X27": ["0.54", "0c.X20", "0c.X28"],
    "0c.X28": ["0.52", "0.53", "0.60", "0c.R3", "0c.X27", "0c.X30"],
    "0c.X29": ["0.41", "0c.R1", "0c.X35"],
    "0c.X30": ["0c.R1", "0c.R3", "0c.X20", "0c.X28"],
    "0c.X31": ["0.71", "0.72", "0c.R2", "0c.R4", "0.62", "0c.X39"],
    "0c.X32": ["0.22", "0c.F3"],
    "0c.X33": ["0.22", "0c.F5"],
    "0c.X34": ["lift.0", "stairs.0"],
    "0c.X35": ["lift.03", "0c.X29", "0c.R2"],
    "0c.X37": ["0.01", "0c.F5", "0c.X38"],
    "0c.X38": ["0c.X37", "0c.F5", "0c.X23", "0c.X25", "0.70a"],
    "0c.X39": ["0c.R4", "0c.X31", "0c.R3", "0.71", "0c.R2"],

    // ── Cross-floor bridges, ground-floor side ──
    // Each stairs/lift node here connects to a local corridor waypoint AND to
    // its matching node on the first floor (see "Cross-floor bridges,
    // first-floor side" below). These pairs must point at each other for a
    // route to be able to switch floors.
    "stairs.0": ["0c.X34", "stairs.1"],
    "lift.0": ["0c.X34", "lift.1"],
    "stairs.02": ["0c.R2", "stairs.1.2"],
    "lift.03": ["0c.X35", "lift.1.3"],
    "stairs.03": ["0c.F5", "stairs.1.3"],
    "stairs.04": ["0c.H2", "stairs.1.4"],
    "stairs.05": ["0c.H2", "stairs.1.5"],

    // ── Floor 1 ──
    "1.02": ["1c.X48"],
    "1.03": ["1c.X48"],
    "1.04": ["1c.X49"],
    "1.05": ["1c.X50"],
    "1.06": ["1c.X50"],
    "1.09": ["1c.X50"],
    "1.10": ["1.21", "1c.X42", "1c.X47", "1c.X55", "1c.X57", "stairs.1.3", "1c.X62"],
    "1.21": ["1.10"],
    "1.22": ["1.25", "1c.X38", "1c.X39"],
    "1.24": ["1c.X39", "1c.X43"],
    "1.25": ["1.22", "1c.X51"],
    "1.26": ["1c.X28", "1c.X38"],
    "1.27": ["1c.X58"],
    "1.28": ["1c.X27"],
    "1.30": ["1c.X25", "1c.X26", "1c.X29", "1c.X61"],
    "1.31": ["1c.X29"],
    "1.43": ["1c.X25"],
    "1.44": ["1c.X23"],
    "1.51": ["1c.X33", "1c.X34"],
    "1.52": ["1c.X34", "1c.X35"],
    "1.53": ["1c.X35"],
    "1.60": ["1c.X29", "1c.X37", "1c.X45"],
    "1.61": ["1c.X36"],
    "1.62": ["1c.X30", "1c.X31", "1c.X37", "stairs.1.5", "stairs.1.4"],
    "1.63": ["1c.X32", "1c.X33"],
    "1.64": ["1c.X40", "1c.X56", "1c.X60"],
    "1.23": ["1c.X39", "1c.X44"],
    "1c.X23": ["1.44", "1c.X24", "1c.X33"],
    "1c.X24": ["1c.X23", "1c.X25"],
    "1c.X25": ["1.30", "1.43", "1c.X24", "stairs.1.2", "1c.X61"],
    "1c.X26": ["1.30", "1c.X27", "1c.X28", "1c.X46", "stairs.1.2"],
    "1c.X27": ["1.28", "1c.X26", "1c.X55", "1c.X58", "stairs.1.2"],
    "1c.X28": ["1.26", "1c.X26", "1c.X43", "1c.X51", "1c.X58"],
    "1c.X29": ["1.30", "1.31", "1.60", "1c.X45", "stairs.1", "stairs.1.2"],
    "1c.X30": ["1.62", "1c.X31", "1c.X37", "stairs.1.4", "stairs.1.5"],
    "1c.X31": ["1.62", "1c.X30", "1c.X32", "1c.X56", "1c.X59", "stairs.1.5"],
    "1c.X32": ["1.63", "1c.X31", "1c.X35", "1c.X59"],
    "1c.X33": ["1.51", "1.63", "1c.X23", "1c.X36"],
    "1c.X34": ["1.51", "1.52", "1c.X35"],
    "1c.X35": ["1.52", "1.53", "1c.X32", "1c.X34"],
    "1c.X36": ["1.61", "1c.X33", "1c.X37", "1c.X59", "stairs.1"],
    "1c.X37": ["1.60", "1.62", "1c.X30", "1c.X36", "1c.X45", "1c.X60", "stairs.1", "stairs.1.4"],
    "1c.X38": ["1.22", "1.26", "1c.X46"],
    "1c.X39": ["1.22", "1.23", "1.24", "1c.X41"],
    "1c.X40": ["1.64", "1c.X41", "1c.X57", "1c.X60"],
    "1c.X41": ["1c.X39", "1c.X40", "1c.X42"],
    "1c.X42": ["1.10", "1c.X41", "1c.X43", "1c.X55", "stairs.1.3"],
    "1c.X43": ["1.24", "1c.X28", "1c.X42"],
    "1c.X44": ["1.23"],
    "1c.X45": ["1.60", "1c.X29", "1c.X37", "1c.X46", "stairs.1"],
    "1c.X46": ["1c.X26", "1c.X38", "1c.X45"],
    "1c.X47": ["1.10", "1c.X48", "1c.X62"],
    "1c.X48": ["1.02", "1.03", "1c.X47", "1c.X49"],
    "1c.X49": ["1.04", "1c.X48", "1c.X50"],
    "1c.X50": ["1.05", "1.06", "1.09", "1c.X49"],
    "1c.X51": ["1.25", "1c.X28", "1c.X58"],
    "1c.X55": ["1.10", "1c.X27", "1c.X42", "1c.X58"],
    "1c.X56": ["1.64", "1c.X31", "1c.X60"],
    "1c.X57": ["1.10", "1c.X40"],
    "1c.X58": ["1.27", "1c.X27", "1c.X28", "1c.X51", "1c.X55"],
    "1c.X59": ["1c.X31", "1c.X32", "1c.X36"],
    "1c.X60": ["1.64", "1c.X37", "1c.X40", "1c.X56"],
    "1c.X61": ["lift.1.3", "1c.X25", "1.30", "stairs.1.2"],
    "1c.X62": ["lift.1", "1.10", "1c.X47", "stairs.1"],

    // ── Cross-floor bridges, first-floor side ──
    // Mirror image of the ground-floor bridge entries above: each of these
    // connects to a local first-floor corridor AND back to its ground-floor
    // counterpart, completing the bidirectional bridge pair.
    "stairs.1": ["1c.X29", "1c.X36", "1c.X37", "1c.X45", "1c.X62", "stairs.0"],
    "lift.1": ["1c.X62", "lift.0"],
    "stairs.1.2": ["1c.X25", "1c.X26", "1c.X27", "1c.X29", "1c.X61", "stairs.02"],
    "stairs.1.3": ["1.10", "1c.X42", "stairs.03"],
    "stairs.1.4": ["1c.X30", "1c.X37", "1.62", "stairs.1.5", "stairs.04"],
    "stairs.1.5": ["1c.X30", "1c.X31", "1.62", "stairs.1.4", "stairs.05"],
    "lift.1.3": ["1c.X61", "lift.03"],
}

// ─── Dijkstra ─────────────────────────────────────────────────────────────────
// Shortest-path search over GRAPH. Every edge has an implicit weight of 1
// (one "step" between waypoints), so this finds the route with the fewest
// waypoints between `from` and `to`. Returns an ordered array of node ids
// describing the route, or an empty array if no route exists.
function dijkstra(from, to) {
    const dist = {}, prev = {}, visited = new Set()

    // Start with every node "unreachable" except the starting node
    ALL_NODES.forEach((n) => (dist[n.id] = Infinity))
    dist[from] = 0

    const queue = ALL_NODES.map((n) => n.id)
    while (queue.length) {
        // Always process the closest not-yet-visited node next
        queue.sort((a, b) => dist[a] - dist[b])
        const u = queue.shift()
        if (u === to) break // reached the destination, no need to keep going
        visited.add(u)

            // Check every neighbour of u: if going through u is shorter than
            // any previously known route to that neighbour, remember it
            ; (GRAPH[u] || []).forEach((v) => {
                if (visited.has(v)) return
                const alt = dist[u] + 1
                if (alt < dist[v]) { dist[v] = alt; prev[v] = u }
            })
    }

    // Walk backwards from `to` to `from` using the `prev` pointers to
    // reconstruct the route in the correct order
    const path = []
    let cur = to
    while (cur) { path.unshift(cur); cur = prev[cur] }

    // If the reconstructed path doesn't actually start at `from`, there was
    // no connection between the two nodes
    return path[0] === from ? path : []
}

// Look up a node's full data (label, position, floor, flags, ...) by its id.
// Searches across both floors since ALL_NODES contains everything.
function nodeById(id) { return ALL_NODES.find((n) => n.id === id) }

// ─── Room lists for the "Van" / "Naar" dropdowns ───────────────────────────────
// Only real rooms are shown to the user (corridor waypoints and stairs/lift
// bridge nodes are filtered out), sorted numerically by id. The building
// entrance (0.70a) is always pinned first on the ground floor so it acts as
// the default starting point.
const ROOMS_0 = NODES_0.filter((n) => !n.corridor && !n.stairs && !n.lift)
    .sort((a, b) => {
        if (a.id === '0.70a') return -1
        if (b.id === '0.70a') return 1
        return a.id.localeCompare(b.id, undefined, { numeric: true })
    })
const ROOMS_1 = NODES_1.filter((n) => !n.corridor && !n.stairs && !n.lift)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
const ALL_ROOMS = [...ROOMS_0, ...ROOMS_1]

// ─── Route description ──────────────────────────────────────────────────────────
// Turns a Dijkstra path (an array of node ids) into a human-readable,
// step-by-step description in Dutch, e.g.
//   "Ingang → Bruisend Hart → 🚶 Ga naar verdieping één via de trap → Lokaal 1.22"
//
// - Corridor waypoints are skipped entirely (they're invisible to the user).
// - A stairs/lift node only produces a message when the route actually
//   changes floor at that point (i.e. the previous waypoint was on a
//   different floor) — otherwise it's just passed through silently.
function buildRouteMsg(path) {
    const msgs = []
    let prevFloor = null
    path.forEach((id) => {
        const n = nodeById(id)
        if (n.stairs && prevFloor !== null && n.floor !== prevFloor) {
            msgs.push(`🚶 Ga naar verdieping ${n.floor === 1 ? 'één' : 'begane grond'} via de trap`)
        } else if (n.lift && prevFloor !== null && n.floor !== prevFloor) {
            msgs.push(`🛗 Ga naar verdieping ${n.floor === 1 ? 'één' : 'begane grond'} via de lift`)
        } else if (!n.corridor && !n.stairs && !n.lift) {
            msgs.push(n.label)
        }
        if (n.floor !== undefined) prevFloor = n.floor
    })
    return msgs.join(' → ')
}

function MapCombined() {
    const location = useLocation()

    // ── Read initial from/to from route state (set by Visiting) ─────────────
    // If the user arrived here via the "Visiting" page (which lets them pick
    // a from/to room beforehand), use those choices. Otherwise fall back to
    // the first two rooms in the combined list as sensible defaults.
    const initialFrom = location.state?.from ?? "0.70a"
    const initialTo = location.state?.to ?? ALL_ROOMS.find(r => r.id !== "0.70a")?.id ?? ALL_ROOMS[1].id

    const [fromId, setFromId] = useState(initialFrom)     // selected starting room id
    const [toId, setToId] = useState(initialTo)           // selected destination room id
    const [path, setPath] = useState([])                  // current Dijkstra route (array of node ids)
    const [routeMsg, setRouteMsg] = useState('')          // human-readable description of the route
    const [tooltip, setTooltip] = useState(null)          // room currently hovered (shows info popup)
    const [displayFloor, setDisplayFloor] = useState(nodeById(initialFrom)?.floor ?? 0) // which floorplan is shown (0 or 1)

    // Floorplan image to render for the currently displayed floor
    const floorImg = displayFloor === 0 ? floorplan0Img : floorplan1Img

    // Recalculate the route between `from` and `to`.
    // - If they're the same room, just show "Je bent er al." (you're already there).
    // - Otherwise run Dijkstra; if a route is found, store it and build its
    //   description, otherwise clear the path and show a "no route" message.
    const doNavigate = useCallback((from, to) => {
        if (from === to) { setPath([]); setRouteMsg('Je bent er al.'); return }
        const result = dijkstra(from, to)
        if (result.length > 1) {
            setPath(result)
            setRouteMsg(buildRouteMsg(result))
        } else {
            setPath([])
            setRouteMsg('Geen route gevonden.')
        }
    }, [])

    // Re-run the route calculation whenever the start or end room changes
    useEffect(() => { doNavigate(fromId, toId) }, [fromId, toId, doNavigate])

    // When the starting room changes, automatically switch the visible
    // floorplan to match that room's floor (so the user immediately sees
    // where they're starting from)
    useEffect(() => {
        const floor = nodeById(fromId)?.floor ?? 0
        setDisplayFloor(floor)
    }, [fromId])

    // Only show markers and route segments belonging to the floor that's
    // currently displayed — the other floor's data is simply filtered out
    const visibleRooms = ALL_NODES.filter((n) => n.floor === displayFloor && !n.corridor)
    const visiblePath = path.filter((id) => nodeById(id)?.floor === displayFloor)

    // Styling for each room marker: highlight the start, the destination,
    // and any room/waypoint the route passes through
    const markerClass = (room) => {
        if (room.id === fromId) return 'map-marker map-marker--from'
        if (room.id === toId) return 'map-marker map-marker--to'
        if (path.includes(room.id)) return 'map-marker map-marker--path'
        return 'map-marker'
    }

    // Build the "x,y x,y ..." point list for the SVG <polyline> that draws
    // the route line on top of the floorplan, using only the waypoints
    // visible on the current floor
    const pathPoints = visiblePath.map((id) => {
        const n = nodeById(id)
        return `${n.px},${n.py}`
    }).join(' ')

    // True if the full route includes any stairs/lift node — used to show a
    // hint telling the user the route spans both floors and they should
    // switch floor tabs to see the rest of it
    const crossesFloor = path.some((id) => {
        const n = nodeById(id)
        return n?.stairs || n?.lift
    })

    return (
        <>
            <Phoneheader />
            <BannerTitle title="Plattegrond" />
            <section id="center">
                <div>

                    {/* Tabs to switch between the ground floor and first floor floorplans */}
                    <div className="map-floor-tabs">
                        <button
                            className={`map-floor-tab${displayFloor === 0 ? ' map-floor-tab--active' : ''}`}
                            onClick={() => setDisplayFloor(0)}
                        >
                            Begane grond
                        </button>
                        <button
                            className={`map-floor-tab${displayFloor === 1 ? ' map-floor-tab--active' : ''}`}
                            onClick={() => setDisplayFloor(1)}
                        >
                            Eerste verdieping
                        </button>
                    </div>

                    {/* "Van" (from) / "Naar" (to) room pickers, grouped by floor, plus a swap button */}
                    <div className="map-nav-controls">
                        <div className="map-nav-group">
                            <label className="map-nav-label" htmlFor="map-from">Van</label>
                            <select id="map-from" className="map-nav-select" value={fromId} onChange={(e) => setFromId(e.target.value)}>
                                <optgroup label="Begane grond">
                                    {ROOMS_0.map((r) => <option key={r.id} value={r.id}>{r.id} – {r.label}</option>)}
                                </optgroup>
                                <optgroup label="Eerste verdieping">
                                    {ROOMS_1.map((r) => <option key={r.id} value={r.id}>{r.id} – {r.label}</option>)}
                                </optgroup>
                            </select>
                        </div>

                        <button className="map-swap-btn" onClick={() => { setFromId(toId); setToId(fromId) }} title="Wissel">⇄</button>

                        <div className="map-nav-group">
                            <label className="map-nav-label" htmlFor="map-to">Naar</label>
                            <select id="map-to" className="map-nav-select" value={toId} onChange={(e) => setToId(e.target.value)}>
                                <optgroup label="Begane grond">
                                    {ROOMS_0.map((r) => <option key={r.id} value={r.id}>{r.id} – {r.label}</option>)}
                                </optgroup>
                                <optgroup label="Eerste verdieping">
                                    {ROOMS_1.map((r) => <option key={r.id} value={r.id}>{r.id} – {r.label}</option>)}
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    {/* Shown only when the route spans both floors */}
                    {crossesFloor && (
                        <div className="map-floor-notice">
                            Route gaat via meerdere verdiepingen — gebruik de tabs om te wisselen
                        </div>
                    )}

                    {/* Floorplan image with an SVG overlay for the route line, plus clickable room markers */}
                    <div className="mapSection">
                        <div className="map-img-wrap">
                            <img
                                src={floorImg}
                                alt={`Plattegrond ${displayFloor === 0 ? 'begane grond' : 'eerste verdieping'}`}
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
                                    {/* Arrowhead drawn at the end of the route line */}
                                    <marker id="map-arrow" markerWidth="5" markerHeight="4" refX="3" refY="2" orient="auto">
                                        <polygon points="0 0, 5 2, 0 4" fill="#e08a1e" opacity="0.9" />
                                    </marker>
                                </defs>
                                {/* The route line itself, drawn through the waypoints visible on this floor */}
                                {visiblePath.length > 1 && (
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
                            {/* One button per room/stairs/lift on this floor. Clicking a room
                                (other than the current start) sets it as the new destination. */}
                            {visibleRooms.map((room) => (
                                <button
                                    key={room.id}
                                    className={markerClass(room)}
                                    style={{ left: `${room.px}%`, top: `${room.py}%` }}
                                    onClick={() => { if (room.id !== fromId) setToId(room.id) }}
                                    onMouseEnter={() => setTooltip(room)}
                                    onMouseLeave={() => setTooltip(null)}
                                    aria-label={`Navigeer naar ${room.label}`}
                                >
                                    {room.stairs ? '🚶' : room.lift ? '🛗' : room.id}
                                </button>
                            ))}
                            {/* Hover tooltip showing the room's id, name, and area (if known) */}
                            {tooltip && (
                                <div
                                    className="map-tooltip"
                                    style={{ left: `${tooltip.px}%`, top: `${tooltip.py}%` }}
                                >
                                    <strong>{tooltip.id}</strong> {tooltip.label}
                                    {tooltip.area && (
                                        <span className="map-tooltip-area"> · {tooltip.area}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Step count badge + textual route description */}
                    <div className="map-route-info">
                        {path.length > 1
                            ? <>
                                <span className="map-route-badge">
                                    {path.filter(id => !nodeById(id)?.corridor).length - 1} stap{path.length - 1 !== 1 ? 'pen' : ''}
                                </span>{' '}
                                {routeMsg}
                            </>
                            : <span className="map-route-empty">{routeMsg || 'Kies een start- en eindpunt.'}</span>
                        }
                    </div>

                    {/* Color legend explaining the from/to/route marker styles */}
                    <div className="mapbtns">
                        <div className="map-legend">
                            <span className="map-legend-dot map-legend-dot--from" /> Van
                            <span className="map-legend-dot map-legend-dot--to" /> Naar
                            <span className="map-legend-dot map-legend-dot--path" /> Route
                        </div>
                    </div>

                </div>
            </section>
            <Phonefooter />
        </>
    )
}

export default MapCombined
