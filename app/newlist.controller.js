
sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("app.newlist", {
		
		onInit : function () {
			var oNewlistModel = new myJSONModel;	
			
			//var oNewlistModel = new sap.ui.model.odata.v2.ODataModel( sServiceUrl: "http://192.168.0.102/fodder/listdata");//, mParameters{
				/*json: true, 
				tokenHandling: false,
				refreshAfterChange: false
			});*/
			

			//oNewlistModel.loadData("http://192.168.0.102/fodder/listdata", null, false);	
			oNewlistModel.loadData("../fodder/fodderdata", null, false);	
			
			var data = {shoppinglistitems: []};
			oNewlistModel.setData(data, true);
							
			this.getView().setModel(oNewlistModel);
			sap.ui.getCore().setModel(oNewlistModel, "IdNewlistModel"); 		


			var selectShop = sap.ui.getCore().byId("IdSelectShop");
			/*
			selectShop.addDelegate({
			  onAfterRendering: function() {
			  
				if (this.getFirstItem().getKey() !== '') {
				
					this.insertItem(new sap.ui.core.Item({
					  key: '',
					  text: '--Shop--'
					}), 0);
					this.setSelectedKey('');
				
				}
				
			  }
			}, selectShop);
				*/	
			selectShop.attachChange(function() {
				if (this.getFirstItem().getKey() === '') {
				  this.removeItem(0);
				}
				
				var selectedKey = this.getSelectedKey();
				var shopData = oNewlistModel.getProperty("/fodderdata/shops");
				var selectedShopId = shopData[selectedKey - 1].shopid;
				//var shopLocationData = oNewlistModel.getProperty("/listdata/shoplocation");
				
				var filter = new sap.ui.model.Filter({
					path     : "shopid", 
					operator : sap.ui.model.FilterOperator.EQ, 
					value1   : selectedShopId
				});
				
				var sLoc = sap.ui.getCore().byId("IdSelectShopLocation");
				var bindings = sLoc.getBinding("items")
				bindings.filter(filter, sap.ui.model.FilterType.Application);
				sLoc.setEnabled(true);
				
			});
			
			var itemSelectShopTemplate = new sap.ui.core.Item({  
				key : "{shopid}",  
				text : "{name}"  
			});
					
			selectShop.setModel(oNewlistModel);
			selectShop.bindAggregation("items", "/fodderdata/shops", itemSelectShopTemplate); 

			
			var selectShopLocation = sap.ui.getCore().byId("IdSelectShopLocation");
			selectShopLocation.setEnabled(false);
			selectShopLocation.setAutoAdjustWidth(true);
			selectShopLocation.setSelectedKey('');
			
			/*
			selectShopLocation.addDelegate({
			  onAfterRendering: function() {
			  
				if (this.getFirstItem().getKey() !== '') {
				
					this.insertItem(new sap.ui.core.Item({
					  key: '',
					  text: '--Location--'
					}), 0);
					this.setSelectedKey('');
			
				}
				
			  }
			}, selectShopLocation);
					*/
					
			/*
			selectShopLocation.attachChange(function() {
				if (this.getFirstItem().getKey() === '') {
				  this.removeItem(0);
				}

			});
			*/
			
			/*
			selectShopLocation.addDelegate({
			  onAfterRendering: function() {	  
					this.setSelectedKey('');
			  }
			}, selectShop);
*/

			var itemSelectShopLocationTemplate = new sap.ui.core.Item({  
				key : "{shoplocationid}",  
				text : "{location}"
				//forceSelection: false
			});
					
			selectShopLocation.setModel(oNewlistModel);
			selectShopLocation.bindAggregation("items","/fodderdata/shoplocation",itemSelectShopLocationTemplate); 
			
			
		
        },
		
		onBackButtonPress : function (OEvent) {
			var app = sap.ui.getCore().byId("idApp");
			app.back("idMainView");
		},
		
		onTestButtonPress : function (OEvent) {
			var oNewlistModel = sap.ui.getCore().getModel("IdNewlistModel");
			
			var dialog = new sap.m.Dialog("IdShoppingListAddDialog", {
                modal: true,
				afterClose: function(oControlEvent){
					sap.ui.getCore().getElementById('IdShoppingListAddDialog').destroy();
				}
			});
			
			dialog.setTitle("Add shopping item");
						
			var oGridForm = new sap.ui.layout.Grid({
				hSpacing: 1,
				vSpacing: 1
			});
			
			var brandLabel = new sap.m.Label("IdLabelBrand", {
				text: 'Brand: ',
				//labelFor: inputUserId,
				layoutData : new sap.ui.layout.GridData({
					span: "L3 M3 S3"
				})
			});
			
			var brandSelect = new sap.m.Select("IdSelectBrand", {
				tooltip: 'Brand',
				width: '200px',
				required: true,
				layoutData : new sap.ui.layout.GridData({
					span: "L7 M7 S7"
				})
			});
						
			var brandSelectTemplate = new sap.ui.core.Item({  
				key : "{brandid}",  
				text : "{name}"  
			});
					
			brandSelect.setModel(oNewlistModel);
			brandSelect.bindAggregation("items", "/fodderdata/itembrand", brandSelectTemplate); 
			
			var typeLabel = new sap.m.Label("IdLabelItemType", {
				text: 'Type: ',
				layoutData : new sap.ui.layout.GridData({
					span: "L3 M3 S3",
					linebreakL: true,
					linebreakM: true,
					linebreakS: true
				})
			});
			
			var typeSelect = new sap.m.Select("IdSelectItemType", {
				tooltip: 'Item type',
				width: '200px',
				required: true,
				layoutData : new sap.ui.layout.GridData({
					span: "L7 M7 S7"
				})
			});
			
			var selectTypeTemplate = new sap.ui.core.Item({  
				key : "{itemtypeid}",  
				text : "{name}"  
			});
					
			typeSelect.setModel(oNewlistModel);
			typeSelect.bindAggregation("items", "/fodderdata/itemtype", selectTypeTemplate); 
			
			var priceLabel = new sap.m.Label("IdLabelItemPrice", {
				text: 'Price: ',
				layoutData : new sap.ui.layout.GridData({
					span: "L3 M3 S3",
					linebreakL: true,
					linebreakM: true,
					linebreakS: true
				})
			});
			
			var priceInput = new sap.m.Input("IdInputItemPrice", {
				tooltip: 'Price',
				width: '200px',
				type: sap.m.InputType.Number,
				required: true,
				layoutData : new sap.ui.layout.GridData({
					span: "L7 M7 S7"
				})
			});
			
			var priceKgLabel = new sap.m.Label("IdLabelItemPriceKg", {
				text: 'Price pr.Kg: ',
				layoutData : new sap.ui.layout.GridData({
					span: "L3 M3 S3",
					linebreakL: true,
					linebreakM: true,
					linebreakS: true
				})
			});
			
			var priceKgInput = new sap.m.Input("IdInputItemPriceKg", {
				tooltip: 'Price pr.Kg',
				width: '200px',
				type: sap.m.InputType.Number,
				required: true,
				layoutData : new sap.ui.layout.GridData({
					span: "L7 M7 S7"
				})
			});
			
			brandSelect.attachChange(function() {
				var selectedKey = this.getSelectedKey();
				var brandData = oNewlistModel.getProperty("/fodderdata/itembrand");
				var selectedBrandId = brandData[selectedKey - 1].brandid;
				
				var filter = new sap.ui.model.Filter({
					path     : "brandid", 
					operator : sap.ui.model.FilterOperator.EQ, 
					value1   : selectedBrandId
				});
				
				var bindings = typeSelect.getBinding("items")
				bindings.filter(filter, sap.ui.model.FilterType.Application);
				
			});
				
			oGridForm.addContent(brandLabel);
			oGridForm.addContent(brandSelect);
			oGridForm.addContent(typeLabel);
			oGridForm.addContent(typeSelect);
			oGridForm.addContent(priceLabel);
			oGridForm.addContent(priceInput);
			oGridForm.addContent(priceKgLabel);
			oGridForm.addContent(priceKgInput);
			
			dialog.addContent(oGridForm);
			
			dialog.addButton(new sap.m.Button({text: "Ok", type: sap.m.ButtonType.Accept, press: function(){
				
					var itemBrand = sap.ui.getCore().byId("IdSelectBrand").getSelectedKey();
					var itemBrandName = sap.ui.getCore().byId("IdSelectBrand").getSelectedItem().getText();
					var itemType = sap.ui.getCore().byId("IdSelectItemType").getSelectedKey();
					var itemTypeName = sap.ui.getCore().byId("IdSelectItemType").getSelectedItem().getText();
					var itemPrice = sap.ui.getCore().byId("IdInputItemPrice").getValue();
					var itemPriceKg = sap.ui.getCore().byId("IdInputItemPriceKg").getValue();
					
					/*
					var shoppingListItem = {shoppinglistitems: [{
													brandid: itemBrand,
													brandname: itemBrandName,
													itemtypeid: itemType,
													itemtypename: itemTypeName,
													price: itemPrice,
													pricekg: itemPriceKg
												}]							
											};
					*/
					
					var shoppingListItem = {
								brandid: itemBrand,
								brandname: itemBrandName,
								itemtypeid: itemType,
								itemtypename: itemTypeName,
								price: itemPrice,
								pricekg: itemPriceKg
										
					};
					
					if (shoppingListItem.price === '')
						shoppingListItem.price = "0";
						
					if (shoppingListItem.pricekg === '')
						shoppingListItem.pricekg = "0";

					var data = oNewlistModel.getData();
					data.shoppinglistitems.push(shoppingListItem);
					oNewlistModel.setData(data);
					
					dialog.close();

				}
			}));
			
			dialog.addButton(new sap.m.Button({text: "Cancel", type: sap.m.ButtonType.Reject, press: function(){
					dialog.close();
				}
			}));
			
			dialog.open();
			
		},
		
		onSaveButtonPress : function (OEvent) {

			var oNewlistModel = sap.ui.getCore().getModel("IdNewlistModel");
			var data = oNewlistModel.getData();
			
			var selectShop = sap.ui.getCore().byId("IdSelectShop");
			var selectShopLocation = sap.ui.getCore().byId("IdSelectShopLocation");
			
			var listDatePicker = sap.ui.getCore().byId("IdListDatePicker");
			var listDate = listDatePicker.getValue();	
					
			var now     = new Date(); 
			var year    = now.getFullYear();
			var month   = now.getMonth()+1; 
			var day     = now.getDate();
			var hour    = now.getHours();
			var minute  = now.getMinutes();
			var second  = now.getSeconds(); 
			if(month.toString().length == 1) {
				var month = '0'+month;
			}
			if(day.toString().length == 1) {
				var day = '0'+day;
			}   
			if(hour.toString().length == 1) {
				var hour = '0'+hour;
			}
			if(minute.toString().length == 1) {
				var minute = '0'+minute;
			}
			if(second.toString().length == 1) {
				var second = '0'+second;
			}   
			
			var date = year + "-" + month + "-" + day;
			var time = hour + ":" + minute + ":" + second;
			
			
			var shoppingList = {
				listdate: listDate,
				listuser: 'Jan-Ingar',
				shopid: selectShop.getSelectedKey(),
				shoplocationid: selectShopLocation.getSelectedKey(),
				created: date,
				createdtime: time
			};
			
			oNewlistModel.loadDataNew("../fodder/shoppinglist", listhandleSuccess, listhandleError, shoppingList, true, 'POST', true);
			
			function listhandleSuccess(result){
			
				data.shoppinglistitems.forEach( function (arrayItem){
					
					var shoppingListItem = {
						shoppinglistid: result.insertId,
						brandid: arrayItem.brandid,
						itemtypeid: arrayItem.itemtypeid,
						price: arrayItem.price,
						pricekg: arrayItem.pricekg						
					};
					
					oNewlistModel.loadDataNew("../fodder/shoppinglistitems", handleItemSuccess, handleItemError, shoppingListItem, true, 'POST', true);
				});
				
				function handleItemSuccess(result){
					//sap.ui.commons.MessageBox.alert(arguments[0].statusText);
				}
				
				function handleItemError(){
					//sap.ui.commons.MessageBox.alert(arguments[0].statusText);
				}
				
				delete data.shoppinglistitems;
				oNewlistModel.setData(data);
				
				selectShop.setSelectedKey('0');
				selectShopLocation.setSelectedKey('0');
				
			}
			
			function listhandleError(){
				sap.ui.commons.MessageBox.alert(arguments[0].statusText);
			}
			
			
			//delete data.shoppinglistitems;
			//oNewlistModel.setData(data);
		}
		
    });

});
