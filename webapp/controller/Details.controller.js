sap.ui.define([
    "./BaseController", 
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function (BaseController, MessageBox, JSONModel) {
    "use strict";

    return BaseController.extend("mercedsapp.controller.Details", {
        onInit: function() {
            var oViewModel = new JSONModel({});
            this.getView().setModel(oViewModel, "details");
            
            this.getRouter().getRoute("details").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            var oArguments = oEvent.getParameter("arguments");
            var sProductId = oArguments.ProductId;
            var oProductsModel = this.getOwnerComponent().getModel("products");
            
            var aProducts = oProductsModel.getData().ProductCollection;
            
            var oProduct = aProducts.find(function(product) {
                return product.ProductId === sProductId;
            });

            if (oProduct) {
                var oViewModel = this.getView().getModel("details");
                oViewModel.setData(oProduct);
                oViewModel.refresh(true);
                
                console.log("Product found:", oProduct);
            } else {
                MessageBox.error("Product not found");
                console.log("Product not found for ID:", sProductId);
            }
        }
    });
});