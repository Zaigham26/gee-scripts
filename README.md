# Google Earth Engine (GEE) Scripts — Zaigham Ali

A growing collection of **Google Earth Engine** scripts and notes for learning and portfolio purposes.

## Topics
- NDVI and vegetation monitoring
- Flood extent mapping (water detection)
- Rainfall / trends exploration
- Remote sensing workflows

## Scripts

### 1) NDVI (Sentinel‑2) — Basic
- File: `scripts/ndvi_sentinel2_basic.js`
- What it does: Loads Sentinel‑2 SR images for an AOI, builds a median composite, computes NDVI, and displays RGB + NDVI layers.
- Notes: Simple cloud filtering using `CLOUDY_PIXEL_PERCENTAGE` (kept basic for learning).

### 2) Water / Flood Mask (NDWI) — Basic
- File: `scripts/water_mask_ndwi_sentinel2.js`
- What it does: Computes NDWI from Sentinel‑2 (Green vs NIR), applies a simple threshold to highlight water-like pixels, and estimates water area inside the AOI.
- Notes: Threshold-based mask (tune for your region/event). For flood studies, compare pre/post dates.
## How to run
1. Open Google Earth Engine Code Editor: https://code.earthengine.google.com/
2. Create a new script
3. Copy/paste the code from the file above
4. Click **Run**

## Notes
Each script will include:
- Purpose
- Dataset used
- Key parameters
- Output screenshot

---
**Author:** Zaigham Ali
