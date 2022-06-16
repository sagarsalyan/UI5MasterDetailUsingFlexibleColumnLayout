sap.ui.define([
	"sap/ui/core/mvc/Controller",
		'sap/f/library'
], function (Controller,fioriLibrary) {
	"use strict";

	return Controller.extend("app.MasterDetailUsingFlexibleColumnLayout.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.Detail
		 */
		onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("master").attachPatternMatched(this._onTypeMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onTypeMatched, this);
			this.oRouter.getRoute("detaildetail").attachPatternMatched(this._onTypeMatched, this);
		},

		_onTypeMatched: function (oEvent) {
			this._type = oEvent.getParameter("arguments").type || this._type || "0";
			this.getView().bindElement({
				path: "/ProductCollection/" + this._type,
				model: "products"
			});
		},

		onEditToggleButtonPress: function() {
			var oObjectPage = this.getView().byId("ObjectPageLayout"),
				bCurrentShowFooterState = oObjectPage.getShowFooter();

			oObjectPage.setShowFooter(!bCurrentShowFooterState);
		},
		onListItemPress:function(oEvent){
			var brandPath = oEvent.getSource().getBindingContext("products").getPath(),
				brand = brandPath.split("/").slice(-1).pop();
			this.oRouter.navTo("detaildetail", {
				layout: fioriLibrary.LayoutType.ThreeColumnsMidExpanded,
				type:this._type,
				brand:brand,
			});
		},

		onExit: function () {
			this.oRouter.getRoute("master").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.Detail
		 */
		//	onExit: function() {
		//
		//	}

	});

});