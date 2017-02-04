import '../vendor/ion.rangeSlider.js'
import $ from 'jquery'
import moment from 'moment'

$("#slider").ionRangeSlider({min: 0,
  type: "double",
  min: +moment().subtract(6, "day").format("X"),
  max: +moment().format("X"),
  from: +moment().subtract(1, "day").format("X"),
  to: +moment().format("X"),
  prettify: function (num) {
    return moment(num, "X").format("LLL");
  },
  onChange: function(data){
    updateTo(data.to);
    updateFrom(data.from);
  }
});
window.slider = $("#slider").data("ionRangeSlider");
