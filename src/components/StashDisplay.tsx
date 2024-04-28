'use client';
import React from 'react';
import EditItemModal from "@/components/EditItemModal";

interface Item {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

interface StashDisplayProps {
    items: Item[];
    onEditItem: (item: Item) => void;
    onDeleteItem: (id: number) => void;
    selectedItem: Item | null;
    setSelectedItem: (item: Item | null) => void;
}

const StashDisplay: React.FC<StashDisplayProps> = ({
                                                       items,
                                                       onEditItem,
                                                       onDeleteItem,
                                                       selectedItem,
                                                       setSelectedItem
                                                   }) => {
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {items.map((item) => (
                <div key={item.id}
                     className="bg-night-ops-black text-white p-3 rounded-lg shadow-lg hover:bg-tactical-grey transition duration-300 ease-in-out">
                    <h4 className="text-lg font-bold">{item.name}</h4>
                    <p className="text-sm">Category: {item.category}</p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => setSelectedItem(item)}
                            className="bg-combat-green text-white py-1 px-3 rounded hover:bg-green-800 transition duration-200">
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteItem(item.id)}
                            className="bg-rusty-metal text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {selectedItem && (
                <EditItemModal
                    item={selectedItem}
                    onUpdateItem={(updatedItem) => {
                        onEditItem(updatedItem);
                        setSelectedItem(null); // Close modal after update
                    }}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
};

export default StashDisplay;
