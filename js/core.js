/*global L,Parse,cartodb,_ */

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
        position : null,
        paintVisualization : function () {
            var that = this;
            cartodb.createVis('map', 'http://yourcommitment.cartodb.com/api/v1/viz/4701/viz.json', this.options)
              .done(function (vis, layers) {
                    layers[1].setInteractivity(['country', 'iso3', 'poverty_headcount_ratio_at_2']);
                    layers[1].on('featureClick', function (e, latlng, pos, data) {
                        that.position = latlng;
                        var parse_query = new YourCommitment.Query();
                        parse_query.query("ONGCountry", data.iso3, function (results) {
                            console.log(results);
                            $(".ong_list").html("");
                            _.each(results, function (ong) {
                                if (ong.attributes.ONG !== undefined) {
                                    $(".ong_list").append("<li class='ong_name'><a href='ong.html?ongId=" + ong.attributes.ONG.id + "&country=" + data.iso3  + "&lat=" + that.position[0] + "&lng=" + that.position[1] + "'> " + ong.attributes.GNO + "</a><span>2</span></li>");
                                } else {
                                    $(".ong_list").append("<li class='ong_name'><a href='#'> " + ong.attributes.GNO + "</a></li>");
                                }
                            });
                            $(".country_info_window").css("top", that.click_position.y - 280);
                            $(".country_info_window").css("left", that.click_position.x - 130);
                            $(".country_name").text(data.country);
                            $(".country_info_window").fadeIn(200);
                        });
                    });
                    vis.getNativeMap().on("move", function (e) { 
                        if (that.position !== null) {
                            var p = vis.getNativeMap().latLngToContainerPoint(new L.LatLng(that.position[0], that.position[1]));
                            $(".country_info_window").css({"top": p.y - 280, "left": p.x - 130});
                        }
                    });
                });
        }
    };

    YourCommitment.Query = function () {
        Parse.initialize("PM0jwmEJo3cgKtMMmuYPc1Qtrlvuso8JodvtdMxg", "QsBj7lnBh0eiOLxgtYNOGZ7PJzjAsKZQpBAhIc2p");
    };

    YourCommitment.Query.prototype = {

        query : function (table, country, callback) {
                var query = new Parse.Query(table);
                query.equalTo("country", country);
                query.find({
                    success: function (results) {
                        callback(results);
                    },
                    error: function (error) {
                        console.log("Error: " + error.code + " " + error.message);
                    }
                });
            }
    };
}());

function init() {
    var yourcommitment = new YourCommitment.Main();
    yourcommitment.show();
}

window.onLoad = init();
