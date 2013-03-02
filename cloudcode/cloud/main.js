Parse.Cloud.afterSave("Donation", function(request) {
  query = new Parse.Query("Donation");

  console.log("ANTES");
  console.log(request.object);
  console.log(request.object.id);

  query.get(request.object.id, {
    success: function(post) {
    	console.log("DENTRO");
    	console.log(post);

    	project = new Parse.Query("Proyect");

    	console.log(project);

    	// project.set("donations", 6);
    	// project.set("donations", project.get("donations") + request.object.get("amount"));
      	// project.save();
    },
    error: function(error) {
      throw "Got an error " + error.code + " : " + error.message;
    }
  });
});