'use client';

import React, {useState} from 'react';
import ItemInputForm from './ItemInputForm';
import StashDisplay from './StashDisplay';

interface Item {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

const Main: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (name: string, category: string, quantity: number) => {
        const newItem = {id: items.length + 1, name, category, quantity};
        setItems([...items, newItem]);
    };

    return (
        <main className="bg-night-ops-black text-white p-6">
            <ItemInputForm onAddItem={addItem}/>
            <StashDisplay items={items}/>
        </main>
    );
};

export default Main;
