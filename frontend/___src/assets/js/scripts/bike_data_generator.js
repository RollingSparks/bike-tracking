import moment from 'moment'

var COLORS = ['#268F26', '#215A70', '#C78D4D', '#C74D4D', '#C7BC4D', '#9FBD49', '#943A7B', '#5C3B87'];
var OFFSET = 0.005

var generateDummyRecords = function(days, measurements, offset){
    var coordinates = [];
    for(var i = 0; i < measurements; i++){
        coordinates.push( {
            timeStamp: moment().subtract(i * 0.01, "hour").format("X"),
            position: [
            47.410850 + offset * 0.01,
            8.546487 - i*OFFSET
        ],
        })
    }
    return coordinates;
}

var generateDummyBikeData = function(num){
    var data =[]
    for (var i = 0; i < num; i++){
        data.push({
            name: "Bike " + i,
            color: COLORS[i%COLORS.length],
            backgroundColor: COLORS[i%COLORS.length],
            records: generateDummyRecords(10, 500, i),
            visible: true,
            disabledClass: 'map-nav__item--disabled'
        });
    }
    return data;
}

var generateMixedBikeData = function(num, from, to){
  var data =[]
  for (var i = 0; i < num; i++){
    data.push({
      name: "Bike " + i,
      color: COLORS[i%COLORS.length],
      backgroundColor: COLORS[i%COLORS.length],
      records: generateDummyRecords(10, 500, i),
      visible: true,
      disabledClass: 'map-nav__item--disabled'
    });
  }
  data.push({
    name: "Bike 4",
    color: COLORS[i%COLORS.length],
    backgroundColor: COLORS[i%COLORS.length],
    records: getRealRecords(from, to),
    visible: true,
    disabledClass: 'map-nav__item--disabled'
  });
  return data;
}


var getRealRecords = function(from, to) {
    var locationData = []
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:8080/api/v2/query?last=3h', false)
    xhttp.setRequestHeader("Content-type", "application/json")
    xhttp.send()
    var rawDataList = JSON.parse(xhttp.responseText);
    for (var i = 0; i < rawDataList.length; i++) {
      var rawData = rawDataList[i]
      //
      if(moment(rawData.time).format('X') > from && moment(rawData.time).format('X') < to && rawData.lat !== 0 && rawData.lat !== '' && rawData.lng !== 0 && rawData.lng !== '') {
       /* var inArray = false
        for (var j = 0; j < locationData.length; j++) {
          if (locationData[j].timeStamp === rawData.time) {
            inArray = true
          }
        }

        if(!inArray) {*/
          locationData.push({
              timeStamp: moment(rawData.time).format('X'),
              position: [rawData.lat, rawData.lng]
          })
        //}
      }
    }
    return locationData
    //setTimeout(function() {
    //  generateRealRecords(from, to)
    //}, 10000)
}


export default generateMixedBikeData
