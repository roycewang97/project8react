var Promise = require("Promise");

/**
  * FetchModel - Fetch a model from the web server.
  *     url - string - The URL to issue the GET request.
  * Returns: a Promise that should be filled
  * with the response of the GET request parsed
  * as a JSON object and returned in the property
  * named "data" of an object.
  * If the requests has an error the promise should be
  * rejected with an object contain the properties:
  *    status:  The HTTP response status
  *    statusText:  The statusText from the xhr request
  * citation: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/timeout
*/

// console.log(url);
// setTimeout(() => reject({status: 501, statusText: "Not Implemented"}),0);
// // On Success return:
// // resolve({data: getResponseObject});


function fetchModel(url) {
  return new Promise(function(resolve, reject) {

      function receiveResponse() {
          if (xhr.readyState !== 4) { //if the operation is still 0-3
            return;
          }
          if (xhr.status !== 200) {
            reject({status: xhr.status, statusText: xhr.statusText});
            //tell us what the status is and what happened if the location doesn't exist/ or the server
            //doesnt have the data you want from your request on location->improper URL
            return;
          }
          //what happens if it is successful?
          //you can now access what the server returned in this readyState function
          var temp = JSON.parse(xhr.responseText);
          resolve({data: temp})
          //now you have returned/executed whatever you want to get back from the data on server
          //this parameter of dataPackage will be passed into the promise(resolve, reject)
      }

    var xhr =  new XMLHttpRequest();
    xhr.onreadystatechange = receiveResponse;
    //classmate helped me with this because they also had the same problem
    //conceptually what was wrong was that the server was taking too many requests
    //if I set timeout, it'll give the handle requests time to take care of the requests
    //therefore, the browser is able to receive those requests from the server
    xhr.ontimeout = () => reject({status: xhr.status, statusText: xhr.statusText});
    xhr.timeout = 2000;

    xhr.open('GET', url, true);
    xhr.send();

  });
}

export default fetchModel;
