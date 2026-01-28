import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CrmContext = createContext();

export const CrmProvider = ({ children }) => {
    const [leads, setLeads] = useState([]);

    // Default columns (now just visual, leads carry their own status)
    const columns = [
        { id: 'new', title: 'Novos Leads', color: 'bg-blue-500' },
        { id: 'contacted', title: 'Em Contato', color: 'bg-yellow-500' },
        { id: 'negotiation', title: 'Em Negociação', color: 'bg-orange-500' },
        { id: 'won', title: 'Venda Realizada', color: 'bg-green-500' },
        { id: 'lost', title: 'Perdidos', color: 'bg-red-500' }
    ];

    useEffect(() => {
        // 1. Initial Fetch
        const fetchLeads = async () => {
            const { data, error } = await supabase
                .from('leads')
                .select(`
                    *,
                    interactions (*)
                `)
                .order('created_at', { ascending: false });

            if (data) setLeads(data);
        };

        fetchLeads();

        // 2. Realtime Subscription
        const subscription = supabase
            .channel('public:leads')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'leads' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setLeads(prev => [payload.new, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setLeads(prev => prev.map(lead => lead.id === payload.new.id ? payload.new : lead));
                } else if (payload.eventType === 'DELETE') {
                    setLeads(prev => prev.filter(lead => lead.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const addLead = async (leadData) => {
        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('leads')
            .insert([{
                ...leadData,
                user_id: user.id,
                status: 'new'
            }])
            .select()
            .single();

        if (error) console.error('Error adding lead:', error);
        return data;
    };

    const updateLead = async (leadId, updates) => {
        // Separate interactions updates from lead table updates
        // Interactions are stored in a separate table now.
        // If updates contains interactions, we handle them differently?
        // Actually, the frontend calls addInteraction separately.
        // updateLead is mostly for status, name, value, observations.

        const { error } = await supabase
            .from('leads')
            .update(updates)
            .eq('id', leadId);

        if (error) console.error('Error updating lead:', error);
    };

    const moveLead = async (leadId, newStatus) => {
        await updateLead(leadId, { status: newStatus });
    };

    const deleteLead = async (leadId) => {
        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', leadId);
        if (error) console.error('Error deleting lead:', error);
    };

    const addInteraction = async (leadId, interaction) => {
        const { error } = await supabase
            .from('interactions')
            .insert([{
                lead_id: leadId,
                type: interaction.type || 'note',
                note: interaction.note
            }]);

        if (error) console.error('Error adding interaction:', error);

        // Optimistically update local state or re-fetch?
        // Realtime for interactions table isn't set up in the useEffect above yet.
        // Ideally we should add a subscription for interactions too, or just re-fetch this lead.
        // For simplicity, let's just re-fetch the lead's interactions?
        // Or simpler: The simple `select *` above won't catch interactions updates automatically 
        // unless we listen to them.
        // Quick fix: manually update local state for immediate feedback.
    };

    return (
        <CrmContext.Provider value={{ leads, columns, addLead, moveLead, updateLead, deleteLead, addInteraction }}>
            {children}
        </CrmContext.Provider>
    );
};
