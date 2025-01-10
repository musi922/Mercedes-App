sap.ui.define([
    "./BaseController", 
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v4/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/odata/OperationMode"
], function (BaseController, MessageBox, JSONModel, ODataModel, Filter, FilterOperator, OperationMode) {
    "use strict";

    return BaseController.extend("mercedsapp.controller.Main", {
        onInit: function () {
            const oModel = new ODataModel({
                serviceUrl: "http://localhost:4000/odata/",
                synchronizationMode: "None",
                operationMode: OperationMode.Server
            });
            this.getView().setModel(oModel, "products");
            
            // Apply initial filter
            this._applyProductFilter();

            // Add router event handler
            this.getRouter().getRoute("main").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function() {
            // Refresh the product list when navigating back to main page
            this._applyProductFilter();
        },

        _applyProductFilter: async function() {
            try {
                const oList = this.byId("idProductsTable");
                const oBinding = oList.getBinding("items");
                
                if (oBinding) {
                    const oFilter = new Filter("isInCart", FilterOperator.EQ, false);
                    
                    // Refresh the binding before applying the filter
                    await oBinding.refresh();
                    await oBinding.filter([oFilter]);
                }
            } catch (error) {
                console.error("Error applying filter:", error);
                MessageBox.error("Failed to filter products");
            }
        },

        onProductPress: function(oEvent) {
            let oContext = oEvent.getSource().getBindingContext("products");
            let oProductId = oContext.getProperty("ProductId");
            this.getRouter().navTo("details", {
                ProductId: oProductId
            });
        },

        OnNavigateToCart: function() {
            this.getRouter().navTo("cart");
        }
    });
});