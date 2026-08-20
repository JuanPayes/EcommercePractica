// frontend/src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function Layout() {
    return (
        <div className="h-screen bg-neutral-100 flex justify-center">
            <div className="w-full max-w-md h-screen bg-white relative flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
                <BottomNav />
            </div>
        </div>
    );
}