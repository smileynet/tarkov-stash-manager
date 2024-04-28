'use client';
import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({isOpen, message, onConfirm, onCancel}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-night-ops-black p-6 rounded-lg shadow-lg text-white">
                <h3 className="text-lg">{message}</h3>
                <div className="flex justify-around mt-4">
                    <button
                        onClick={onConfirm}
                        className="bg-combat-green hover:bg-green-800 text-white py-2 px-4 rounded transition duration-200"
                    >
                        Confirm
                    </button>
                    <button
                        onClick={onCancel}
                        className="bg-rusty-metal hover:bg-red-700 text-white py-2 px-4 rounded transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
