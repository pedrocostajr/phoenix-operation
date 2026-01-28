import React, { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useCrm } from '../../context/CrmContext';
import { useAuth } from '../../context/AuthContext';
import KanbanColumn from '../../components/crm/KanbanColumn';
import KanbanCard from '../../components/crm/KanbanCard';
import LeadDetailsModal from '../../components/crm/LeadDetailsModal';
import { createPortal } from 'react-dom';

const PipelinePage = () => {
    const { leads, columns, moveLead } = useCrm();
    const { users } = useAuth();
    const [activeId, setActiveId] = useState(null);
    const [selectedLead, setSelectedLead] = useState(null);

    const handleCardClick = (lead) => {
        setSelectedLead(lead);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10, // Must drag 10px to start
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activeLeadId = active.id;
        const overId = over.id;

        // Check if dropped over a column
        const isOverColumn = columns.some(col => col.id === overId);

        if (isOverColumn) {
            // Dropped directly on a column
            moveLead(activeLeadId, overId);
        } else {
            // Dropped over another card?
            // For now, simpler implementation: Drop on Column ID only.
            // But SortableContext makes the Cards droppable targets too.
            // dnd-kit is complex.
            // Simplified logic: If the overId is NOT a column, find which column that card belongs to.

            const overLead = leads.find(l => l.id === overId);
            if (overLead) {
                // Dropped on a card, so move to that card's column
                moveLead(activeLeadId, overLead.status);
            }
        }

        setActiveId(null);
    };

    const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Funil de Vendas</h1>
                <p className="text-slate-400">Arraste os cards para atualizar o status das oportunidades.</p>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex-1 flex gap-6 overflow-x-auto pb-4 items-start h-full">
                    {columns.map((column) => (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            leads={leads.filter(l => l.status === column.id)}
                            users={users}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeLead ? (
                            <KanbanCard lead={activeLead} users={users} />
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>

            {selectedLead && (
                <LeadDetailsModal
                    lead={selectedLead}
                    onClose={() => setSelectedLead(null)}
                />
            )}
        </div>
    );
};

export default PipelinePage;
