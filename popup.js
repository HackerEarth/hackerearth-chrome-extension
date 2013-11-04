(function () {

  var init = function() {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://www.hackerearth.com/chrome-extension/events/", true);
      xhr.send();
      xhr.onreadystatechange = function () {
          var json = JSON.parse(xhr.responseText);
          // document.getElementById('response').innerHTML = xhr.responseText;
          document.getElementById('indicator').style.display = 'none';
          reset();
          populateDiv("ongoing", "ONGOING", json);
          populateDiv("upcoming", "UPCOMING", json);
      };
  };

  var populateDiv = function(div, constant, json) {
    for(i = 0, len = json.length; i < len; i++) {
      e = json[i]; 
      // finally got this much working.
      if( e.status == constant && (e.college == false) ) {
        document.getElementById(div).appendChild(createNode(e));
      }
    }
  };

  var reset = function() {
   clearDiv("ongoing");
   clearDiv("upcoming");
  };

  var clearDiv = function (div) {
    node = document.getElementById(div);
    while(node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  };

  // create a new node for chrome extension.
  var createNode = function (e) {
    var element = document.createElement("div"),
    // to be modified
    str = "<div class='notification-item'>"+ 
            "<div class='sub-heading'>" + 
              "<a href='" + e.url + "' target='_blank' class='underline-hover'>" + e.title + "</a>"+
            "</div>" +
             "Date: " + e.date +
             "<br/>" +
             " Time: " + e.time + 
             "<br/>" + 
             "Click " +
             "<a href='" + e.subscribe + "' target='_blank' class='underline-hover' >here</a>"+
             " to subscribe" +
          "</div>";

    element.innerHTML = str;
    return element;
  };

  document.addEventListener('DOMContentLoaded', function () {
      init();
  });

})();