
sap.ui.jsview("app.newlist", {  

 getControllerName : function() {  
	return "app.newlist";  
 },  
 
 createContent : function(oController, oModel) {  
	
	var page = new sap.m.Page("IdNewListPage", {
		title : "New shoppinglist",
		showNavButton : true,
		navButtonPress : [oController.onBackButtonPress, oController]
	});
	
	page.addHeaderContent(new sap.m.Button({
		tooltip: "asdf",
		icon:"sap-icon://accept",
		press:[oController.onSaveButtonPress, oController]
	}));
	
	
	/*var button = new sap.m.Button({  
                              text: "Disable input",  
                              press: function(){ // Create a function as a method of controller  
                                               input.setEnabled(false);  
                                               // or  
                                              // sap.ui.getCore().byId('inputControl').setEnabled(false);  
                                              
                                        }  
                        });*/
						
	var simpleForm = new sap.ui.layout.form.SimpleForm();
	page.addContent(simpleForm);
	
	var selectShop = new sap.m.Select({ 
		id: "IdSelectShop",
		autoAdjustWidth: true
	});  
	
	simpleForm.addContent(selectShop);		
	
	var selectShopLocation = new sap.m.Select({id: "IdSelectShopLocation"});  
	simpleForm.addContent(selectShopLocation);	

	var listDatePicker = new sap.m.DatePicker("IdListDatePicker", {
		//tooltip: 'Shoppinglist date',
		//width: '200px',
		//type: sap.m.InputType.Date,
		//required: true
		valueFormat: "yyyy-MM-dd"
	});
	
	simpleForm.addContent(listDatePicker);	

	
	
	var oTable = new sap.m.Table("IdShoppingListTable", {
        inset: true,
        columns: [
			new sap.m.Column({ header: new sap.m.Label({ text: "Brand" }) }),
            new sap.m.Column({ header: new sap.m.Label({ text: "Type" }) }),
			new sap.m.Column({ header: new sap.m.Label({ text: "Price" }) }),
			new sap.m.Column({ header: new sap.m.Label({ text: "Price/Kg" }) })
        ]//,
		//mode : sap.m.ListMode.SingleSelectMaster
    });
	
	var shoppingListToolbar = new sap.m.Toolbar("IdShoppingListTableToolbar", { 
		content: [ new sap.m.Button('IdShoppingListTableAddButton', {
			icon : "sap-icon://add", 
			press : [oController.onTestButtonPress, oController] })]
											
	});
	
	oTable.setHeaderToolbar(shoppingListToolbar);
	
	var template = new sap.m.ColumnListItem({
		cells: [
				new sap.m.Label({ text: "{brandname}" }),
				new sap.m.Label({ text: "{itemtypename}" }),
				new sap.m.Label({ text: "{price}" }),
				new sap.m.Label({ text: "{pricekg}" })
		]
	});
	
	//template.setType(sap.m.ListType.Active);
	
	/*
	template.attachPress(function(oEvent){
		var c = this.getBindingContext();
		var i = c.getObject();
		sap.m.MessageToast.show("jhgf");
	});
	*/
	
	
	oTable.bindAggregation("items", {
        path: "/shoppinglistitems",
        template: template
    });
	
	page.addContent(oTable);
	
	
	
	return page;

 }  
   
});  