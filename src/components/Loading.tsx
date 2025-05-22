export default function Loading() {
    return (
        <div className="flex items-center justify-center w-full gap-1 text-2xl font-semibold h-lvh text-zinc-800">
            태양을 피할 방법을 찾아보고있어요
            <div className="animate-bounce">.</div>
            <div className="animate-delay-100 animate-bounce">.</div>
            <div className="animate-delay-200 animate-bounce">.</div>
        </div>
    );
}
