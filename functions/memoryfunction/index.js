/**
 * Describe Memoryfunction here.
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
 const request = require('request');

 module.exports = async function (event, context, logger) {
    logger.info(`Invoking Memoryfunction with payload ${JSON.stringify(event.data || {})}`);

    //const results = await context.org.dataApi.query('SELECT Id, Name FROM Account');

    //logger.info(JSON.stringify(results));

    let num = event.data["Iterations"] || 1;
    logger.info('Iterations:' + num + " million");

    let s = "*";
    let mbarray = [];
    let result = "";

    let showmem = function() {
      let used = process.memoryUsage();
      for (var key in used) {
        console.log(key, "=", used[key]/(1024*1024*1024), "GB");
      }
    }

    try {
      for (var i = 0; i < num * 1000000; i++) {
        mbarray[i] = s.repeat(1048576); //1MB
      }  
      result = "Completed " + num + " million iterations";
      showmem();
    }
    catch(e) {
      console.log(e);
      showmem();
      result = "Ran out of memory";
    }

    logger.info('Result:' + result);
    return result;
  }
