import type { ReactNode } from 'react';
import { Icon } from './Icon';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-navy/50" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white rounded-t-2xl px-5 pt-5 pb-6 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[16px] font-bold text-navy">{title}</h2>
                    <button onClick={onClose} aria-label="Cerrar">
                        <Icon name="close" className="text-navy text-2xl" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}