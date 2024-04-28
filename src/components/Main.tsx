'use client';
import React, {useState} from 'react';
import StashDisplay from './StashDisplay';
import ItemInputForm from './ItemInputForm';

interface Item {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

const Main: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    const onEditItem = (updatedItem: Item) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    return (
        <main>
            <ItemInputForm onAddItem={(name, category, quantity) => {
                setItems([...items, {id: items.length + 1, name, category, quantity}]);
            }}/>
            <StashDisplay
                items={items}
                onEditItem={onEditItem}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
        </main>
    );
};

export default Main;
