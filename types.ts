export type LeadsParamList = {
    LeadList: undefined;
    LeadDetail: { leadId: string };
    NewLead: { onLeadCreated?: () => void };
    EditLead: { leadId: string };
}; 