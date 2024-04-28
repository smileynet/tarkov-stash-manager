'use client';
import React, {useState} from 'react';

interface Item {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

interface EditItemModalProps {
    item: Item;
    onUpdateItem: (item: Item) => void;
    onClose: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({item, onUpdateItem, onClose}) => {
    const [editedItem, setEditedItem] = useState(item);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedItem({
            ...editedItem,
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateItem(editedItem);
        onClose();  // Close the modal after updating the item
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-night-ops-black p-6 rounded-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold text-white">Edit Item</h3>
                    <label htmlFor="name" className="block text-sm font-medium text-bullet-casing">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={editedItem.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-tactical-grey text-white"
                        required
                    />

                    <label htmlFor="category" className="block text-sm font-medium text-bullet-casing">Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={editedItem.category}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-tactical-grey text-white"
                        required
                    />

                    <label htmlFor="quantity" className="block text-sm font-medium text-bullet-casing">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={editedItem.quantity}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-tactical-grey text-white"
                        min="1"
                        required
                    />

                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose}
                                className="py-2 px-4 rounded bg-rusty-metal hover:bg-red-700 transition duration-200 text-white">
                            Cancel
                        </button>
                        <button type="submit"
                                className="py-2 px-4 rounded bg-combat-green hover:bg-green-800 transition duration-200 text-white">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditItemModal;
