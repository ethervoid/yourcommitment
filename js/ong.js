/*global L,Parse,cartodb,_ */
$.extend({
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var i = 0;
        for (i = 0; i < hashes.length; i += 1) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

function init() {
        var idONG = $.getUrlVar("ongId");
        var countryCode = $.getUrlVar("country");
        Parse.initialize("PM0jwmEJo3cgKtMMmuYPc1Qtrlvuso8JodvtdMxg", "QsBj7lnBh0eiOLxgtYNOGZ7PJzjAsKZQpBAhIc2p");
        if (idONG && countryCode) {
            var query = new Parse.Query("ONG");
            query.equalTo("objectId", idONG);
            query.find({
                success: function (results) {
                    var ong_attributes = results[0].attributes;
                    $('.logo_ong').html("<img src='" + ong_attributes.image.url + "' alt='" + ong_attributes.name + "'/>");
                    $('.ong .ongname').html("<h2>" + ong_attributes.name + "</h2>");
                    $('.ong .ongdescription .description').html(ong_attributes.description);
                    var queryProject = new Parse.Query("Proyect");
                    queryProject.equalTo("ONG", results[0]);
                    queryProject.equalTo("country_code", countryCode);
                    queryProject.find({
                        success: function (projects) {
                            _.each(projects, function (project) {
                                $('.contentProjects ul').html("<li><div class='name'>" + project.attributes.name + "</div><div class'description'>" + project.attributes.description + "</div><div class='donations'>" + project.attributes.amount + "</div><div class='budget'>" + project.attributes.totalAmount + "</div></li>"); 
                            });
                        }
                    });
                },
                error: function (error) {
                    console.log("Error: " + error.code + " " + error.message);
                }
            });
        } else {
            console.log("No data to search");
        }
    }

function upgradeONGs() {
    var query = new Parse.Query("ONG");
    query.find({
        success: function (ongs) {
            _.each(ongs, function (ong) {
                    var queryONG = new Parse.Query("ONGCountry");
                    queryONG.equalTo("GNO", ong.attributes.name);
                    queryONG.find({
                            success: function (gnocountries) {
                                _.each(gnocountries, function (ongcountry) {
                                        ongcountry.set("ONG", ong);
                                        ongcountry.save();
                    
                                    });
                            }
                        });
          
                });
        }
    });
}

window.onLoad = init();
