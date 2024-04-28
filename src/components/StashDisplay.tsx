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
        <div>
            {items.map((item) => (
                <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p>Category: {item.category}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
        </div>
    );
};

export default StashDisplay;
