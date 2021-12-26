AFRAME.registerComponent("create-markers", {
  
    init: async function() {
  
      var mainScene = document.querySelector("#main-scene");
  
      //get the dishes collection from firestore database
      var trucks = await this.gettrucks();
     
      T01.map(trucks => {
        var marker = document.createElement("a-marker");   
        marker.setAttribute("id", trucks.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", trucks.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
  
        //set the markerhandler component
        marker.setAttribute("markerhandler", {});
        mainScene.appendChild(marker);
  
      var todaysDate = new Date();
      var todaysDay = todaysDate.getDay();
      var days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
      ];

        // Adding 3D model to scene
        var model = document.createElement("a-entity");    
       
        model.setAttribute("id", `model-${trucks.id}`);
        model.setAttribute("position", trucks.model_geometry.position);
        model.setAttribute("rotation", trucks.model_geometry.rotation);
        model.setAttribute("scale", trucks.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${trucks.model_url})`);
        model.setAttribute("gesture-handler", {});
        marker.appendChild(model);
  
        // Ingredients Container
        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${trucks.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 1.7);
        mainPlane.setAttribute("height", 1.5);
        marker.appendChild(mainPlane);
  
        // Dish title background plane
        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${trucks.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 0.89, z: 0.02 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width", 1.69);
        titlePlane.setAttribute("height", 0.3);
        titlePlane.setAttribute("material", { color: "#F0C30F" });
        mainPlane.appendChild(titlePlane);
  
        // Dish title
        var dishTitle = document.createElement("a-entity");
        dishTitle.setAttribute("id", `dish-title-${trucks.id}`);
        dishTitle.setAttribute("position", { x: 0, y: 0, z: 0.1 });
        dishTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        dishTitle.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 1.8,
          height: 1,
          align: "center",
          value: trucks.trucks_name.toUpperCase()
        });
        titlePlane.appendChild(trucksTitle);
  
        // Ingredients List
        var truck = document.createElement("a-entity");
        truck.setAttribute("id", `ingredients-${dish.id}`);
        truck.setAttribute("position", { x: 0.3, y: 0, z: 0.1 });
        truck.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        truck.setAttribute("text", {
          font: "monoid",
          color: "black",
          width: 2,
          align: "left",
          value: `${trucks.truck.join("\n\n")}`
        });
        mainPlane.appendChild(truck);
  
          var pricePlane = document.createElement("a-image")
          pricePlane.setAttribute("id", `price-plane-${trucks.id}`);
          pricePlane.setAttribute("src","https://raw.githubusercontent.com/whitehatjr/menu-card-app/main/black-circle.png")
          pricePlane.setAttribute("width",0.8)
          pricePlane.setAttribute("height",0.5)
          pricePlane.setAttribute("position", { x: -1.3, y: 0, z: 0.1 });
          pricePlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
  
          var price = document.createElement("a-entity");
        price.setAttribute("id", `price-${trucks.id}`);
        price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
        price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        price.setAttribute("text", {
          font: "monoid",
          color: "white",
          width: 2,
          align: "center",
          value: "6"
        });
        pricePlane.appendChild(price);
        marker.appendChild(pricePlane);
      });
      var pricePlane = document.createElement("a-image");
      pricePlane.setAttribute("id", `price-plane-${trucks.id}`);
      pricePlane.setAttribute(
        //dont know what link to fill
      );
      
      var price = document.createElement("a-entity");
        price.setAttribute("id", `price-${trucks.id}`);
        price.setAttribute("position", { x: 0.03, y: 0.05, z: 0.1 });
        price.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        price.setAttribute("text", {
          font: "mozillavr",
          color: "white",
          width: 3,
          align: "center",
          value: `Only\n $${trucks.price}`
        });

        pricePlane.appendChild(price);
        marker.appendChild(pricePlane);

    },


    

    //function to get the dishes collection from firestore database
    getTrucks: async function() {
      return await firebase
        .firestore()
        .collection("trucks")
        .get()
        .then(snap => {
          return snap.docs.map(doc => doc.data());
        });
    }
  });
  