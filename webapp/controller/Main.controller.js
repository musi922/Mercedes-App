sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("mercedsapp.controller.Main", {
		onInit(){
			var oModel = this.getOwnerComponent().getModel("products");
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
