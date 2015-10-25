
sap.ui.jsview("app.jsview1", {  

 getControllerName : function() {  
	return "app.jsview1";  
 },  
 
 createContent : function(oController, oModel) {  
	
	var page = new sap.m.Page("IdMainPage", {
		title : "Fodder main"
	});
	
	var bar = new sap.m.Bar({
		contentLeft: [ new sap.m.Button('ButtonAddRow', {icon : "sap-icon://cart-full", 
														 //width : "200%",
													     press : [oController.onAddRowClick, oController] })]
												 
		/*contentMiddle: [ new sap.m.Button('ButtonLoad', {icon : "sap-icon://action", 
														 press : oController.onLoadClick }),
											   
					     new sap.m.Button('ButtonSave', {icon : "sap-icon://save",
														 press : oController.onSaveClick }),
						 
						 new sap.m.Button('ButtonDelete', {icon : "sap-icon://delete",
														   press : oController.onDeleteClick })]*/
	});
			
	page.addContent(bar);
	
	/*
	var oTable = new sap.m.Table("contact_table", {
        inset: true,
        columns: [
			new sap.m.Column({ header: new sap.m.Label({ text: "USER_ID" }) }),
            new sap.m.Column({ header: new sap.m.Label({ text: "CONTACT" }) })
        ]//,
		//mode : sap.m.ListMode.SingleSelectMaster
    });
	
	var template = new sap.m.ColumnListItem({
		cells: [
				new sap.m.Label({ text: "{USER_ID}" }),
				new sap.m.Label({ text: "{CONTACT}" })
		]
	});
	
	template.setType(sap.m.ListType.Active);
	
	template.attachPress(function(oEvent){
		var c = this.getBindingContext();
		var i = c.getObject();
		sap.m.MessageToast.show("jhgf");
	});
	
	
	oTable.bindAggregation("items", {
        path: "/MyTestSet",
        template: template
    });
	
	page.addContent(oTable);
	*/
	return page;

 }  
   
});  