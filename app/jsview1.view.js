
sap.ui.jsview("app.jsview1", {  

 getControllerName : function() {  
	return "app.jsview1";  
 },  
 
 createContent : function(oController, oModel) {  
	
	var page = new sap.m.Page("IdMainPage", {
		title : "Fodder"
	});
	
	var bar = new sap.m.Bar({
		contentLeft: [ new sap.m.Button('ButtonAddRow', {icon : "sap-icon://cart-full",
													     press : [oController.onAddRowClick, oController] })],
														 
		contentRight: [ new sap.m.Button('ButtonSettings', {icon : "sap-icon://settings",
													        press : [oController.onSettingsClick, oController] })]
	});
			
	page.addContent(bar);
	
	
	var shoppingList = new sap.m.List({
		headerText:"Shopping lists"
	});
	
	shoppingList.bindItems({
		path : "/shoppinglistdisplay", 
		sorter : new sap.ui.model.Sorter("date", true),
		template : new sap.m.StandardListItem({
			title: "{shop}",
			description: "At: {date}"+ ", " + "Sum: {sum}",
			type: sap.m.ListType.Navigation
			/*press:function(evt){
				var oBindingContext = evt.getSource().getBindingContext(); // evt.getSource() is the ListItem
				page2.setBindingContext(oBindingContext); // make sure the detail page has the correct data context
				app.to("page2");
			}*/
		})
	});
	
	page.addContent(shoppingList);

	return page;
 }  
   
});  