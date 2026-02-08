import React, { useState } from 'react';
import { projects } from '../constants/projects';

const GalleryApp = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <div className="flex h-full bg-[#1e1e1e] text-gray-300">
            {/* Toolbar */}
            <div className="w-12 border-r border-gray-700 flex flex-col items-center gap-4 py-4 shrink-0">
                {/* Tools placeholder */}
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
                <div className="w-6 h-6 bg-gray-600 rounded"></div>
            </div>

            {/* Canvas Area / Main View */}
            <div className="flex-1 bg-[#2b2b2b] flex flex-col overflow-hidden">
                {/* Tabs / Breadcrumbs */}
                <div className="h-8 bg-[#252525] border-b border-black flex items-center px-4 text-xs text-gray-500">
                    Portfolio / {selectedProject ? selectedProject.title : 'All Projects'}
                </div>

                <div className="flex-1 overflow-auto p-8 flex items-start justify-center content-start flex-wrap gap-8">
                    {selectedProject ? (
                        <div className="flex flex-col items-center max-w-2xl animate-in fade-in zoom-in duration-300">
                            <img src={selectedProject.image} alt={selectedProject.title} className="max-h-[60vh] object-contain shadow-2xl border border-gray-700" />
                            <div className="mt-4 text-center">
                                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                                <p className="text-gray-400 mt-2">{selectedProject.description}</p>
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                                >
                                    Back to Gallery
                                </button>
                            </div>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                className="w-48 group cursor-pointer"
                            >
                                <div className="aspect-square bg-gray-800 border border-gray-700 overflow-hidden shadow-lg relative group-hover:border-blue-500 transition-colors">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="mt-2 text-center">
                                    <p className="text-sm font-medium text-gray-200 truncate">{project.title}</p>
                                    <p className="text-xs text-gray-500">{project.category}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Panels */}
            <div className="w-64 border-l border-gray-700 bg-[#252525] p-2 shrink-0 hidden md:block">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider">Layers</div>
                <div className="flex flex-col gap-1">
                    {projects.map((p, i) => (
                        <div key={p.id} className={`p-2 text-sm flex items-center gap-2 cursor-pointer ${selectedProject?.id === p.id ? 'bg-[#4a4a4a]' : 'hover:bg-[#383838]'}`} onClick={() => setSelectedProject(p)}>
                            <span className="w-4 h-4 border border-gray-500 flex items-center justify-center text-[10px]">{i + 1}</span>
                            <span className="truncate">{p.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryApp;
