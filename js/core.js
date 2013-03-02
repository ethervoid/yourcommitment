/*global cartodb */

var YourCommitment = YourCommitment || {};

(function () {
    "use strict";
    YourCommitment.Main = function () {
        this.sql = new cartodb.SQL({ user: 'yourcommitment' });
    };

    YourCommitment.Main.prototype = {
        options : {
            center: [42.55308, -43.59375],
            zoom: 2,
            zoomControl: false,
            loaderControl: false
        },
        sql : null,
        actualData: null,
        show : function () {
            this.paintVisualization();
        },
        paintVisualization : function () {
            var that = this;
            cartodb.createVis('map', 'http://yourcommitment.cartodb.com/api/v1/viz/4701/viz.json', this.options)
              .done(function (vis, layers) {});
        }
    };
}());

function init() {
    var yourcommitment = new YourCommitment.Main();
    yourcommitment.show();
}

window.onLoad = init();
