/*global cartodb */

var YourCommitment = YourCommitment || {};

(function () {
    "use strict";
    YourCommitment.Main = function () {
    };

    YourCommitment.Main.prototype = {
        options : {
            center: [42.55308, -43.59375],
            zoom: 2,
            zoomControl: false,
            loaderControl: false
        },
        click_position : {
            x: 0,
            y: 0
        },
        show : function () {
            var that = this;
            $(document).click(function (e) {
                that.click_position.x = e.pageX;
                that.click_position.y = e.pageY;
            });
            this.paintVisualization();
        },
        paintVisualization : function () {
            var that = this;
            cartodb.createVis('map', 'http://yourcommitment.cartodb.com/api/v1/viz/4701/viz.json', this.options)
              .done(function (vis, layers) {
                    layers[1].setInteractivity(['country', 'iso3', 'poverty_headcount_ratio_at_2']);
                    layers[1].on('featureClick', function (e, latlng, pos, data) {
                        $(".country_info_window").css("top", that.click_position.y - 280);
                        $(".country_info_window").css("left", that.click_position.x - 130);
                        $(".country_name").text(data.country);
                        $(".country_info_window").fadeIn(200);
                    });
                });
        }
    };
}());

function init() {
    var yourcommitment = new YourCommitment.Main();
    yourcommitment.show();
}

window.onLoad = init();
