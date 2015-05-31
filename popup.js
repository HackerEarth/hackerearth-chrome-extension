(function () {

  // define constants here
  var DATA_URL= 'https://www.hackerearth.com/chrome-extension/events/'; 
  var ONGOING= 'ONGOING';
  var UPCOMING= 'UPCOMING';
  var ONGOING_PARENT_ID= 'ongoing-top-parent';
  var UPCOMING_PARENT_ID= 'upcoming-top-parent';
  var ONGOING_ID= 'ongoing';
  var UPCOMING_ID= 'upcoming';
  var CHALLENGE_TYPE_ID = 'challenge-type'
  var CHALLENGE_TYPE_PARENT_ID = 'challenge-type-parent';
  
  var DEBUG = false;

  function debug(data){
    if(DEBUG){
        console.log(data);
    }    
  }

  var init = function() {
      document.getElementById(ONGOING_PARENT_ID).style.display = 'none';
      document.getElementById(UPCOMING_PARENT_ID).style.display = 'none';
      document.getElementById(CHALLENGE_TYPE_PARENT_ID).style.display = 'none';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', DATA_URL, true);
      xhr.send();
      
      xhr.onreadystatechange = function () {
          var json_response = JSON.parse(xhr.responseText);
          var json = json_response.response;
          debug(json);
          document.getElementById('indicator').style.display = 'none';
          reset();
          populateDiv(ONGOING_ID, ONGOING, json);
          populateDiv(UPCOMING_ID, UPCOMING, json);
          populateChallengeStatusOptions(json);

          var selector = document.getElementById(CHALLENGE_TYPE_ID);
          selector.addEventListener('change', selectionChanged, false)
          selector.myParams = json;
          debug('population done');
          var ongoing_isempty = hideIfEmpty(ONGOING_PARENT_ID, ONGOING_ID);
          var upcoming_isempty = hideIfEmpty(UPCOMING_PARENT_ID, UPCOMING_ID);
          debug('empty ones are hid');
          if(!ongoing_isempty){  
            debug('Ongoing not empty');
            document.getElementById(ONGOING_PARENT_ID).style.display = 'block';
          }
          if(!upcoming_isempty){
            debug('Upcoming not empty');
            document.getElementById(UPCOMING_PARENT_ID).style.display = 'block';
          }
          if(!ongoing_isempty || !upcoming_isempty){
            document.getElementById(CHALLENGE_TYPE_PARENT_ID).style.display = 'block';
          }
      };
  };

  var hideIfEmpty = function(parent_id, div_id) {
    var div = document.getElementById(div_id);
    if (!div.hasChildNodes()) {
      document.getElementById(parent_id).style.display = 'none';
      return 1;
    }
    else{
        document.getElementById(parent_id).style.display = 'block';
        return 0;
    }
  };

  var selectionChanged = function(data) {
    var requiredChallenge = document.getElementById(CHALLENGE_TYPE_ID).value;
    reset();
    
    populateDiv(ONGOING_ID, ONGOING, data.target.myParams, requiredChallenge);
    populateDiv(UPCOMING_ID, UPCOMING, data.target.myParams, requiredChallenge);

    hideIfEmpty(ONGOING_PARENT_ID, ONGOING_ID);
    hideIfEmpty(UPCOMING_PARENT_ID, UPCOMING_ID);
  };

  var populateChallengeStatusOptions = function(json) {

    var challengesType=[];
    var tempList = "";
    for (i = 0, len = json.length; i < len; i++) {
      e=json[i];

      if (tempList.search(e.challenge_type) >= 0) {
      } else { //if uniqure
        challengesType.push(e.challenge_type.toUpperCase());
        tempList = tempList + e.challenge_type + ";"
      }
    }
    
    clearDiv(CHALLENGE_TYPE_ID);

    //Add the header message before adding the types of challenges
    var option = document.createElement('option');
    option.text = 'CHALLENGE TYPES';
    document.getElementById(CHALLENGE_TYPE_ID).add(option, 0);  

    for (i = 0; i < challengesType.length; i++) {

      var option = document.createElement('option');
      option.text = challengesType[i];
      document.getElementById(CHALLENGE_TYPE_ID).add(option);
    }    
  };


  /**
   * Populates the divs of various challenge types
   * @param div_id                {String} <div> id which will be populated
   * @param challenge_status      {String} Ongoing or Upcoming
   * @param json                  {Array}  Array of Events
   * @param requiredChallengeType {String} Hiring or College or HackerEarth Challenge
   */
  var populateDiv = function(div_id, challenge_status, json, requiredChallengeType) {
    for(i = 0, len = json.length; i < len; i++) {
      e = json[i]; 

      if (requiredChallengeType === 'CHALLENGE TYPES' || typeof requiredChallengeType === 'undefined') {
        if( e.status == challenge_status ) { //status shows whether the content is upcoming or ongoing
          document.getElementById(div_id).appendChild(create_node(e));
        }  
      } else {
        if( (e.status == challenge_status) && e.challenge_type.toUpperCase() === requiredChallengeType) {
            //status shows whether the content is upcoming or ongoing
          debug(e);
          document.getElementById(div_id).appendChild(create_node(e));
        } 
      }
    }
  };


      /**
       * Clears the div elements
       */
  var reset = function() {
   document.getElementById(ONGOING_PARENT_ID).style.display = 'block';
   document.getElementById(ONGOING_PARENT_ID).style.display = 'block';
   clearDiv(ONGOING_ID);
   clearDiv(UPCOMING_ID);
  };

  var clearDiv = function (div_id) {
    node = document.getElementById(div_id);
    //In every iteration, removes the last node.
    if (node === null){
        debug(div_id);
    }
    else{
        while(node.hasChildNodes()) {
          node.removeChild(node.lastChild);
        }
    }
  };

  // create a new node for chrome extension.
  var create_node = function (e) {
    var element = document.createElement('div'),
    // to be modified
    str = "<div class='notification-item'>"+ 
            "<div class='sub-heading'>" + 
              "<a href='" + e.url + "' target='_blank' class='underline-hover'>" + e.title + "</a>"+
            "</div>" +
            "Challenge Type: " + e.challenge_type +
            "<br/>" +
             "Date: " + e.date +
             "<br/>" +
             "Time: " + e.time + 
          "</div>";

    element.innerHTML = str;
    return element;
  };

  document.addEventListener('DOMContentLoaded', function () {
      init();
  });

})();
