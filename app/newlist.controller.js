
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
			
			//oNewlistModel.loadData({sURL: "http://192.168.0.102/fodder/listdata", bAsync: false});	
			oNewlistModel.loadData("http://192.168.0.102/fodder/listdata", null, false);	
			
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
				var shopData = oNewlistModel.getProperty("/listdata/shops");
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
			selectShop.bindAggregation("items", "/listdata/shops", itemSelectShopTemplate); 

			
			var selectShopLocation = sap.ui.getCore().byId("IdSelectShopLocation");
			selectShopLocation.setEnabled(false);
			selectShopLocation.setAutoAdjustWidth(true);
			
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
			selectShopLocation.bindAggregation("items","/listdata/shoplocation",itemSelectShopLocationTemplate); 
			
			
		
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
			brandSelect.bindAggregation("items", "/listdata/itembrand", brandSelectTemplate); 
			
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
			typeSelect.bindAggregation("items", "/listdata/itemtype", selectTypeTemplate); 
			
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
				//required: true,
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
				//required: true,
				layoutData : new sap.ui.layout.GridData({
					span: "L7 M7 S7"
				})
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
					
					//res.json({listdata : {itembrand : rows[0], itemtype : rows[1], shops : rows[2] , shoplocation : rows[3]}});
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
											
					//oNewlistModel.setData({ oData: shoppingListItem, bMerge: true });
					//oNewlistModel.setData(shoppingListItem, true);
					
					
					var data = oNewlistModel.getData();
					data.shoppinglistitems.push(shoppingListItem);
					//data = data.concat( shoppingListItem );
					//data = data.push( anotherElementToBeAdded );
					oNewlistModel.setData(data);
					
					
					dialog.close();
					/*
					model.create("/MyTestSet", contactEntry, {success: function (data) {
							jQuery.sap.require("sap.m.MessageBox");
							sap.m.MessageBox.show("Successfully added", {
								icon : sap.m.MessageBox.Icon.SUCCESS, 
								title : "Odata success",
								actions : sap.m.MessageBox.Action.OK,
								onClose : function() {
									    var diag = sap.ui.getCore().byId("add_dialog");
									    diag.close();
								    }
								}   
							);
						}, 
						error: function (err) {
							jQuery.sap.require("sap.m.MessageBox");
							sap.m.MessageBox.show(err.message + "\n" + err.statusCode + " " + err.statusText, {
								icon : sap.m.MessageBox.Icon.ERROR, 
								title : "Odata error",
								actions : sap.m.MessageBox.Action.OK,
								onClose : function() {
									    var diag = sap.ui.getCore().byId("add_dialog");
									    diag.close();
								    }
								}   
							);
						} 
					});
					*/
				}
			}));
			
			dialog.open();
			
			

			/*
			var contactEntry = {shoppinglist: {
										listdate: '2015-10-18',
										listuser: 'Jan-Ingar',
										shopid: "1"
									}
								};
								*/
								
			var contactEntry = {
				listdate: '2015-10-18',
				listuser: 'Jan-Ingar',
				shopid: "1"			
			};
			
			
			/*
			oNewlistModel.loadData({
				sURL: "http://192.168.0.102/fodder/shoppinglist",
				oParameters: contactEntry,
				sType: "POST",
				bMerge: true
			});*/
			
			/*
			oNewlistModel.loadDataNew({
				sURL: "http://192.168.0.102/fodder/shoppinglist",
				oParameters: contactEntry,
				sType: "POST",
				bMerge: true			
			});*/
			
			
			
			
			/*
			oNewlistModel.loadDataNew("http://192.168.0.102/fodder/shoppinglist", handleSuccess, handleError, contactEntry, true, 'POST');
			
			function handleSuccess(oData){}
			function handleError(){
				//sap.ui.commons.MessageBox.alert(arguments[0].statusText);
			}
			*/
			
		}
		
    });

});
