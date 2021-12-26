AFRAME.registerComponent("markerhandler", {
  init: async function () {
    //still completing
    var truck = await this.getTrucks();

    this.el.addEventListener("markerFound", () => {
      console.log("marker is found")
      this.handleMarkerFound();
    });

    this.el.addEventListener("markerLost", () => {
      console.log("marker is lost")
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var orderButton = document.getElementById("order-button");
    var orderSummaryButtton = document.getElementById("order-summary-button");

    // Handling Click Events
    orderButton.addEventListener("click", function () {
      swal({
        icon: "warning",
        title: "Order Toy",
        text: "Thank you for ordering!!!"
      });
    });

    orderSummaryButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "work in progress!!!",
        text: "Your order will be served soon"
      });
    });
  },

  handleMarkerLost: function () {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  },

getTrucks: async function () {
  return await firebase
    .firestore()
    .collection("trucks")
    .get()
    .then(snap => {
      return snap.docs.map(doc => doc.data());
    });
},

getTrucks: async

});