
Alfresco Site Node Templates
================================================

This add-on provide an additional space to store node templates within every Site.

When using Alfresco *out-of-the-box*, documents stored in `Repository > Data Dictionary > Node Templates` are listed when using Share action `Create document from template` with no particular order or classification.

By using this addon, also documents having `cm:templatable` aspect inside the current Site will be added to the list. These templates can be stored in any folder inside the Site and they will be ordered by name in the list (just after default "data dictionary" templates).


**License**
The plugin is licensed under the [LGPL v3.0](http://www.gnu.org/licenses/lgpl-3.0.html). 

**State**
Current addon release is 1.1.0

**Compatibility**
The current version has been developed using Alfresco 201707 and Alfresco SDK 3.0.1

***No original Alfresco resources have been overwritten***

Downloading the ready-to-deploy-plugin
--------------------------------------
The binary distribution is made of two JAR files to be deployed in Alfresco as a platform and share module:

* [platform JAR](https://github.com/keensoft/alfresco-site-node-templates/releases/download/1.1.0/site-node-template-repo-1.1.0.jar)
* [share JAR](https://github.com/keensoft/alfresco-site-node-templates/releases/download/1.1.0/site-node-template-share-1.1.0.jar)

You can install it by copying platform JAR file to `$ALFRESCO_HOME/modules/platform`, share JAR file to `$ALFRESCO_HOME/modules/share` and re-starting Alfresco.


Building the artifacts
----------------------
You can build the artifacts from source code using maven
```$ mvn clean package```
