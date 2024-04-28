'use client';
import React, {useEffect, useState} from 'react';
import ItemInputForm from './ItemInputForm';
import StashDisplay, {Item} from './StashDisplay';
import ConfirmationModal from './ConfirmationModal';
import ItemDetailsModal, {DetailedItem} from "@/components/ItemDetailsModal";
import {useItemSearch} from "@/utils/useItemSearch";

const Main: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [detailedItem, setDetailedItem] = useState<DetailedItem | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Call useItemSearch at the top level, with searchTerm as the parameter
    const searchResults = useItemSearch(searchTerm);

    useEffect(() => {
        // Assume we want to use the first result to show details
        if (searchResults.items.length > 0 && !isDetailModalOpen) {
            setDetailedItem(searchResults.items[0]);
            setIsDetailModalOpen(true);
        }
    }, [searchResults, isDetailModalOpen]);

    const showItemDetails = (item: Item) => {
        // Update the searchTerm state to trigger useItemSearch
        setSearchTerm(item.name);
    };

    const onEditItem = (updatedItem: Item) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const onDeleteItem = (id: number) => {
        setDeleteItemId(id);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (deleteItemId != null) {
            setItems(items.filter(item => item.id !== deleteItemId));
        }
        setIsDeleteModalOpen(false);
        setDeleteItemId(null);
    };

    const showDetailedItemDetails = (detailedItem: DetailedItem) => {
        setDetailedItem(detailedItem);
        setIsDetailModalOpen(true);
    }

    const closeDetailsModal = () => {
        setIsDetailModalOpen(false);
        setSearchTerm(''); // Clear search term to prevent reopening of the modal
        setDetailedItem(null); // Clear detailed item data
    };

    return (
        <main>
            <div className="mt-8">
                <ItemInputForm onAddItem={(item) => {
                    setItems([...items, {
                        id: items.length + 1,
                        name: item.name,
                        category: item.category,
                        quantity: item.quantity,
                        iconLink: item.iconLink
                    }]);
                }}
                               showDetailedItemDetails={showDetailedItemDetails}/>
            </div>
            <StashDisplay
                items={items}
                onEditItem={onEditItem}
                onDeleteItem={onDeleteItem}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                showItemDetails={showItemDetails}
            />
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                message="Are you sure you want to delete this item?"
                onConfirm={confirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
            />
            <ItemDetailsModal item={detailedItem!} isOpen={isDetailModalOpen}
                              onClose={closeDetailsModal}/>
        </main>
    );
};

export default Main;
