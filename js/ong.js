$.extend({
  getUrlVars: function (){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});


function init(){
      var idONG = $.getUrlVar("ongId");
      var countryCode = $.getUrlVar("country");
      //  "6PD8MR6xC4";
      //  "LYB";

      Parse.initialize("PM0jwmEJo3cgKtMMmuYPc1Qtrlvuso8JodvtdMxg", "QsBj7lnBh0eiOLxgtYNOGZ7PJzjAsKZQpBAhIc2p");
    

      if(idONG && countryCode){
    
        var query = new Parse.Query("ONG");
        query.equalTo("objectId", idONG);
        query.find({
          success: function(results) {
          
            console.log(results);
             _.each(results, function(ong){
              var atributos = results[0].attributes;
              $('.logo').html("<img src='"+atributos.image.url+"' alt='"+atributos.name+"'/>");              
              $('.ong .ongname').html(atributos.name);
              $('.ong .ongdescription').html(atributos.description);

              
               var queryProject = new Parse.Query("Proyect");

               queryProject.equalTo("ONG",results[0]);
               queryProject.equalTo("country_code",countryCode);

               
               queryProject.find({
                  success: function(projects) {
                    _.each(projects,function(project){
                      $('.projects .name').html(project.attributes.name);
                      $('.projects .description').html(project.attributes.description);
                      $('.projects .budget').html(project.attributes.amount);
                      $('.projects .donations').html(project.attributes.donations);
                      console.log(ong.attributes.name,project.attributes.description);
                    });
                  }
               });
            });
          },
          error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
          }
      });
      }else{
        alert("No data to search");
      }

  }

  function upgradeONGs(){
    var query = new Parse.Query("ONG");
    query.find({
      success: function(ongs){
        _.each(ongs, function(ong){
          var queryONG = new Parse.Query("ONGCountry");
          queryONG.equalTo("GNO", ong.attributes.name);
          queryONG.find({
            success: function(gnocountries){
                _.each(gnocountries, function(ongcountry){
                    ongcountry.set("ONG", ong);
                    ongcountry.save();                  
                    
                });
            }
          });
          
        });
      }
    });
  }
