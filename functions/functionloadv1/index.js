"use strict";

const sampleData = require("./data/sample-data.json");
/**
 * This function takes a large JSON payload, calculates the distance between a supplied cordinate and the data, sorts it, and returns the nearest x results.
 *
 * The exported method is the entry point for your code when the function is invoked.
 *
 * Following parameters are pre-configured and provided to your function on execution:
 * @param event: represents the data associated with the occurrence of an event, and
 *                 supporting metadata about the source of that occurrence.
 * @param context: represents the connection to Functions and your Salesforce org.
 * @param logger: logging handler used to capture application logs and trace specifically
 *                 to a given execution of a function.
 */
module.exports = async function (event, context, logger) {
  for (let i = 0; i < 100; i++) {
  
  const data = event.data || {};
  logger.info(
    `Invoking processlargedatajs Function with payload ${JSON.stringify(data)}`
  );

  // validate the payload params
  if (!data.latitude || !data.longitude) {
    throw new Error(`Please provide latitude and longitude`);
  }

  // Sets 5 if length is not provided, also accepts length = 0
  const length = data.length ?? 100;

  // Iterate through the schools in the file and calculate the distance using the distance function below
  const schools = sampleData.schools
    .map((school) => {
      return Object.assign({}, school, {
        distance: distance(
          data.latitude,
          data.longitude,
          school.latitude,
          school.longitude
        )
      });
    })
    // Sort schools by distance distance from the provided location
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

  // Assign the nearest x schools to the results constant based on the length property provided in the payload
  const results = schools.slice(0, length);
  var process = require('process');
  // show the memory 
  let showmem = function() {
    let used = process.memoryUsage();
    for (var key in used) {
      key, "=", used[key]/(1024*1024*1024), "GB";
      logger.info(key); 
    }
  }


  // return the results
  
  logger.info(`**********--------------RESULTS HERE x-times:${length} ---------------------*************: ${JSON.stringify(results)}`);
  return { schools: results };


  }
};



/**
 * @param {string} latitudeSt:  represents the latitude of the origin point
 * @param {string} longitudeSt:  represents the longitude of the origin point
 * @param {string} latitudeSch:  represents the latitude of the school
 * @param {string} longitudeSch:  represents the longitude of the school
 * ....
 * @returns {number} distance between point a and b
 */
function distance(latitudeSt, longitudeSt, latitudeSch, longitudeSch) {
  if (latitudeSt == latitudeSch && longitudeSt == longitudeSch) {
    return 0;
  } else {
    const radLatitudeSf = (Math.PI * latitudeSt) / 180;
    const radLatitudeSch = (Math.PI * latitudeSch) / 180;
    const theta = longitudeSt - longitudeSch;
    const radTheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radLatitudeSf) * Math.sin(radLatitudeSch) +
      Math.cos(radLatitudeSf) * Math.cos(radLatitudeSch) * Math.cos(radTheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}
