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
    { id: "0.62", label: "0.62", area: "", px: 54.3, py: 30.7, floor: 0 },
    { id: "0.72", label: "0.72", area: "", px: 54.6, py: 42.9, floor: 0 },
    { id: "0.73", label: "0.73", area: "", px: 56.6, py: 49.5, floor: 0 },
    { id: "0.74", label: "0.74", area: "", px: 54.4, py: 57.8, floor: 0 },
    { id: "0.75", label: "0.75", area: "", px: 54.6, py: 68.2, floor: 0 },
    { id: "0.54", label: "0.54", area: "", px: 34.4, py: 7.4, floor: 0 },
    { id: "0.53", label: "0.53", area: "", px: 40.6, py: 7.3, floor: 0 },
    { id: "0.52", label: "0.52", area: "", px: 46.7, py: 7.5, floor: 0 },
    { id: "0.44", label: "0.44", area: "", px: 58.6, py: 10.8, floor: 0 },
    { id: "0.42", label: "0.42", area: "", px: 76.5, py: 15.9, floor: 0 },
    { id: "0.41", label: "0.41", area: "", px: 76.9, py: 21.9, floor: 0 },
    { id: "0.24", label: "0.24", area: "", px: 71.8, py: 48.1, floor: 0 },
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
    { id: "0c.R2", corridor: true, px: 65.3, py: 36.1, floor: 0 },
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
    { id: "0c.X31", corridor: true, px: 51.5, py: 36.3, floor: 0 },
    { id: "0c.X32", corridor: true, px: 80.6, py: 42.2, floor: 0 },
    { id: "0c.X33", corridor: true, px: 80.8, py: 58.8, floor: 0 },
    { id: "stairs.0", label: "Trap", stairs: true, px: 69.4, py: 67.8, floor: 0 },
    { id: "lift.0", label: "Lift", lift: true, px: 61.3, py: 69.8, floor: 0 },
    { id: "stairs.02", label: "Trap 2", stairs: true, px: 71.4, py: 38.4, floor: 0 },
]

// ─── FLOOR 1 NODES ───────────────────────────────────────────────────────────
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
    { id: "lift.1", label: "Lift", lift: true, px: 49, py: 37, floor: 1 },
    { id: "stairs.1.2", label: "Trap 2", stairs: true, px: 69.8, py: 32.5, floor: 1 },
]

const ALL_NODES = [...NODES_0, ...NODES_1]

