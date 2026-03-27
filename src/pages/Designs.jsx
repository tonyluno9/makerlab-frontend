import React, { useState } from 'react';
import { FiX, FiRotateCw, FiCheck } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import Reviews from '../components/Reviews';
import moranLogo from '../assets/Moran Creative Logo.png';

export default function Designs({ onNavigate }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isRotating, setIsRotating] = useState(true);

    const galleryItems = [
        {
            id: 3,
            title: 'El padrino',
            description: 'Este diseño de el padrino basado en la pelicula aclamada de 1972, totalmente hecho con materiales de calidad.',
            price: '899.00',
            category: 'Pelicula',
            sales: '492 Vendidos',
            encargado: 'Moran Creative Studio',
            image: 'https://studio3dprint.net/3219-large_default/el-padrino-stl-3d-print-files.jpg'
        },
        {
            id: 4,
            title: 'Darth Vader Busto',
            description: 'Busto detallado de Darth Vader de la saga original. Acabado en resina premium para mayor detalle.',
            price: '450.00',
            category: 'Sci-Fi',
            sales: '320 Vendidos',
            encargado: 'Ing. Carlos Pérez',
            image: 'https://cdn.renderhub.com/3dprintmodel91/darth-vader-star-wars/darth-vader-star-wars-01.jpg'
        },
        {
            id: 5,
            title: 'Spider-Man Acción',
            description: 'Figura de Spider-Man en pose dinámica. Impresión multicolor de alta resistencia a caídas.',
            price: '340.00',
            category: 'Comic',
            sales: '410 Vendidos',
            encargado: 'Kevin González',
            image: 'https://stlbigstudio.com/wp-content/uploads/spiderman-stl-figura-marvel-impresion-3d-2000x2000.webp'
        },
        {
            id: 6,
            title: 'Goku Super Saiyan',
            description: 'Figura épica de Goku en fase Super Saiyan, pintada a mano. Base decorativa incluida.',
            price: '520.00',
            category: 'Anime',
            sales: '680 Vendidos',
            encargado: 'TechPrinting MX',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS6NGs-l2_HcbJ516dJkz2gMAK6qEr_vNgnA&s'
        },
        {
            id: 22,
            title: 'Trofeo Copa Pistón',
            description: 'Réplica detallada del trofeo de la Copa Pistón. El regalo perfecto para fanáticos de la velocidad.',
            price: '450.00',
            category: 'Cine',
            sales: '350 Vendidos',
            encargado: 'Andrea Martínez',
            image: '/src/assets/products/piston-cup-keychains.jpg'
        },
        {
            id: 23,
            title: 'Exhibidor LEGO F1',
            description: 'Soporte vertical elegante para autos de LEGO F1 (McLaren/Red Bull). Ahorra espacio con estilo.',
            price: '280.00',
            category: 'Decoración',
            sales: '85 Vendidos',
            encargado: 'Rodrigo Villanueva',
            image: '/src/assets/products/lego-f1-cars.jpg'
        },
        {
            id: 24,
            title: 'Llavero Instax Mini',
            description: 'Mini cámara Instax funcional mecánicamente: presiona para revelar una foto personalizada.',
            price: '120.00',
            category: 'Accesorios',
            sales: '540 Vendidos',
            encargado: 'Moran Creative Studio',
            image: '/src/assets/products/instax-keychain.jpg'
        },
        {
            id: 25,
            title: 'Trofeo Chancla de Oro',
            description: 'El máximo reconocimiento: "La Chancla de Oro para la Mejor Mamá". Impresión de alta calidad.',
            price: '190.00',
            category: 'Regalos',
            sales: '210 Vendidos',
            encargado: 'Ing. Carlos Pérez',
            image: '/src/assets/products/golden-chancla-trophy.jpg'
        },
        {
            id: 26,
            title: 'Lámpara Litofanía',
            description: 'Lámpara decorativa tipo linterna que revela fotos familiares detalladas al encenderse.',
            price: '550.00',
            category: 'Iluminación',
            sales: '45 Vendidos',
            encargado: 'Kevin González',
            image: '/src/assets/products/lithophane-lantern.jpg'
        },
        {
            id: 27,
            title: 'Pareja Llaveros Coronas',
            description: 'Set de llaveros personalizados con nombres (Jorge y Yareli) y coronas 3D de colores.',
            price: '150.00',
            category: 'Personalizados',
            sales: '180 Vendidos',
            encargado: 'TechPrinting MX',
            image: '/src/assets/products/crown-keychains.jpg'
        },
        {
            id: 28,
            title: 'Kuromi 3D',
            description: 'Figura decorativa de Kuromi con acabados premium y efecto brillante. Ideal para fans de Sanrio.',
            price: '320.00',
            category: 'Anime',
            sales: '95 Vendidos',
            encargado: 'Andrea Martínez',
            image: '/src/assets/products/kuromi-3d.jpg'
        },
        {
            id: 29,
            title: 'Snorlax Gigante 3D',
            description: 'Snorlax impreso en azul vibrante con pose clásica de bostezo. Gran tamaño y detalle.',
            price: '480.00',
            category: 'Anime',
            sales: '60 Vendidos',
            encargado: 'Rodrigo Villanueva',
            image: '/src/assets/products/snorlax-3d.jpg'
        },
        {
            id: 30,
            title: 'Lámpara de Mesa Minimalista',
            description: 'Lámpara de diseño contemporáneo con pantalla estriada blanca y base morada elegante.',
            price: '620.00',
            category: 'Iluminación',
            sales: '30 Vendidos',
            encargado: 'Moran Creative Studio',
            image: '/src/assets/products/modern-lamp.jpg'
        },
        {
            id: 31,
            title: 'Portallaves Batimóvil',
            description: 'Organizador de llaves con diseño icónico del Batimóvil. 5 ganchos resistentes.',
            price: '240.00',
            category: 'Hogar',
            sales: '140 Vendidos',
            encargado: 'Ing. Carlos Pérez',
            image: '/src/assets/products/batmobile-key-holder.jpg'
        },
        {
            id: 32,
            title: 'Soporte Gamer Pro',
            description: 'Soporte dual para audífonos y control de consola. Diseño en negro con detalles turquesa.',
            price: '350.00',
            category: 'Gaming',
            sales: '220 Vendidos',
            encargado: 'Kevin González',
            image: '/src/assets/products/headphone-controller-stand.jpg'
        },
        {
            id: 33,
            title: 'Portallaves Rust-eze',
            description: 'Diseño basado en el parachoques trasero del Rayo McQueen #95. Incluye ganchos duraderos.',
            price: '210.00',
            category: 'Hogar',
            sales: '75 Vendidos',
            encargado: 'TechPrinting MX',
            image: '/src/assets/products/rusteze-key-holder.jpg'
        },
        {
            id: 34,
            title: 'Portallaves Skyline Nismo',
            description: 'Para los amantes del JDM: Portallaves con diseño trasero de Nissan Skyline GT-R Nismo.',
            price: '230.00',
            category: 'Hogar',
            sales: '110 Vendidos',
            encargado: 'Andrea Martínez',
            image: '/src/assets/products/nismo-key-holder.jpg'
        }
    ];

    return (
        <div className="min-h-screen bg-[#f1f1f1] text-gray-800 flex flex-col font-sans">
            <Header onNavigate={onNavigate} currentPage="designs" />

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="bg-white rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100/50 cursor-pointer group"
                        >
                            <div className="relative h-[280px] w-full overflow-hidden shrink-0 bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop";
                                    }}
                                />
                            </div>
                            <div className="p-6 pt-8 flex-1 flex flex-col relative bg-white">
                                <div className="flex justify-between items-end mb-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-blue-500 font-bold tracking-tight text-xs">{item.category}</span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-gray-400 font-medium text-[10px] tracking-wide uppercase">{item.sales}</span>
                                    </div>
                                </div>
                                <h3 className="text-[17px] font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed line-clamp-3 mb-4">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer onNavigate={onNavigate} />
            <ChatWidget />

            {/* Product Detail Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-xl bg-black/80 animate-fadeIn overflow-y-auto">
                    <button
                        onClick={() => setSelectedItem(null)}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full z-10"
                    >
                        <FiX size={24} />
                    </button>

                    <div className="max-w-6xl w-full my-auto space-y-12 py-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* 3D Preview Simulation */}
                            <div className="relative aspect-square flex items-center justify-center [perspective:2000px]">
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-blue-500/20 blur-[80px] rounded-full translate-y-12" />
                                <div className={`relative w-full max-w-sm aspect-square preserve-3d transition-transform duration-1000 ${isRotating ? 'animate-slowRotate' : ''}`}>
                                    <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl p-6 overflow-hidden backface-hidden border-4 border-blue-500/20 z-10">
                                        <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-contain drop-shadow-2xl" />
                                    </div>
                                    <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl backface-hidden [transform:rotateY(180deg)] border-4 border-gray-100 flex flex-col items-center justify-center p-8 gap-4 text-center">
                                        <img src={moranLogo} alt="Logo" className="w-24 h-auto opacity-80" />
                                        <span className="text-xl font-black text-gray-900 opacity-60 uppercase tracking-widest leading-none">Maker Lab<br />Premium Quality</span>
                                    </div>
                                    <div className="absolute inset-y-0 -left-1 w-2 bg-gray-200 origin-left rotate-y-90" />
                                    <div className="absolute inset-y-0 -right-1 w-2 bg-gray-300 origin-right -rotate-y-90" />
                                </div>
                                <button onClick={() => setIsRotating(!isRotating)} className={`absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs transition-all ${isRotating ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'}`}>
                                    <FiRotateCw className={isRotating ? 'animate-spin-slow' : ''} size={16} />
                                    {isRotating ? 'Pausar Rotación' : 'Activar 3D'}
                                </button>
                            </div>

                            {/* Product Info */}
                            <div className="text-white space-y-8 animate-slideUp">
                                <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/30">
                                    {selectedItem.category}
                                </span>
                                <h2 className="text-6xl font-black leading-none tracking-tighter">
                                    {selectedItem.title}
                                </h2>
                                <p className="text-lg text-white/60 leading-relaxed font-medium max-w-md">
                                    {selectedItem.description}
                                </p>

                                <div className="flex items-center gap-10 py-6">
                                    <div className="flex flex-col">
                                        <span className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-2">Encargado</span>
                                        <span className="text-xl font-bold text-white/70">{selectedItem.encargado}</span>
                                    </div>
                                    <div className="flex flex-col border-l border-white/10 pl-10">
                                        <span className="text-white/30 text-[10px] font-black uppercase tracking-widest mb-2">Popularidad</span>
                                        <span className="text-xl font-bold text-white/70">{selectedItem.sales}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reviews Section in Modal */}
                        <div className="space-y-6 max-w-4xl mx-auto">
                            <h3 className="text-2xl font-black text-white flex items-center gap-3 border-b border-white/10 pb-6 uppercase tracking-widest">
                                <FiCheck className="text-blue-500" /> Comentarios de nuestros clientes
                            </h3>
                            <Reviews />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
