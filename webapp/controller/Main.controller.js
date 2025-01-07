sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("mercedsapp.controller.Main", {
		onInit(){
			var oModel = new sap.ui.model.json.JSONModel("mockdata/products.json");
			this.getView().setModel(oModel,"products");
		},
		onProductPress(oEvent){
			let oContext = oEvent.getSource().getBindingContext("products");
			let oProductId = oContext.getProperty("ProductId");
			this.getRouter().navTo("details",{
			id: oProductId
		})

		}
		
	});
});
