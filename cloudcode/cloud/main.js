Parse.Cloud.afterSave("Donation", function(request, response) {
  query = new Parse.Query("Donation");

  console.log("ANTES");
  console.log(request.object);
  console.log(request.object.id);

  query.get(request.object.id, {
    success: function(post) {

      var projectQuery = new Parse.Query("Proyect");
      projectQuery.equalTo("objectId", post.get("proyectId"));

          projectQuery.find({
            success: function(project){

              var amount = project[0].get("amount");
              project.set("amount", amount);
              project.save();
            }
          });
    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
    }
  });
});