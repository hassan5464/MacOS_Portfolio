import { Folder } from 'lucide-react';

const FinderApp = () => {
    return (
        <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-48 bg-gray-100 border-r border-gray-200 p-2 flex flex-col gap-2">
                <span className="text-xs font-semibold text-gray-500 pl-2 mb-1">Favorites</span>
                {['Desktop', 'Documents', 'Downloads', 'Applications'].map(item => (
                    <div key={item} className="flex items-center gap-2 px-2 py-1 rounded hover:bg-black/10 text-sm cursor-pointer">
                        <Folder size={14} className="text-blue-500" />
                        <span>{item}</span>
                    </div>
                ))}
            </div>
            {/* Main Content */}
            <div className="flex-1 p-4 bg-white">
                <h1 className="text-xl font-bold mb-4">Remote Projects</h1>
                <div className="grid grid-cols-4 gap-4">
                    {['Project Alpha', 'Design System', 'Portfolio v1', 'Client X'].map(folder => (
                        <div key={folder} className="flex flex-col items-center gap-2 group cursor-pointer">
                            <Folder size={48} className="text-blue-500 fill-current group-hover:opacity-80" />
                            <span className="text-sm text-center">{folder}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FinderApp;
