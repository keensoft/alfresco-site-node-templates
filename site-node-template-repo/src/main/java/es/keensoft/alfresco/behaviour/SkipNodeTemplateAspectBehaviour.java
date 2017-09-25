package es.keensoft.alfresco.behaviour;

import java.util.Map;

import org.alfresco.repo.copy.CopyServicePolicies;
import org.alfresco.repo.policy.JavaBehaviour;
import org.alfresco.repo.policy.PolicyComponent;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.repository.NodeService;
import org.alfresco.service.namespace.QName;

public class SkipNodeTemplateAspectBehaviour implements CopyServicePolicies.OnCopyCompletePolicy {
    
    private PolicyComponent policyComponent;
    private NodeService nodeService;
    
    QName ASPECT_NODE_TEMPLATABLE_SITE = QName.createQName("http://www.keensoft.es/model/content/site/template/1.0","nodeTemplateSite");

    public void init() {
        policyComponent.bindClassBehaviour(CopyServicePolicies.OnCopyCompletePolicy.QNAME, 
                ASPECT_NODE_TEMPLATABLE_SITE, 
                new JavaBehaviour(this, "onCopyComplete"));
    }
    
    @Override
    public void onCopyComplete(QName classRef, NodeRef sourceNodeRef, NodeRef targetNodeRef, boolean copyToNewNode, Map<NodeRef, NodeRef> copyMap) {
        if (nodeService.getAspects(targetNodeRef).contains(ASPECT_NODE_TEMPLATABLE_SITE)) {
            nodeService.removeAspect(targetNodeRef, ASPECT_NODE_TEMPLATABLE_SITE);
        }
    }

    public void setPolicyComponent(PolicyComponent policyComponent) {
        this.policyComponent = policyComponent;
    }
    
    public void setNodeService(NodeService nodeService) {
        this.nodeService = nodeService;
    }

}