// ─── GRAPH ────────────────────────────────────────────────────────────────────
const GRAPH = {
    "0.70a": ["0.70"],
    "0.70": ["0c.B1", "0c.H2", "0.70a"],
    "0.80": ["0c.L5", "0c.H2", "0c.L4"],
    "0.01": ["0c.F5"],
    "0.60": ["0c.L2", "0c.R3", "0c.X20", "0c.L1", "0c.X28"],
    "0.93": ["0c.X26"],
    "0.64": ["0c.L1"],
    "0.65": ["0c.L3", "0c.L2"],
    "0.66": ["0c.L2"],
    "0.71": ["0c.X31"],
    "0.61": ["0c.R3", "0.62"],
    "0.62": ["0.61"],
    "0.72": ["0c.X31"],
    "0.73": ["0c.X22", "0c.H4"],
    "0.74": ["0c.X24"],
    "0.75": ["0c.X24"],
    "0.54": ["0c.X27"],
    "0.53": ["0c.X28"],
    "0.52": ["0c.X28"],
    "0.44": ["0c.R1"],
    "0.42": ["0c.R1"],
    "0.41": ["0c.X29"],
    "0.24": ["0c.F3", "0.22"],
    "0.22": ["0c.F5", "0.24", "0.23", "0c.X32", "0c.X33"],
    "0.23": ["0.22"],
    "0.14": ["0c.X25"],
    "0c.L1": ["0c.L2", "0c.X20", "0.64", "0.60"],
    "0c.L2": ["0c.L1", "0.64", "0.60", "0c.H2", "0.66", "0.65"],
    "0c.L3": ["0.65", "0c.L4", "0c.X26"],
    "0c.L4": ["0c.L3", "0.66", "0c.L5", "0.80"],
    "0c.L5": ["0c.L4", "0.71", "0.80", "0c.H2"],
    "0c.H2": ["0c.L5", "0.70", "0c.R4", "0c.X22", "0c.L2", "0.80", "stairs.0", "lift.0"],
    "0c.H4": ["0.73", "0c.F4"],
    "0c.R1": ["0.44", "0c.R2", "0.42", "0c.X29", "0c.X30"],
    "0c.R2": ["0c.R1", "0c.F3", "0c.X31"],
    "0c.R3": ["0.60", "0.61", "0c.R4", "0c.X28", "0c.X30", "stairs.02"],
    "0c.R4": ["0c.R3", "0.62", "0c.H2", "0c.X22", "0c.X31"],
    "0c.F3": ["0.24", "0c.F4", "0c.R2", "0c.X32"],
    "0c.F4": ["0c.F3", "0c.F5", "0c.H4"],
    "0c.F5": ["0c.F4", "0.22", "0.01", "0c.X33"],
    "0c.B1": ["0.70", "0c.X24", "0c.X23"],
    "0c.X20": ["0c.L1", "0.60", "0c.X27", "0c.X30"],
    "0c.X22": ["0.73", "0c.H2", "0c.R4"],
    "0c.X23": ["0c.X24", "0c.X25", "0c.B1"],
    "0c.X24": ["0c.B1", "0.74", "0c.X23", "0.75"],
    "0c.X25": ["0c.X23", "0.14"],
    "0c.X26": ["0.93", "0c.L3"],
    "0c.X27": ["0c.X20", "0.54", "0c.X28"],
    "0c.X28": ["0c.X27", "0.53", "0.52", "0c.R3", "0.60", "0c.X30"],
    "0c.X29": ["0c.R1", "0.41"],
    "0c.X30": ["0c.R1", "0c.R3", "0c.X20", "0c.X28"],
    "0c.X31": ["0c.R2", "0.72", "0c.R4"],
    "0c.X32": ["0c.F3", "0.22"],
    "0c.X33": ["0.22", "0c.F5"],
    "stairs.0": ["0c.H2", "stairs.1"],
    "stairs.02": ["0c.R3", "stairs.1.2"],
    "lift.0": ["0c.H2", "lift.1"],
    "stairs.1": ["stairs.0", "1c.X37", "1c.X36", "1c.X45", "1c.X29"],
    "lift.1": ["lift.0", "1c.X37"],
    "stairs.1.2": ["1c.X25", "1c.X29", "1c.X26", "1c.X27", "stairs.02"],
    "1.02": ["1c.X48"],
    "1.03": ["1c.X48"],
    "1.04": ["1c.X49"],
    "1.05": ["1c.X50"],
    "1.06": ["1c.X50"],
    "1.09": ["1c.X50"],
    "1.10": ["1c.X42", "1.21", "1c.X47", "1c.X55", "1c.X57"],
    "1.21": ["1.10"],
    "1.22": ["1c.X38", "1c.X39", "1.25"],
    "1.24": ["1c.X43", "1c.X39"],
    "1.25": ["1.22", "1c.X51"],
    "1.26": ["1c.X28", "1c.X38"],
    "1.27": ["1c.X58"],
    "1.28": ["1c.X27"],
    "1.30": ["1c.X25", "1c.X29", "1c.X26"],
    "1.31": ["1c.X29"],
    "1.43": ["1c.X25"],
    "1.44": ["1c.X23"],
    "1.51": ["1c.X34", "1c.X33"],
    "1.52": ["1c.X35", "1c.X34"],
    "1.53": ["1c.X35"],
    "1.60": ["1c.X37", "1c.X29", "1c.X45"],
    "1.61": ["1c.X36"],
    "1.62": ["1c.X31", "1c.X37", "1c.X30"],
    "1.63": ["1c.X32", "1c.X33"],
    "1.64": ["1c.X40", "1c.X56", "1c.X60"],
    "1.23": ["1c.X44", "1c.X39"],
    "1c.X23": ["1c.X33", "1.44", "1c.X24"],
    "1c.X24": ["1c.X23", "1c.X25"],
    "1c.X25": ["1c.X24", "1.43", "1.30", "stairs.1.2"],
    "1c.X26": ["1.30", "1c.X27", "1c.X28", "1c.X46", "stairs.1.2"],
    "1c.X27": ["1c.X26", "1.28", "1c.X55", "1c.X58"],
    "1c.X28": ["1c.X26", "1c.X43", "1.26", "1c.X51", "1c.X58"],
    "1c.X29": ["1.60", "1.30", "1c.X45", "1.31", "stairs.1"],
    "1c.X30": ["1c.X37", "1c.X31", "1.62"],
    "1c.X31": ["1.62", "1c.X30", "1c.X56", "1c.X32", "1c.X59"],
    "1c.X32": ["1.63", "1c.X35", "1c.X31", "1c.X59"],
    "1c.X33": ["1.63", "1.51", "1c.X23", "1c.X36"],
    "1c.X34": ["1c.X35", "1.51", "1.52"],
    "1c.X35": ["1c.X32", "1.53", "1.52", "1c.X34"],
    "1c.X36": ["1c.X33", "1.61", "1c.X37", "1c.X59"],
    "1c.X37": ["1c.X36", "1.60", "1c.X30", "1.62", "1c.X45", "1c.X60", "stairs.1", "lift.1"],
    "1c.X38": ["1.22", "1c.X46", "1.26"],
    "1c.X39": ["1.22", "1c.X41", "1.24", "1.23"],
    "1c.X40": ["1.64", "1c.X41", "1c.X57", "1c.X60"],
    "1c.X41": ["1c.X39", "1c.X42", "1c.X40"],
    "1c.X42": ["1c.X43", "1c.X41", "1.10", "1c.X55"],
    "1c.X43": ["1c.X28", "1.24", "1c.X42"],
    "1c.X44": ["1.23"],
    "1c.X45": ["1c.X29", "1c.X46", "1.60", "1c.X37"],
    "1c.X46": ["1c.X45", "1c.X26", "1c.X38"],
    "1c.X47": ["1.10", "1c.X48"],
    "1c.X48": ["1c.X47", "1.02", "1.03", "1c.X49"],
    "1c.X49": ["1c.X48", "1.04", "1c.X50"],
    "1c.X50": ["1c.X49", "1.06", "1.09", "1.05"],
    "1c.X51": ["1c.X28", "1.25", "1c.X58"],
    "1c.X55": ["1c.X27", "1c.X42", "1.10", "1c.X58"],
    "1c.X56": ["1.64", "1c.X31", "1c.X60"],
    "1c.X57": ["1.10", "1c.X40"],
    "1c.X58": ["1c.X27", "1.27", "1c.X28", "1c.X51", "1c.X55"],
    "1c.X59": ["1c.X36", "1c.X31", "1c.X32"],
    "1c.X60": ["1.64", "1c.X40", "1c.X56", "1c.X37"],
}

