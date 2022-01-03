sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("app.MasterDetailUsingFlexibleColumnLayout.controller.DetailDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.DetailDetail
		 */
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();
			this.oRouter.getRoute("detaildetail").attachPatternMatched(this._onBrandMatched, this);
		},
		_onBrandMatched:function(oEvent){
			this._type = oEvent.getParameter("arguments").type || this._type || "0";
			this._brand = oEvent.getParameter("arguments").brand || this._brand || "0";
			this.getView().bindElement({
				path: "/ProductCollection/" + this._type + "/Companies/" + this._brand,
				model: "products"
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.DetailDetail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.DetailDetail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.DetailDetail
		 */
		//	onExit: function() {
		//
		//	}

	});

});