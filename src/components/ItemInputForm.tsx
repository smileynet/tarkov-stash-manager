import React, {useEffect, useState} from 'react';
import ItemDetailsModal, {Item} from './ItemDetailsModal';
import {useItemSearch} from '@/utils/useItemSearch';
import Image from 'next/image';

interface ItemInputFormProps {
    onAddItem: (name: string, category: string, quantity: number) => void;
}

const ItemInputForm: React.FC<ItemInputFormProps> = ({onAddItem}) => {
    const [input, setInput] = useState({name: '', category: '', quantity: 1});
    const {items, loading} = useItemSearch(input.name);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        // When selectedItem changes, update the input state for category
        if (selectedItem) {
            setInput(prev => ({...prev, category: selectedItem.types.join(', ')}));
        }
    }, [selectedItem]);  // Dependency on selectedItem

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({...input, [e.target.name]: e.target.value});
    };

    const handleIconClick = (item: Item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onAddItem(input.name, input.category, parseInt(input.quantity.toString(), 10));
        setInput({name: '', category: '', quantity: 1});  // Reset the form
    };

    return (
        <div>
            <form onSubmit={handleSubmit}
                  className="flex flex-col gap-4 p-4 bg-night-ops-black text-white rounded-lg shadow-lg max-w-lg mx-auto">
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
                {loading && <div>Loading...</div>}
                <div className="flex flex-wrap justify-start gap-2 mt-2">
                    {items.map((item: Item) => (
                        <button key={item.id} onClick={() => handleIconClick(item)}
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block cursor-pointer">
                            <Image src={item.iconLink} alt={item.name} width={50} height={50} className="rounded"/>
                        </button>
                    ))}
                </div>
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
                <button type="submit"
                        className="bg-rusty-metal hover:bg-bullet-casing text-white font-bold p-2 rounded">
                    Add Item
                </button>
            </form>
            {selectedItem && (
                <ItemDetailsModal item={selectedItem} isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
            )}
        </div>
    );
};

export default ItemInputForm;
