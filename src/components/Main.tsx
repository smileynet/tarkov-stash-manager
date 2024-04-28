'use client';
import React, {useState} from 'react';
import ItemInputForm from './ItemInputForm';
import StashDisplay from './StashDisplay';
import ConfirmationModal from './ConfirmationModal'; // Import your custom modal

interface Item {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

const Main: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);

    const onEditItem = (updatedItem: Item) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const onDeleteItem = (id: number) => {
        setDeleteItemId(id);
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        if (deleteItemId != null) {
            setItems(items.filter(item => item.id !== deleteItemId));
        }
        setIsModalOpen(false);
        setDeleteItemId(null);
    };

    return (
        <main>
            <div className="mt-8">
                <ItemInputForm onAddItem={(name, category, quantity) => {
                    setItems([...items, {id: items.length + 1, name, category, quantity}]);
                }}/>
            </div>
            <StashDisplay
                items={items}
                onEditItem={onEditItem}
                onDeleteItem={onDeleteItem}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
            />
            <ConfirmationModal
                isOpen={isModalOpen}
                message="Are you sure you want to delete this item?"
                onConfirm={confirmDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </main>
    );
};

export default Main;
