function fn() {
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
}
function populateDiv(div, constant, json) {
  for(i = 0; i < json.length; i++) {
   e = json[i]; 
   // finally got this much working.
   if( e.status == constant && (e.college == false) ) {
      document.getElementById(div).appendChild(createNode(e));
   }
  }
}
function reset() {
 clearDiv("ongoing");
 clearDiv("upcoming");
}
function clearDiv(div) {
  node = document.getElementById(div);
  while(node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}
// create a new node for chrome extension.
function createNode(e) {
  var element = document.createElement('div');
  var str = 
        "<div class=\"notification-item\">"+ 
          "<div class='sub-heading'>" + 
            "<a href='" + e.url + "' target=\"_blank\" class='underline-hover'>" + e.title + "</a>"+
          "</div>" +
           "Date: " + e.date +
           "<br/>" + 
           " Time: " + e.time + 
           "<br/>" + 
           "Click " +     
              "<a href='" + e.subscribe + "' target=\"_blank\" class='underline-hover' >here</a>"+
           " to subscribe" +
        "</div>";
  element.innerHTML = str;   
  return element;
}
document.addEventListener('DOMContentLoaded', function () {
    fn();
});
