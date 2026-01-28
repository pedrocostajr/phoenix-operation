import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';
import { MoreHorizontal, Plus } from 'lucide-react';

const KanbanColumn = ({ column, leads, users, onCardClick }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div className="flex flex-col w-80 flex-shrink-0">
            {/* Header */}
            <div className={`p-4 rounded-t-xl bg-slate-900 border-b-4 ${column.color.replace('bg-', 'border-')} flex justify-between items-center shadow-lg relative z-10`}>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-white shadow-sm">{column.title}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs text-slate-400 font-medium border border-slate-700">
                        {leads.length}
                    </span>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                    <MoreHorizontal size={18} />
                </button>
            </div>

            {/* Droppable Area */}
            <div
                ref={setNodeRef}
                className="flex-1 bg-slate-900/50 p-3 space-y-3 min-h-[500px] border border-slate-800 border-t-0 rounded-b-xl backdrop-blur-sm"
            >
                <SortableContext items={leads.map(l => l.id)} strategy={verticalListSortingStrategy}>
                    {leads.map((lead) => (
                        <KanbanCard
                            key={lead.id}
                            lead={lead}
                            users={users}
                            onClick={() => onCardClick(lead)}
                        />
                    ))}
                </SortableContext>

                {leads.length === 0 && (
                    <div className="h-full border-2 border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-600 text-sm py-12">
                        Arraste leads aqui
                    </div>
                )}
            </div>
        </div>
    );
};

export default KanbanColumn;
