import { AuthButtons } from './AuthButtons';

type AuthPromptCardProps = {
    title?: string;
    description?: string;
    redirectTo?: string;
};

export function AuthPromptCard({
    title = 'Inicia sesión para comprar',
    description,
    redirectTo = '/',
}: AuthPromptCardProps) {
    return (
        <div className="rounded-2xl border border-navy/10 bg-sky-light/15 p-5 flex flex-col items-center text-center">
            <h3 className="text-[16px] font-bold text-navy">{title}</h3>
            {description && <p className="text-[13px] text-navy/60 mt-1">{description}</p>}
            <div className="mt-4 w-full">
                <AuthButtons redirectTo={redirectTo} />
            </div>
        </div>
    );
}