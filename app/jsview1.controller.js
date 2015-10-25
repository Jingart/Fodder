
sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("app.jsview1", {
		
		onInit : function () {
		
			var oNewlistModel = new myJSONModel;		
			oNewlistModel.loadData("../fodder/listdata", null, false);			
			this.getView().setModel(oNewlistModel);
			
			var modelData = oNewlistModel.getData();	
			var displaydata = {shoppinglistdisplay: []};
			
			modelData.listdata.shoppinglist.forEach( function (arrayItem){
				var shopname = modelData.listdata.shops[arrayItem.shopid - 1].name;
				var shoploc = modelData.listdata.shoplocation[arrayItem.shoplocationid - 1].location;
				
				var listSum = 0;
				modelData.listdata.shoppinglistitems.forEach( function (arrayListItem){
					if(arrayListItem.shoppinglistid == arrayItem.shoppinglistid)
						listSum = listSum + parseFloat(arrayListItem.price);
				});
									
				var displayDataItem = {
					shop: shopname + " " + shoploc,
					date: arrayItem.listdate.substring(0, 10),
					sum: parseFloat(listSum).toFixed(2)			 				
				};
				
				displaydata.shoppinglistdisplay.push(displayDataItem);
	
			});
			
			oNewlistModel.setData(displaydata, true);		
			sap.ui.getCore().setModel(oNewlistModel, "IdMainlistModel"); 
						
        },
		
		onAddRowClick : function (OEvent) {	
			var app = sap.ui.getCore().byId("idApp");
			app.to("idNewListView");
			
		},
		
		onSettingsClick : function (OEvent) {
		
		}
		
    });

});
