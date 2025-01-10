sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox",
    "sap/m/TabContainerItem",
    "sap/ui/model/odata/v4/ODataModel"
], function (BaseController, MessageBox, TabContainerItem, ODataModel) {
    "use strict";
    return BaseController.extend("mercedsapp.controller.Details", {
        onInit: function() {
            const oViewModel = new ODataModel({
                serviceUrl: "http://localhost:4000/odata/",
                synchronizationMode: "None"
            });
            
            this.getView().setModel(oViewModel);
            this.getRouter().getRoute("details").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: async function(oEvent) {
            try {
                const sProductId = oEvent.getParameter("arguments").ProductId;
                
                this.getView().bindElement({
                    path: `/Products('${sProductId}')`,
                });

                const oModel = this.getView().getModel();
                const oContext = oModel.bindList("/Products").getContexts();
                console.log(oContext);

              

            } catch (oError) {
                console.error("Error:", oError);
                MessageBox.error("Failed to load data");
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
            
        }
    });
});