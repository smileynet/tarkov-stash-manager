'use client';
import React, {useState} from 'react';

interface ItemInputFormProps {
    onAddItem: (name: string, category: string, quantity: number) => void;
}

const ItemInputForm: React.FC<ItemInputFormProps> = ({onAddItem}) => {
    const [input, setInput] = useState({name: '', category: '', quantity: 1});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({...input, [e.target.name]: e.target.value});
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onAddItem(input.name, input.category, parseInt(input.quantity.toString(), 10));
        setInput({name: '', category: '', quantity: 1}); // Reset the form
    };

    return (
        <form onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-4 bg-night-ops-black text-white rounded-lg shadow-lg max-w-lg mx-auto">
            <label htmlFor="name" className="font-bold">
                Item Name
            </label>
            <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                placeholder="Enter item name"
                required
                className="p-2 rounded bg-tactical-grey placeholder-combat-green"
            />

            <label htmlFor="category" className="font-bold">
                Category
            </label>
            <input
                type="text"
                id="category"
                name="category"
                value={input.category}
                onChange={handleInputChange}
                placeholder="Enter item category"
                required
                className="p-2 rounded bg-tactical-grey placeholder-combat-green"
            />

            <label htmlFor="quantity" className="font-bold">
                Quantity
            </label>
            <input
                type="number"
                id="quantity"
                name="quantity"
                value={input.quantity.toString()}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                min="1"
                required
                className="p-2 rounded bg-tactical-grey placeholder-combat-green"
            />

            <button type="submit" className="bg-rusty-metal hover:bg-bullet-casing text-white font-bold p-2 rounded">
                Add Item
            </button>
        </form>
    );
};

export default ItemInputForm;
