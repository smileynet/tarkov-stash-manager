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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleInputChange}
                placeholder="Item name"
                required
            />
            <input
                type="text"
                name="category"
                value={input.category}
                onChange={handleInputChange}
                placeholder="Category"
                required
            />
            <input
                type="number"
                name="quantity"
                value={input.quantity.toString()}
                onChange={handleInputChange}
                placeholder="Quantity"
                min="1"
                required
            />
            <button type="submit">Add Item</button>
        </form>
    );
};

export default ItemInputForm;
