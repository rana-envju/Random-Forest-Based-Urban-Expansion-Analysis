var dataset = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
                  .filter(ee.Filter.date('2011-01-01', '2011-12-31'));
var nighttimeLights = dataset.select('stable_lights').first().clip(aoi);
print(nighttimeLights);
var nighttimeLightsVis = {
  min: 3.0,
  max: 60.0,
};
Map.centerObject(aoi, 8);
Map.addLayer(nighttimeLights, nighttimeLightsVis, 'Nighttime Lights');

// Export area as TIFF file 
Export.image.toDrive({
  image: nighttimeLights, 
  description: 'nighttimeLights',
  fileNamePrefix: 'nighttimeLights',
  region: aoi,
  scale: 500,
  maxPixels: 1e10
});

//---------------------- VIIRS Nighttime data ------------------------------

var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/ANNUAL_V21')
                  .filter(ee.Filter.date('2021-01-01', '2022-01-01'));

// var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
//                   .filter(ee.Filter.date('2017-05-01', '2017-05-31'));

// var nighttime = dataset.select('avg_rad');
// var nighttimeVis = {min: 0.0, max: 60.0};

var nighttime = dataset.select('average').first();
var nighttime = nighttime.clip(aoi);
var nighttimeVis = {min: 0.0, max: 60.0};
Map.centerObject(geometry, 10);
Map.addLayer(nighttime, nighttimeVis, 'Nighttime');

Export.image.toDrive({
  image: nighttime,
  scale: 500, 
  region: aoi,
  folder: 'test'
  });
