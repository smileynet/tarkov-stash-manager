'use client';
import React from 'react';

interface Item {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

interface StashDisplayProps {
    items: Item[];
}

const StashDisplay: React.FC<StashDisplayProps> = ({items}) => {
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
                            className="bg-combat-green text-white py-1 px-3 rounded hover:bg-green-800 transition duration-200">
                            Edit
                        </button>
                        <button
                            className="bg-rusty-metal text-white py-1 px-3 rounded hover:bg-red-700 transition duration-200">
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StashDisplay;
