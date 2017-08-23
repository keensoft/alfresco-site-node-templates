// Ensure root object exists
if (typeof keensoft == "undefined" || !keensoft)
{
   var keensoft = {};
}
keensoft.DocListToolbar = keensoft.DocListToolbar || {};

/**
 * Alfresco Slingshot aliases
 */
var $html = Alfresco.util.encodeHTML;
   
(function() {

   // Define constructor...
   keensoft.DocListToolbar.prototype=
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
            	   
   };
   
})();

(function () {
    YAHOO.lang.augmentProto(Alfresco.DocListToolbar, keensoft.DocListToolbar, true);
})();