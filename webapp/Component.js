sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"app/MasterDetailUsingFlexibleColumnLayout/model/models",
	'sap/ui/model/json/JSONModel',
	'sap/f/library'
], function (UIComponent, Device, models, JSONModel,fioriLibrary) {
	"use strict";

	return UIComponent.extend("app.MasterDetailUsingFlexibleColumnLayout.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			debugger
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			this.setModel(models.createAppViewModel(), "appView");

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			// set the product model for data
			this.setModel(models.createProductModel(), 'products');
			
			// enable routing
			this.getRouter().attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			this.getRouter().initialize();

			
		},
		_onBeforeRouteMatched: function (oEvent) {
			var oModel = this.getModel("appView"),
				sLayout = oEvent.getParameters().arguments.layout;

			// If there is no layout parameter, set a default layout (normally OneColumn)
			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}

			oModel.setProperty("/layout", sLayout);
		}
	});
});