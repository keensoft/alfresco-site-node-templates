/**
 * Document List Component: Create New Node - get list of available node templates in the Data Dictionary
 * Extension: Add also nodes with aspect "cm:templatable" stored inside the Site
 */
function main()
{

   var nodes = search.selectNodes('/app:company_home/app:dictionary/app:node_templates/*[subtypeOf("cm:content")]');
   var siteId = args["siteId"];
   if (siteId) {
       var siteNodes = search.selectNodes('/app:company_home/st:sites/cm:' + siteId + '/cm:documentLibrary//*[hasAspect("cm:templatable")]');
       siteNodes.sort(compare);
       nodes = nodes.concat(siteNodes);   
   }

   return nodes;   
}

function compare(a,b) {
   if (a.properties["cm:name"] < b.properties["cm:name"])
     return -1;
   if (a.properties["cm:name"] > b.properties["cm:name"])
     return 1;
   return 0;
}

model.nodes = main();