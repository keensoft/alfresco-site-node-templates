// Ensure root object exists
if (typeof keensoft == "undefined" || !keensoft)
{
   var keensoft = {};
}
keensoft.template = keensoft.template || {};   
   
(function() {

   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event, Element = YAHOO.util.Element;

   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML, $siteURL = Alfresco.util.siteURL;
   
   // Define constructor...
   keensoft.template.DocListToolbar = function CustomDocListToolbar_constructor(htmlId) {
      keensoft.template.DocListToolbar.superclass.constructor.call(this, htmlId);
      return this;
   };
   
   YAHOO.extend(keensoft.template.DocListToolbar, Alfresco.DocListToolbar);
   YAHOO.lang.augmentProto(keensoft.template.DocListToolbar, Alfresco.doclib.Actions);
   
   // Extend default DocListToolbar...
   YAHOO.extend(keensoft.template.DocListToolbar, Alfresco.DocListToolbar,
   {
	   
	      onCreateByTemplateNodeBeforeShow: function DLTB_onCreateByTemplateNodeBeforeShow()
	      {
	    	  
	    	     // Required parameter for site-node-templates service
	    	     var siteId = this.options.siteId;
	    	  
	         // Display loading message
	         var templateNodesMenu = this.widgets.createContent.getMenu().getSubmenus()[0];
	         if (templateNodesMenu.getItems().length == 0)
	         {
	            templateNodesMenu.clearContent();
	            templateNodesMenu.addItem(this.msg("label.loading"));
	            templateNodesMenu.render();

	            // Load template nodes
	            Alfresco.util.Ajax.jsonGet(
	            {
	               url: Alfresco.constants.PROXY_URI + "slingshot/doclib/site-node-templates?siteId=" + siteId,
	               successCallback:
	               {
	                  fn: function(response, menu)
	                  {
	                     var nodes = response.json.data,
	                        menuItems = [],
	                        name;
	                     for (var i = 0, il = nodes.length; i < il; i++)
	                     {
	                        node = nodes[i];
	                        name = $html(node.name);
	                        if (node.title && node.title !== node.name && this.options.useTitle)
	                        {
	                           name += '<span class="title">(' + $html(node.title) + ')</span>';
	                        }
	                        menuItems.push(
	                        {
	                           text: '<span title="' + $html(node.description) + '">' + name +'</span>',
	                           value: node
	                        });
	                     }
	                     if (menuItems.length == 0)
	                     {
	                        menuItems.push(this.msg("label.empty"));
	                     }
	                     templateNodesMenu.clearContent();
	                     templateNodesMenu.addItems(menuItems);
	                     templateNodesMenu.render();
	                  },
	                  scope: this
	               }
	            });
	         }
	      }
            	   
   });
   
   
})();