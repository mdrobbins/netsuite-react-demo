function Toast({ closeToast, title, message }) {
    return (
        <div className="-p-[14px] grid grid-cols-[1fr_1px_80px] w-full">
            <div className="flex flex-col p-4">
                <h3 className="text-zinc-800 text-sm font-semibold">{title}</h3>
                <p className="text-sm">{message}</p>
            </div>
            {/* that's the vertical line which separate the text and the buttons*/}
            <div className="bg-zinc-900/20 h-full" />
            <div className="grid grid-rows-[1fr_1px_1fr] h-full">
                {/*specifying a custom closure reason that can be used with the onClose callback*/}
                <button onClick={() => window.open('/', '_blank')} className="text-purple-600 hover:bg-gray-200 rounded-tr-lg">
                    View
                </button>
                <div className="bg-zinc-900/20 w-full" />
                {/*specifying a custom closure reason that can be used with the onClose callback*/}
                <button onClick={() => closeToast('ignore')} className="hover:bg-gray-200 rounded-br-lg">
                    Close
                </button>
            </div>
        </div>
    );
}

export { Toast };
