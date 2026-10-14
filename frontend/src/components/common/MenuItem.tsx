import { Link } from 'react-router-dom';
import { Icon } from './Icon';

type MenuItemProps = {
    to: string;
    icon: string;
    label: string;
};

export function MenuItem({ to, icon, label }: MenuItemProps) {
    return (
        <Link
            to={to}
            className="flex items-center gap-4 border border-navy/10 rounded-xl p-6 active:bg-neutral-50"
        >
            <Icon name={icon} className="text-teal text-2xl" />
            <span className="flex-1 text-[14px] font-semibold text-navy">{label}</span>
            <Icon name="chevron_right" className="text-navy/40 text-xl" />
        </Link>
    );
}