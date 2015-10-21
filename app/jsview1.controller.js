
sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("app.jsview1", {
		
		onInit : function () {
					
			//var oModel = new sap.ui.model.odata.v2.ODataModel( "http://localhost:8085/S03/opu/odata/SAP/Z_TEST_SRV" );
			
			//this.getView().setModel(oModel);
			
			//var app = this.getView();
			//sap.m.MessageToast.show(app.toString());
			
			//sap.ui.getCore().setModel(oModel, "ODATA_model"); 
						
        },
		
		onAddRowClick : function (OEvent) {
			
			var app = sap.ui.getCore().byId("idApp");
			app.to("idNewListView");
			
			
			/*
			var model = sap.ui.getCore().getModel("ODATA_model");
			
			var dialog = new sap.m.Dialog("add_dialog", {
                modal: true,
				afterClose: function(oControlEvent){
					sap.ui.getCore().getElementById('add_dialog').destroy();
				}
			});
			
			dialog.setTitle("Add Contact");
						
			var oGridForm = new sap.ui.layout.Grid({
				hSpacing: 1,
				vSpacing: 1, 	
				content: [
					new sap.m.Label("labelUserId", {
						text: 'User ID: ',
						//labelFor: inputUserId,
						layoutData : new sap.ui.layout.GridData({
							span: "L3 M3 S3"
						})
					}),
					new sap.m.Input("inputUserId", {
						tooltip: 'User Id',
						width: '200px',
						required: true,
						layoutData : new sap.ui.layout.GridData({
							span: "L7 M7 S7"
						})
					}),
					new sap.m.Label("labelContact", {
						text: 'Contact: ',
						layoutData : new sap.ui.layout.GridData({
							span: "L3 M3 S3",
							linebreakL: true,
							linebreakM: true,
							linebreakS: true
						})
					}),
					new sap.m.Input("textfieldContact", {
						tooltip: 'Contact',
						width: '200px',
						required: true,
						layoutData : new sap.ui.layout.GridData({
							span: "L7 M7 S7"
						})
					}),
					new sap.m.Label("labelContactText", {
						text: 'Contact text: ',
						layoutData : new sap.ui.layout.GridData({
							span: "L3 M3 S3",
							linebreakL: true,
							linebreakM: true,
							linebreakS: true
						})
					}),
					new sap.m.Input("textfieldContactText", {
						tooltip: 'Contact text',
						width: '200px',
						required: true,
						layoutData : new sap.ui.layout.GridData({
							span: "L7 M7 S7"
						})
					}),
					new sap.m.Label("labelPhone", {
						text: 'Phone: ',
						layoutData : new sap.ui.layout.GridData({
							span: "L3 M3 S3",
							linebreakL: true,
							linebreakM: true,
							linebreakS: true
						})
					}),
					new sap.m.Input("textfieldPhone", {
						tooltip: 'Phone',
						width: '200px',
						required: true,
						layoutData : new sap.ui.layout.GridData({
							span: "L7 M7 S7"
						})
					}),
					new sap.m.Label("labelEmail", {
						text: 'Email: ',
						layoutData : new sap.ui.layout.GridData({
							span: "L3 M3 S3",
							linebreakL: true,
							linebreakM: true,
							linebreakS: true
						})
					}),
					new sap.m.Input("textfieldEmail", {
						tooltip: 'Email',
						width: '200px',
						required: true,
						layoutData : new sap.ui.layout.GridData({
							span: "L7 M7 S7"
						})
					})
				]
			});
			
			dialog.addContent(oGridForm);
			
			dialog.addButton(new sap.m.Button({text: "Add", press: function(){
				
					var user_id = sap.ui.getCore().byId("inputUserId").getValue();
					var contact = sap.ui.getCore().byId("textfieldContact").getValue();
					var contact_txt = sap.ui.getCore().byId("textfieldContactText").getValue();
					var phone = sap.ui.getCore().byId("textfieldPhone").getValue();
					var email = sap.ui.getCore().byId("textfieldEmail").getValue();
					
					var contactEntry = {USER_ID: user_id,
										CONTACT: contact,
										CONTACT_TEXT: contact_txt,
										PHONE: phone,
										EMAIL: email};
				
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
				}
			}));
			
			dialog.open();    
			*/

		},
		
		onLoadClick : function () {
			/*jQuery.sap.require("jquery.sap.storage");  
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			var model = sap.ui.getCore().getModel("name_model");
			
			var oData = oStorage.get("localData"); 
			if ( oData.length > 0 ) {
				model.setData(oData); 
			}*/
		},
		
		onSaveClick : function () {	
			/*jQuery.sap.require("jquery.sap.storage");  
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local);  
			var model = sap.ui.getCore().getModel("name_model");
			
			//if (model.oData[0] != null) {
			if ( model.oData.length > 0 ) {
				oStorage.put("localData", model.oData); 
			}*/
			
		},
		
		onDeleteClick : function () {
			/*jQuery.sap.require("jquery.sap.storage");  
			var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); 
			var model = sap.ui.getCore().getModel("name_model");
			
			var oData = [];
			model.setData(oData); 
			oStorage.clear();*/
			
			/*
			var oData = {
				ProductId: 999,
				ProductName: "myProductUpdated"
			}
			
			oModel.update("/Products(999)", oData, {success: mySuccessHandler, error: myErrorHandler});
			*/
		}
		
    });

});
