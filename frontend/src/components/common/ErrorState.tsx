import { Icon } from './Icon';

type ErrorStateProps = {
    title?: string;
    message: string;
    onRetry?: () => void;
};

export function ErrorState({ title = 'Algo salió mal', message, onRetry }: ErrorStateProps) {
    return (
        <div className="px-8 pt-16 flex flex-col items-center text-center">
            <div className="w-36 h-36 rounded-full bg-orange/10 flex items-center justify-center">
                <Icon name="cloud_off" size={72} className="text-orange" />
            </div>

            <h2 className="text-lg font-bold text-navy mt-5">{title}</h2>
            <p className="text-[13px] text-navy/60 mt-1.5">{message}</p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-6 bg-orange text-white text-[13px] font-bold px-8 py-3 rounded-xl"
                >
                    Intentar de nuevo
                </button>
            )}
        </div>
    );
}