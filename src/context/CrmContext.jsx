import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CrmContext = createContext();

const INITIAL_COLUMNS = [
    { id: 'new', title: 'Novos Leads', color: 'bg-blue-500' },
    { id: 'contacted', title: 'Em Contato', color: 'bg-yellow-500' },
    { id: 'negotiation', title: 'Negociação', color: 'bg-orange-500' },
    { id: 'won', title: 'Venda Realizada', color: 'bg-green-500' },
    { id: 'lost', title: 'Perdido', color: 'bg-red-500' }
];

export const CrmProvider = ({ children }) => {
    const [leads, setLeads] = useState([]);
    const [columns, setColumns] = useState(INITIAL_COLUMNS);

    useEffect(() => {
        const storedLeads = localStorage.getItem('phoenix_leads');
        const storedColumns = localStorage.getItem('phoenix_columns');

        if (storedLeads) setLeads(JSON.parse(storedLeads));
        if (storedColumns) setColumns(JSON.parse(storedColumns));
    }, []);

    const saveLeads = (newLeads) => {
        setLeads(newLeads);
        localStorage.setItem('phoenix_leads', JSON.stringify(newLeads));
    };

    const addLead = (leadData) => {
        const newLead = {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            status: 'new',
            observations: '',
            interactions: [],
            ...leadData
        };
        const updatedLeads = [...leads, newLead];
        saveLeads(updatedLeads);
        return newLead;
    };

    const updateLead = (leadId, updates) => {
        const updatedLeads = leads.map(l => l.id === leadId ? { ...l, ...updates } : l);
        saveLeads(updatedLeads);
    };

    const moveLead = (leadId, newStatus) => {
        updateLead(leadId, { status: newStatus });
    };

    const addInteraction = (leadId, interaction) => {
        const lead = leads.find(l => l.id === leadId);
        if (!lead) return;

        const newInteraction = {
            id: uuidv4(),
            createdAt: new Date().toISOString(),
            ...interaction
        };

        const updatedInteractions = [newInteraction, ...(lead.interactions || [])];
        updateLead(leadId, { interactions: updatedInteractions });
    };

    const deleteLead = (leadId) => {
        const updatedLeads = leads.filter(l => l.id !== leadId);
        saveLeads(updatedLeads);
    };

    return (
        <CrmContext.Provider value={{ leads, columns, addLead, moveLead, updateLead, deleteLead, addInteraction }}>
            {children}
        </CrmContext.Provider>
    );
};

export const useCrm = () => useContext(CrmContext);
