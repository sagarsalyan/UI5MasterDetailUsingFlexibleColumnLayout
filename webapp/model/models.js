sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		createAppViewModel: function () {
			var oModel = new JSONModel();
			return oModel;
		},
		createProductModel: function () {
			var oProductsModel;
			var sPath = jQuery.sap.getModulePath("app.MasterDetailUsingFlexibleColumnLayout", "/model/mockData.json");
			// var sPath = sap.ui.require.toUrl('app/MasterDetailUsingFlexibleColumnLayout/model/mockData.json')
			oProductsModel = new JSONModel(sPath);
			oProductsModel.setSizeLimit(1000);
			return oProductsModel;
		}

	};
});