// ─── Dijkstra ─────────────────────────────────────────────────────────────────
function dijkstra(from, to) {
    const dist = {}, prev = {}, visited = new Set()
    ALL_NODES.forEach((n) => (dist[n.id] = Infinity))
    dist[from] = 0
    const queue = ALL_NODES.map((n) => n.id)
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

function nodeById(id) { return ALL_NODES.find((n) => n.id === id) }

// After
const ROOMS_0 = NODES_0.filter((n) => !n.corridor && !n.stairs && !n.lift)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
const ROOMS_1 = NODES_1.filter((n) => !n.corridor && !n.stairs && !n.lift)
    .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
const ALL_ROOMS = [...ROOMS_0, ...ROOMS_1]

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

    // ── Read initial from/to from route state (set by MapSearch) ─────────────
    const initialFrom = location.state?.from ?? ALL_ROOMS[0].id
    const initialTo = location.state?.to ?? ALL_ROOMS[1].id

    const [fromId, setFromId] = useState(initialFrom)
    const [toId, setToId] = useState(initialTo)
    const [path, setPath] = useState([])
    const [routeMsg, setRouteMsg] = useState('')
    const [tooltip, setTooltip] = useState(null)
    const [displayFloor, setDisplayFloor] = useState(nodeById(initialFrom)?.floor ?? 0)

    const floorImg = displayFloor === 0 ? floorplan0Img : floorplan1Img

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

    useEffect(() => { doNavigate(fromId, toId) }, [fromId, toId, doNavigate])

    useEffect(() => {
        const floor = nodeById(fromId)?.floor ?? 0
        setDisplayFloor(floor)
    }, [fromId])

    const visibleRooms = ALL_NODES.filter((n) => n.floor === displayFloor && !n.corridor)
    const visiblePath = path.filter((id) => nodeById(id)?.floor === displayFloor)

    const markerClass = (room) => {
        if (room.id === fromId) return 'map-marker map-marker--from'
        if (room.id === toId) return 'map-marker map-marker--to'
        if (path.includes(room.id)) return 'map-marker map-marker--path'
        return 'map-marker'
    }

    const pathPoints = visiblePath.map((id) => {
        const n = nodeById(id)
        return `${n.px},${n.py}`
    }).join(' ')

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

                    {crossesFloor && (
                        <div className="map-floor-notice">
                            🏢 Route gaat via meerdere verdiepingen — gebruik de tabs om te wisselen
                        </div>
                    )}

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
                                    <marker id="map-arrow" markerWidth="5" markerHeight="4" refX="3" refY="2" orient="auto">
                                        <polygon points="0 0, 5 2, 0 4" fill="#e08a1e" opacity="0.9" />
                                    </marker>
                                </defs>
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
