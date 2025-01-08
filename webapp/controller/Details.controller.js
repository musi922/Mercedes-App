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
            
            var oProduct = aProducts.find(function(product) {
                return product.ProductId === sProductId;
            });

            if (oProduct) {
                var oViewModel = this.getView().getModel("details");
                oViewModel.setData(oProduct);
                
                var aCategoryProducts = aProducts.filter(function(product) {
                    return product.Category === oProduct.Category;
                });
                
                var oTabContainer = this.byId("productTabContainer");
                oTabContainer.removeAllItems();
                
                aCategoryProducts.forEach(function(product) {
                    oTabContainer.addItem(new TabContainerItem({
                        name: product.Name,
                        key: product.ProductId,  
                        selected: product.ProductId === sProductId 
                    }));
                });
                
            } else {
                MessageBox.error("Product not found");
            }
        },

        onTabSelect: function(oEvent) {
            var sSelectedProductId = oEvent.getParameter("key");
            
            this.getRouter().navTo("details", {
                ProductId: sSelectedProductId
            }, false); 
        },
        onAddToCart(){
            this.byId("addToCart").open();
        },
        onCancelDialog(){
            this.byId("addToCart").close();
        },
        onConfirmAddToCart(){
            let oCartModel = this.getOwnerComponent().getModel("cart");
            let oDetailsModel = this.getView().getModel("details");
            let oProductsModel = this.getOwnerComponent().getModel("products");

            let currentProduct = oDetailsModel.getData();
            let cartItems = oCartModel.getProperty("/cartItems");

            cartItems.push(currentProduct);
            oCartModel.setProperty("/cartItems", cartItems);

            let products = oProductsModel.getProperty("/ProductCollection");
            let index = products.findIndex(product => product.ProductId === currentProduct.ProductId);
            if (index !== -1) {
                products.splice(index, 1);
                oProductsModel.setProperty("/ProductCollection", products);
            }

            this.byId("addToCart").close();
            MessageBox.success("Product added to cart");
            this.getRouter().navTo("cart");
        }
    });
});