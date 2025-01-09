
sap.ui.define(["./BaseController", "sap/m/MessageBox",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v4/ODataModel",
], function (BaseController, MessageBox,JSONModel, ODataModel) {
	"use strict";

	return BaseController.extend("mercedsapp.controller.Main", {
		onInit: function () {
            const oModel = new ODataModel({
                serviceUrl: "http://localhost:4000/odata/",
                synchronizationMode: "None"
            });
            this.getView().setModel(oModel,"products");
			console.log(oModel);
			

            oModel.bindContext("/Products").requestObject()
                .then((oData) => {
                    console.log("OData Response:", oData);					
					
                })
                .catch((oError) => {
                    console.error("Error fetching OData:", oError);
                    MessageBox.error("Failed to load Products data.");
                });
        },
		onProductPress(oEvent){
			let oContext = oEvent.getSource().getBindingContext("products");
			let oProductId = oContext.getProperty("ProductId");
			this.getRouter().navTo("details",{
			ProductId: oProductId
		})

		},
		OnNavigateToCart(){
			this.getRouter().navTo("cart");
		}
		
	});
});
