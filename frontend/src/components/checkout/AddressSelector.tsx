import type { AddressResponse } from '@/types/address.types';

type AddressSelectorProps = {
    addresses: AddressResponse[];
    selectedId: number | null;
    onSelect: (id: number) => void;
};

export function AddressSelector({ addresses, selectedId, onSelect }: AddressSelectorProps) {
    return (
        <div className="flex flex-col gap-2">
            {addresses.map((address) => (
                <button
                    key={address.id}
                    onClick={() => onSelect(address.id)}
                    className={`text-left border rounded-xl p-3.5 ${selectedId === address.id ? 'border-teal bg-teal/5' : 'border-navy/10'
                        }`}
                >
                    <div className="text-[13px] font-bold text-navy">{address.calle}</div>
                    <div className="text-[12px] text-navy/60">{address.ciudad}</div>
                </button>
            ))}
        </div>
    );
}