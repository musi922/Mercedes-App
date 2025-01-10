sap.ui.define([
    "./BaseController", 
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v4/ODataModel"
], function (BaseController, MessageBox, JSONModel, ODataModel) {
    "use strict";
    return BaseController.extend("mercedsapp.controller.Cart", {
        onInit: function() {
            const oModel = new ODataModel({
                serviceUrl: "http://localhost:4000/odata/",
                synchronizationMode: "None"
            });
            
            this.getView().setModel(oModel);
            
            const oCartModel = new JSONModel({
                cartItems: []
            });
            this.getView().setModel(oCartModel, "cart");
            
            this._loadCartItems();
        },

        _loadCartItems: async function() {
            try {
                const oModel = this.getView().getModel();
                
                const oContext = await oModel.bindList("/getCartItems").requestContexts();
                
                const aCartItems = oContext.map(oContext => oContext.getObject());
                console.log(aCartItems);

                const oCartModel = this.getView().getModel("cart");
                oCartModel.setProperty("/getCartItems", aCartItems);
                
            } catch (error) {
                MessageBox.error("Failed to load cart items");
                console.error(error);
            }
        },
        handleDelete(oEvent) {
            
        },

        onNavBack: function() {
            this.getRouter().navTo("main");
        }
	});

})
