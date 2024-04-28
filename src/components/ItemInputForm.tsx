import React, {useEffect, useState} from 'react';
import {DetailedItem} from './ItemDetailsModal';
import {Item} from "@/components/StashDisplay";
import {useItemSearch} from '@/utils/useItemSearch';
import Image from 'next/image';

interface ItemInputFormProps {
    onAddItem: (item: Item) => void;
    showDetailedItemDetails: (detailedItem: DetailedItem) => void;
}

const ItemInputForm: React.FC<ItemInputFormProps> = ({onAddItem, showDetailedItemDetails}) => {
    const [input, setInput] = useState({id: 0, name: '', category: '', quantity: 1, iconLink: ''});
    const [categories, setCategories] = useState<string[]>([]);
    const {items, loading} = useItemSearch(input.name);
    const [selectedItem, setSelectedItem] = useState<DetailedItem | null>(null);

    const handleIconClick = (item: DetailedItem) => {
        setSelectedItem(item);
        setInput({...input, name: item.name}); // Set the name in the input state
    };

    useEffect(() => {
        // When selectedItem changes, update the input state for category
        if (selectedItem) {
            setInput(prev => ({...prev, category: selectedItem.types[0], iconLink: selectedItem.iconLink}));
        }
    }, [selectedItem]);  // Dependency on selectedItem

    useEffect(() => {
        const newCategories = new Set<string>();
        items.forEach((item) => {
            item.types.forEach((type: string) => {
                newCategories.add(type);
            });
        });
        setCategories(Array.from(newCategories));
    }, [items]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({...input, [e.target.name]: e.target.value});
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]: value});
    };


    const handleSelectedIconClick = () => {
        if (selectedItem) {
            showDetailedItemDetails(selectedItem);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let newItem: Item = {...input};
        onAddItem(newItem);
        setInput({id: 0, name: '', category: '', quantity: 1, iconLink: ''});
        setSelectedItem(null);
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
                    className="p-2 rounded bg-tactical-grey placeholder-bullet-casing"
                />
                <div className="relative">
                    <select
                        id="category"
                        name="category"
                        value={input.category}
                        onChange={handleSelectChange}
                        className="block appearance-none w-full bg-tactical-grey text-white px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                    <div
                        className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M5.5 7l4.5 4.5L14.5 7H5.5z"/>
                        </svg>
                    </div>
                </div>
                <div className="flex justify-between">
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={input.quantity.toString()}
                        onChange={handleInputChange}
                        placeholder="Enter quantity"
                        min="1"
                        required
                        className="p-2 rounded bg-tactical-grey placeholder-combat-green max-w-sm"
                    />
                    {selectedItem && (
                        <button key={selectedItem.iconLink} onClick={() => handleSelectedIconClick()}
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block cursor-pointer">
                            <Image src={selectedItem.iconLink} alt="icon.name" width={50} height={50}
                                   className="rounded"/>
                        </button>
                    )}
                </div>
                <button type="submit"
                        className="bg-rusty-metal hover:bg-bullet-casing text-white font-bold p-2 rounded">
                    Add Item
                </button>

                {loading && <div>Loading...</div>}
                <div className="flex flex-wrap justify-start gap-2 mt-2">
                    {items.map((item: DetailedItem) => (
                        <button key={item.id} onClick={() => handleIconClick(item)}
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500 inline-block cursor-pointer">
                            <Image src={item.iconLink} alt={item.name} width={50} height={50} className="rounded"/>
                        </button>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default ItemInputForm;
