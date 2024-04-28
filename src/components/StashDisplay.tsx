'use client';
import React from 'react';
import EditItemModal from "@/components/EditItemModal";
import Image from "next/image";

export interface Item {
    id: number;
    name: string;
    category: string;
    quantity: number;
    iconLink: string;
}

interface StashDisplayProps {
    items: Item[];
    onEditItem: (item: Item) => void;
    onDeleteItem: (id: number) => void;
    selectedItem: Item | null;
    setSelectedItem: (item: Item | null) => void;
    showItemDetails: (item: Item) => void;
}

const StashDisplay: React.FC<StashDisplayProps> = ({
                                                       items,
                                                       onEditItem,
                                                       onDeleteItem,
                                                       selectedItem,
                                                       setSelectedItem,
                                                       showItemDetails
                                                   }) => {
    const handleIconClick = (item: Item) => {
        showItemDetails(item);
    };
    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {items.map((item) => (
                <div key={item.id}
                     className="bg-night-ops-black text-white p-3 rounded-lg shadow-lg hover:bg-tactical-grey transition duration-300 ease-in-out">
                    <h4 className="text-lg font-bold">{item.name}</h4>
                    <p className="text-sm">Category: {item.category}</p>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-sm">Quantity: {item.quantity}</p>
                        <button onClick={() => handleIconClick(item)} className="cursor-pointer text-combat-green">
                            <Image src={item.iconLink} alt={item.name} width={50} height={50}/>
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div>
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
                </div>
            ))}
            {selectedItem && (
                <EditItemModal
                    item={selectedItem}
                    onUpdateItem={(updatedItem) => {
                        onEditItem(updatedItem as Item);
                        setSelectedItem(null); // Close modal after update
                    }}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
};

export default StashDisplay;
