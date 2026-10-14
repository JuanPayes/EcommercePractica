import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Icon } from '@/components/common/Icon';

export function HelpPage() {
    const navigate = useNavigate();

    return (
        <div className="pb-8">
            <Header
                title="Ayuda"
                showBack
                onBack={() => navigate('/perfil')}
                cutColor="teal"
                cutSide="left"
                compact
            />

            <div className="px-5 pt-12 flex flex-col items-center text-center">
                <Icon name="support_agent" className="text-navy/25 text-6xl" />
                <p className="text-[14px] font-semibold text-navy mt-3">Centro de ayuda en construcción</p>
                <p className="text-[13px] text-navy/50 mt-1">Pronto podrás encontrar respuestas aquí</p>
            </div>
        </div>
    );
}