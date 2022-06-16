sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
], function (Controller, JSONModel, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";

	return Controller.extend("app.MasterDetailUsingFlexibleColumnLayout.controller.Master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.Master
		 */
		onInit: function () {
			this.oView = this.getView();
			this._bDescendingSort = false;
			this.oProductsTable = this.oView.byId("productsTable");
			this.oRouter = this.getOwnerComponent().getRouter();
		},

		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Name", FilterOperator.Contains, sQuery)];
			}

			this.oProductsTable.getBinding("items").filter(oTableSearchState, "Application");
		},

		onAdd: function () {
			MessageBox.information("This functionality is not ready yet.", {
				title: "Aw, Snap!"
			});
		},

		onSort: function () {
			this._bDescendingSort = !this._bDescendingSort;
			var oBinding = this.oProductsTable.getBinding("items"),
				oSorter = new Sorter("Name", this._bDescendingSort);

			oBinding.sort(oSorter);
		},
		onListItemPress: function (oEvent) {
			this.getView().getParent().getParent().removeAllMidColumnPages();
			var typePath = oEvent.getSource().getBindingContext("products").getPath(),
				type = typePath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail", {
				layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
				type: type
			});
		},
		onDetail2: function (oEvent) {
			this.getView().getParent().getParent().removeAllMidColumnPages();
			this.oRouter.navTo("detail2", {
				layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded
			});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.Master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.Master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf app.MasterDetailUsingFlexibleColumnLayout.view.Master
		 */
		//	onExit: function() {
		//
		//	}

	});

});