sap.ui.define([
    "./BaseController", 
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/m/TabContainerItem"
], function (BaseController, MessageBox, JSONModel, TabContainerItem) {
    "use strict";
    return BaseController.extend("mercedsapp.controller.Details", {
        onInit: function() {
            var oViewModel = new JSONModel({});
            this.getView().setModel(oViewModel, "details");
            
            this.getRouter().getRoute("details").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent) {
            var sProductId = oEvent.getParameter("arguments").ProductId;
            var oProductsModel = this.getOwnerComponent().getModel("products");
            var aProducts = oProductsModel.getData().ProductCollection;
            
            // Find the clicked product
            var oProduct = aProducts.find(function(product) {
                return product.ProductId === sProductId;
            });

            if (oProduct) {
                var oViewModel = this.getView().getModel("details");
                oViewModel.setData(oProduct);
                
                // Get all products with same category
                var aCategoryProducts = aProducts.filter(function(product) {
                    return product.Category === oProduct.Category;
                });
                
                // Get the TabContainer and clear existing items
                var oTabContainer = this.byId("productTabContainer");
                oTabContainer.removeAllItems();
                
                // Add new tabs for each product in category with their ProductId
                aCategoryProducts.forEach(function(product) {
                    oTabContainer.addItem(new TabContainerItem({
                        name: product.Name,
                        key: product.ProductId,  // Add key for identification
                        selected: product.ProductId === sProductId  // Select current product
                    }));
                });
                
            } else {
                MessageBox.error("Product not found");
            }
        },

        onTabSelect: function(oEvent) {
            var sSelectedProductId = oEvent.getParameter("key");
            
            // Navigate to the selected product
            this.getRouter().navTo("details", {
                ProductId: sSelectedProductId
            }, false); 
        }
    });
});