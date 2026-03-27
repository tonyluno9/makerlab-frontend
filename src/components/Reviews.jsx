import React from 'react';
import { FiStar, FiLayers, FiMessageSquare } from 'react-icons/fi';

const reviewsData = [
    {
        id: 1,
        name: 'Carlos Pérez - TechSolutions',
        rating: 5,
        date: '15 de Enero de 2026',
        comment: 'Excelente calidad en la impresión 3D. El acabado es profesional y los tiempos de entrega se cumplieron a la perfección. Muy recomendados.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
    },
    {
        id: 2,
        name: 'Ing. Kevin González',
        rating: 5,
        date: '12 de Febrero de 2026',
        comment: 'Las piezas son muy resistentes y el nivel de detalle es impresionante. Moran Creative siempre entrega trabajos de alta calidad.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kevin'
    },
    {
        id: 3,
        name: 'Andrea Martínez - Creativa Studio',
        rating: 5,
        date: '28 de Febrero de 2026',
        comment: 'Me encantó el resultado final. Pedí un prototipo complejo y quedó exactamente como lo imaginé. La atención al cliente es de primera.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrea'
    },
    {
        id: 4,
        name: 'Rodrigo Villanueva',
        rating: 5,
        date: '01 de Marzo de 2026',
        comment: 'Servicio impecable. Es mi tercera vez pidiendo diseños aquí y nunca decepcionan. Las especificaciones se siguen al pie de la letra.',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rodrigo'
    }
];

export default function Reviews() {
    const [activeTab, setActiveTab] = React.useState('especificaciones');
    const reviews = reviewsData;

    const averageRating = 5.0;
    const totalReviews = reviews.length;

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Tabs Header */}
            <div className="flex border-b border-gray-100 mb-2">
                <button
                    onClick={() => setActiveTab('especificaciones')}
                    className={`px-8 py-4 font-black text-sm uppercase tracking-widest transition-all relative flex items-center gap-3 ${activeTab === 'especificaciones' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <FiLayers size={18} className={activeTab === 'especificaciones' ? 'text-blue-600' : 'text-gray-400'} />
                    Especificaciones
                    {activeTab === 'especificaciones' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
                </button>
                <button
                    onClick={() => setActiveTab('valoraciones')}
                    className={`px-8 py-4 font-black text-sm uppercase tracking-widest transition-all relative flex items-center gap-3 ${activeTab === 'valoraciones' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <FiMessageSquare size={18} className={activeTab === 'valoraciones' ? 'text-blue-600' : 'text-gray-400'} />
                    Valoraciones
                    {activeTab === 'valoraciones' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
                </button>
            </div>

            {activeTab === 'especificaciones' ? (
                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm animate-fadeIn">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-600">Dimensiones</h4>
                            <p className="text-gray-600 font-medium">15cm x 12cm x 20cm (Escalable)</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-600">Material Base</h4>
                            <p className="text-gray-600 font-medium">PLA Premium de alta tenacidad</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-600">Tiempo estimado</h4>
                            <p className="text-gray-600 font-medium">24-48 horas de producción</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-600">Calidad</h4>
                            <p className="text-gray-600 font-medium">0.12mm - 0.2mm (Alta Resolución)</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-3xl p-10 border border-gray-100 shadow-sm animate-fadeIn">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div className="flex items-center gap-6">
                            <span className="text-6xl font-black text-blue-600 tracking-tighter">
                                {averageRating.toFixed(1)}
                            </span>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-1 text-blue-500">
                                    {[...Array(5)].map((_, i) => <FiStar key={i} size={20} fill="currentColor" />)}
                                </div>
                                <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                    Basado en {totalReviews} calificaciones
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-10">
                        {reviews.map((review) => (
                            <div key={review.id} className="flex gap-6 group">
                                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-4 border-gray-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                    <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col flex-1 gap-2 pt-1">
                                    <div className="flex justify-between items-center w-full">
                                        <div className="flex items-center gap-4">
                                            <h5 className="font-black text-gray-900 tracking-tight">{review.name}</h5>
                                            <div className="flex gap-0.5 text-blue-500">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <FiStar key={i} size={14} fill="currentColor" />
                                                ))}
                                            </div>
                                        </div>
                                        <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest opacity-60">
                                            {review.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
