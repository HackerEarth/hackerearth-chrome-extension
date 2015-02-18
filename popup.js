(function () {

  var init = function() {
    
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "http://www.hackerearth.com/chrome-extension/events/", true);
      xhr.send();
      
      xhr.onreadystatechange = function () {
          var json = JSON.parse(xhr.responseText);
          
          document.getElementById('indicator').style.display = 'none';
          reset();
          populateDiv("ongoing", "ONGOING", json);
          populateDiv("upcoming", "UPCOMING", json);
          populateChallengeStatusOptions(json);

          var selector = document.getElementById("challengeType");
          selector.addEventListener("change", selectionChanged, false)
          selector.myParams = json;

          hideIfEmpty("ongoingTopParent", "ongoing");
          hideIfEmpty("upcomingTopParent", "upcoming");
      };
  };

  var hideIfEmpty = function(parentTag, divTag) {
    var div = document.getElementById(divTag);
    if (!div.hasChildNodes()) {
      document.getElementById(parentTag).style.display = 'none';
    }
  }

  var selectionChanged = function(data) {
    var requiredChallenge = document.getElementById("challengeType").value;
    console.log("Length:" + data.target.myParams);
    reset();
    
    populateDiv("ongoing", "ONGOING", data.target.myParams, requiredChallenge);
    populateDiv("upcoming", "UPCOMING", data.target.myParams, requiredChallenge);

    hideIfEmpty("ongoingTopParent", "ongoing");
    hideIfEmpty("upcomingTopParent", "upcoming");
  }

  var populateChallengeStatusOptions = function(json) {

    var challengesType=[];
    var tempList = "";
    for (i = 0, len = json.length; i < len; i++) {
      e=json[i];

      if (tempList.search(e.challenge_type) >= 0) {
        console.log("Found match for " + e.challenge_type);
      } else { //if uniqure
        console.log("appending to list " + e.challenge_type);
        challengesType.push(e.challenge_type.toUpperCase());
        tempList = tempList + e.challenge_type + ";"
      }
    }
    console.log(challengesType);
    
    clearDiv("challengeType");

    //Add the header message before adding the types of challenges
    var option = document.createElement("option");
    option.text = "CHALLENGE TYPES";
    document.getElementById("challengeType").add(option, 0);  

    for (i = 0; i < challengesType.length; i++) {

      var option = document.createElement("option");
      option.text = challengesType[i];
      document.getElementById("challengeType").add(option);
    }    
  };

  var populateDiv = function(div, challengeStatus, json, requiredChallengeType) {
    for(i = 0, len = json.length; i < len; i++) {
      e = json[i]; 

      if (requiredChallengeType === "CHALLENGE TYPES" || typeof requiredChallengeType === 'undefined') {
        if( e.status == challengeStatus ) { //status shows whether the content is upcoming or ongoing
          document.getElementById(div).appendChild(createNode(e));
        }  
      } else {
        if( (e.status == challengeStatus) && e.challenge_type.toUpperCase() === requiredChallengeType) { //status shows whether the content is upcoming or ongoing
          document.getElementById(div).appendChild(createNode(e));
        } 
      }
    }
  };

  var reset = function() {
   document.getElementById("ongoingTopParent").style.display = 'visible';
   document.getElementById("upcomingTopParent").style.display = 'visible';
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
