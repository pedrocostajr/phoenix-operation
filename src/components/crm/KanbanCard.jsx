import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Mail, Phone, DollarSign } from 'lucide-react';

const KanbanCard = ({ lead, users, onClick }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: lead.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const responsibleUser = users.find(u => u.id === lead.assignedTo);

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
            className="bg-slate-800 p-4 rounded-xl shadow-lg border border-slate-700/50 hover:border-blue-500/50 group cursor-grab active:cursor-grabbing hover:shadow-blue-500/10 transition-all"
        >
            <div className="flex justify-between items-start mb-3">
                <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{lead.name}</span>
                {responsibleUser && (
                    <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-xs text-slate-300" title={`Responsável: ${responsibleUser.name}`}>
                        {responsibleUser.name.charAt(0)}
                    </div>
                )}
            </div>

            <div className="space-y-2 mb-4">
                {lead.value && (
                    <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
                        <DollarSign size={14} />
                        {parseFloat(lead.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                )}
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={12} />
                    {lead.email}
                </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                <span className="text-xs text-slate-500">Há 2d</span>
            </div>
        </div>
    );
};

export default KanbanCard;
