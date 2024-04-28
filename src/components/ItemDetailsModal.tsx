'use client';
import React from 'react';
import Image from "next/image";

interface Item {
    id: string;
    name: string;
    types: string[];
    avg24hPrice: number;
    basePrice: number;
    width: number;
    height: number;
    changeLast48hPercent: number;
    iconLink: string;
    link: string;
    sellFor: {
        price: number;
        source: string;
    }[];
}

interface ItemDetailsModalProps {
    item: Item;
    isOpen: boolean;
    onClose: () => void;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({item, isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-night-ops-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-tactical-grey p-4 rounded-lg shadow-lg max-w-lg">
                <h2 className="text-lg font-bold text-bullet-casing">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-combat-green">
                        {item.name}
                    </a>
                </h2>
                <div className="relative w-20 h-20 mx-auto my-2">
                    <Image src={item.iconLink} alt="Item icon" layout="fill" objectFit="contain"/>
                </div>
                <p className="text-white">Type(s): {item.types.join(', ')}</p>
                <p className="text-white">Average 24h Price: ${item.avg24hPrice.toLocaleString()}</p>
                <p className="text-white">Base Price: ${item.basePrice.toLocaleString()}</p>
                <p className="text-white">Dimensions: {item.width}x{item.height}</p>
                <p className="text-white">Price Change Last 48h: {item.changeLast48hPercent}%</p>
                <div className="text-bullet-casing">
                    <strong>Sell For:</strong>
                    {item.sellFor.map((sell, index) => (
                        <p key={index}>{sell.source}: ${sell.price.toLocaleString()}</p>
                    ))}
                </div>
                <button onClick={onClose}
                        className="mt-4 bg-combat-green hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ItemDetailsModal;
