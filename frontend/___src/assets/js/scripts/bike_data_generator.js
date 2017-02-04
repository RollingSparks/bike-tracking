import moment from 'moment'

var COLORS = ['#268F26', '#215A70', '#C78D4D', '#C74D4D', '#C7BC4D', '#9FBD49', '#943A7B', '#5C3B87'];
var OFFSET = 0.005

var generateDummyRecords = function(days, measurements, offset){
    var coordinates = [];
    for(var i = 0; i < measurements; i++){
        coordinates.push( {
            timeStamp: moment().subtract(i * 5, "hour").format("X"),
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


export default generateDummyBikeData
