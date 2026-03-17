/*
Water / Flood Mask (NDWI) — Sentinel-2 (Basic)
Author: Zaigham Ali
Purpose: Detect water-like pixels using NDWI and a simple threshold.

How to use:
1) Open https://code.earthengine.google.com/
2) Paste and run.
3) Adjust AOI, dates, cloud threshold, and NDWI threshold.

Note:
- This is a simplified learning example.
- For flood mapping, you should compare pre/post event dates and refine masking.
*/

var aoi = ee.Geometry.Point([69.3451, 30.3753]).buffer(30000);
Map.centerObject(aoi, 7);

var startDate = '2023-07-01';
var endDate   = '2023-09-30';

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate(startDate, endDate)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var composite = s2.median().clip(aoi);

// NDWI = (Green - NIR) / (Green + NIR)
// Sentinel-2: Green = B3, NIR = B8
var ndwi = composite.normalizedDifference(['B3', 'B8']).rename('NDWI');

// Simple threshold for "water-like" pixels (tune this)
var ndwiThreshold = 0.2;
var waterMask = ndwi.gt(ndwiThreshold).selfMask().rename('water');

var rgbVis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
var ndwiVis = {min: -0.5, max: 0.5, palette: ['#8b0000', '#fdae61', '#ffffbf', '#74add1', '#2b83ba']};
var waterVis = {palette: ['#00bfff']};

Map.addLayer(composite, rgbVis, 'Sentinel-2 RGB (median)');
Map.addLayer(ndwi, ndwiVis, 'NDWI');
Map.addLayer(waterMask, waterVis, 'Water mask (NDWI > ' + ndwiThreshold + ')');

// Optional: estimate water area in km² (approx)
var pixelArea = ee.Image.pixelArea().divide(1e6).rename('area'); // km²
var waterArea = pixelArea.updateMask(waterMask).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 10,
  maxPixels: 1e9
});

print('Estimated water area (km²) in AOI:', waterArea.get('area'));
