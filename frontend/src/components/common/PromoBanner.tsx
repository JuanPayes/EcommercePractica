export function PromoBanner() {
    return (
        <div className="mx-5 mb-5 h-30 relative rounded-2xl overflow-hidden bg-teal">
            <div className="absolute left-0 bottom-0 w-[70%] h-full bg-amber [clip-path:polygon(0_0,60%_0,30%_100%,0_100%)]" />
            <div className="relative z-10 p-4.5 text-white">
                <div className="text-[11px] font-bold uppercase tracking-wide opacity-85">Oferta</div>
                <div className="text-lg font-extrabold mt-1">Envío gratis hoy</div>
            </div>
        </div>
    );
}