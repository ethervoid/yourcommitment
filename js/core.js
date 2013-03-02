/*global cartodb */

var YourCommitment = YourCommitment || {};

(function () {
    "use strict";
    YourCommitment.Main = function () {
        this.sql = new cartodb.SQL({ user: 'yourcommitment' });
    };

    YourCommitment.Main.Main.prototype = {
        options : {
            center: [42.55308, -43.59375],
            zoom: 3,
            zoomControl: false,
            loaderControl: false
        },
        sql : null,
        numberOfCountries: 0,
        actualData: null,
        show : function () {
            this.loadDataFromTable();
        },
        loadDataFromTable : function () {
            var that = this;
            this.sql.execute("select count(*) from yourcommitment")
            .done(function (data) {
                that.numberOfCountries = data.rows[0].count;
                that.initScoreAndRankingCounters(that.numberOfCountries);
                that.paintVisualization();
            })
            .error(function (error) {
                console.error(error);
            });
        },
        paintVisualization : function () {
            var that = this;
            cartodb.createVis('map', '', this.options)
              .done(function (vis, layers) {});
        }
    };
}());

function init() {
    var yourcommitment = new YourCommitment.Main();
    yourcommitment.show();
}

window.onLoad = init();
