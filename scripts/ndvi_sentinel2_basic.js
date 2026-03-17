/*
NDVI (Sentinel-2) — Basic Example
Author: Zaigham Ali
Purpose: Demonstrate a simple NDVI workflow in Google Earth Engine.

How to use:
1) Open https://code.earthengine.google.com/
2) Create a new script and paste this code.
3) Run and explore the layers / chart.

Notes:
- This is a learning/portfolio example.
*/

var aoi = ee.Geometry.Point([69.3451, 30.3753]).buffer(30000); // ~Pakistan center point buffer
Map.centerObject(aoi, 7);

// Date range (adjust as needed)
var startDate = '2023-01-01';
var endDate   = '2023-12-31';

// Sentinel-2 Surface Reflectance (cloud masking is simplified here)
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(aoi)
  .filterDate(startDate, endDate)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

// Create a median composite
var composite = s2.median().clip(aoi);

// NDVI = (NIR - Red) / (NIR + Red)
// Sentinel-2: NIR = B8, Red = B4
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');

// Visualization
var rgbVis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
var ndviVis = {min: -0.2, max: 0.8, palette: ['#8b0000', '#fdae61', '#ffffbf', '#a6d96a', '#1a9850']};

Map.addLayer(composite, rgbVis, 'Sentinel-2 RGB (median)');
Map.addLayer(ndvi, ndviVis, 'NDVI');

// Optional: mean NDVI value in AOI
var meanNdvi = ndvi.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: aoi,
  scale: 10,
  maxPixels: 1e9
});

print('Mean NDVI (AOI):', meanNdvi.get('NDVI'));
