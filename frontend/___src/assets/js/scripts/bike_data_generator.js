import moment from 'moment'

var COLORS = ['#268F26', '#215A70', '#C78D4D', '#C74D4D', '#C7BC4D', '#9FBD49', '#943A7B', '#5C3B87'];
var OFFSET = 0.005

var generateDummyRecords = function(num, offset){
    var coordinates = [];
    for(var i = 0; i < num; i++){
        coordinates.push( {
            timeStamp: moment().subtract(num - i - 1, "day").format("X"),
            position: [
            47.410850 + i%2 * OFFSET - OFFSET * offset * 2,
            8.546487 + i*OFFSET
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
            records: generateDummyRecords(10, i),
            visible: true,
            disabledClass: 'map-nav__item--disabled'
        });
    }
    return data;
}


export default generateDummyBikeData
