type Method = 'CARD' | 'CASH' | 'TRANSFER';

const methods: { value: Method; label: string }[] = [
    { value: 'CARD', label: 'Tarjeta' },
    { value: 'CASH', label: 'Pago contra entrega' },
    { value: 'TRANSFER', label: 'Transferencia' },
];

type PaymentMethodSelectorProps = {
    selected: Method;
    onSelect: (method: Method) => void;
};

export function PaymentMethodSelector({ selected, onSelect }: PaymentMethodSelectorProps) {
    return (
        <div className="flex flex-col gap-2">
            {methods.map((method) => (
                <button
                    key={method.value}
                    onClick={() => onSelect(method.value)}
                    className={`flex items-center gap-3 text-left border rounded-xl p-3.5 ${selected === method.value ? 'border-teal bg-teal/5' : 'border-navy/10'
                        }`}
                >
                    <span
                        className={`w-4.5 h-4.5 rounded-full border-2 shrink-0 ${selected === method.value ? 'border-teal bg-teal' : 'border-navy/30'
                            }`}
                    />
                    <span className="text-[13px] font-semibold text-navy">{method.label}</span>
                </button>
            ))}
        </div>
    );
}