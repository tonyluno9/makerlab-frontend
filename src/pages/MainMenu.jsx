import { FiArrowRight, FiZap, FiClock, FiTarget, FiTrendingUp, FiX, FiChevronRight } from 'react-icons/fi';
import { LuLayers, LuPalette, LuBox } from 'react-icons/lu';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

// Importar assets del hero
import hero1 from '../assets/hero-1.png';
import hero2 from '../assets/hero-2.png';
import hero3 from '../assets/hero-3.png';
import collaboratorImg from '../assets/collaborator.png';
import teamBg from '../assets/hero-team-bg.png';
import collaboratorFinalHD from '../assets/collaborator-final-hd.png';
import heroDesigns from '../assets/hero-designs.png';

export default function MainMenu({ onNavigate, navigationData, setNavigationData }) {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();
  const t = translations[language];

  const slides = [
    {
      id: 0,
      title: t.heroSlide1Title,
      description: t.heroSlide1Desc,
      image: hero1,
      tag: t.impresionProfesional
    },
    {
      id: 1,
      title: t.heroSlide2Title,
      description: t.heroSlide2Desc,
      image: hero2,
      tag: 'Diseño e Innovación'
    },
    {
      id: 2,
      title: t.heroSlide3Title,
      description: t.heroSlide3Desc,
      image: hero3,
      tag: 'Materiales Premium'
    },
    {
      id: 3,
      title: t.heroSlideTeamTitle,
      description: t.heroSlideTeamDesc,
      tag: t.expertosArea,
      isCollaborator: true,
      image: collaboratorFinalHD
    },
    {
      id: 4,
      title: t.heroSlideDesignsTitle,
      description: t.heroSlideDesignsDesc,
      image: heroDesigns,
      tag: 'Diseños de Clientes'
    }
  ];

  // Timer para cambio automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <FiZap size={24} />,
      title: t.rapido,
      description: t.cotizacionRapida
    },
    {
      icon: <FiTarget size={24} />,
      title: t.preciso,
      description: t.tolerancias
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: t.escalable,
      description: t.desdePrototipos
    },
    {
      icon: <FiClock size={24} />,
      title: t.soporteContinuo,
      description: t.soporteContinuoDesc
    }
  ];

  const materials = [
    {
      icon: <LuLayers size={32} />,
      name: t.pla,
      desc: t.plaDesc,
      price: t.precioGramo,
      details: {
        title: t.impresionPLA,
        description: t.descPLA,
        features: [
          t.caracteristicasPLA1,
          t.caracteristicasPLA2,
          t.caracteristicasPLA3,
          t.caracteristicasPLA4,
          t.caracteristicasPLA5,
          t.caracteristicasPLA6
        ],
        bestFor: t.mejorParaPLA,
        quality: t.calidadPLA
      }
    },
    {
      icon: <LuBox size={32} />,
      name: t.abs,
      desc: t.absDesc,
      price: t.precioAbsGramo,
      details: {
        title: t.impresionABS,
        description: t.descABS,
        features: [
          t.caracteristicasABS1,
          t.caracteristicasABS2,
          t.caracteristicasABS3,
          t.caracteristicasABS4,
          t.caracteristicasABS5,
          t.caracteristicasABS6
        ],
        bestFor: t.mejorParaABS,
        quality: t.calidadABS
      }
    },
    {
      icon: <LuPalette size={32} />,
      name: t.resina,
      desc: t.resinaDesc,
      price: t.precioResinaGramo,
      details: {
        title: t.impresionResina,
        description: t.descResina,
        features: [
          t.caracteristicasResina1,
          t.caracteristicasResina2,
          t.caracteristicasResina3,
          t.caracteristicasResina4,
          t.caracteristicasResina5,
          t.caracteristicasResina6
        ],
        bestFor: t.mejorParaResina,
        quality: t.calidadResina
      }
    }
  ];

  const steps = [
    { num: '1', title: t.pasoUno, desc: t.pasoUnoDesc },
    { num: '2', title: t.pasoDos, desc: t.pasoDosDesc },
    { num: '3', title: t.pasoTres, desc: t.pasoTresDesc },
    { num: '4', title: t.pasoCuatro, desc: t.pasoCuatroDesc }
  ];

  // Manejar navegación desde el footer o externos
  useEffect(() => {
    if (navigationData && navigationData.scrollTo === 'materials') {
      const section = document.getElementById('materials-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }

      if (navigationData.material) {
        const materialToSelect = materials.find(m => 
          m.name.toLowerCase().includes(navigationData.material.toLowerCase()) || 
          m.details.title.toLowerCase().includes(navigationData.material.toLowerCase())
        );
        if (materialToSelect) {
          // Un pequeño delay para que el scroll empiece antes de abrir el modal
          setTimeout(() => {
            setSelectedMaterial(materialToSelect);
          }, 100);
        }
      }
      
      // Limpiar data después de usarla para no repetir el efecto
      if (setNavigationData) {
        setNavigationData(null);
      }
    }
  }, [navigationData, setNavigationData, materials]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onNavigate={onNavigate} currentPage="mainmenu" />

      {/* Hero Section - NVIDIA Style Carousel */}
      <section className="relative h-[650px] bg-[#000] overflow-hidden flex items-center">
        {/* Background Image with Crossfade */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover scale-105 ${slide.isCollaborator ? '' : 'object-center'}`}
            />
          </div>
        ))}

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 text-left">
            <div className="overflow-hidden mb-4">
              <span className="inline-block px-3 py-1 bg-[#0ea5e9] text-black text-[10px] font-black uppercase tracking-widest animate-slideUp">
                {slides[currentSlide].tag}
              </span>
            </div>

            <div className="overflow-hidden mb-6 h-[150px] md:h-[180px] lg:h-[220px]">
              <h1 className="text-4xl lg:text-7xl font-black text-white leading-[1.1] animate-slideUp">
                {slides[currentSlide].title}
              </h1>
            </div>

            <div className="overflow-hidden mb-10">
              <p className="text-lg lg:text-xl text-gray-300 max-w-xl animate-slideUp animation-delay-200">
                {slides[currentSlide].description}
              </p>
            </div>

            <button
              onClick={() => onNavigate('designs')}
              className="group inline-flex items-center gap-4 px-10 py-4 bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-black uppercase tracking-widest text-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            >
              {t.comenzar} <FiChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right Controls (Thumbnails) */}
          <div className="lg:col-span-5 flex flex-col gap-3 hidden lg:flex justify-center items-end">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`group relative w-72 p-5 text-left border-l-4 transition-all duration-300 backdrop-blur-md ${index === currentSlide ? 'border-red-500 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
              >
                <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1 group-hover:text-red-500 transition-colors">
                  0{index + 1} PROYECTO
                </div>
                <div className={`text-xs font-black uppercase tracking-wider transition-colors ${index === currentSlide ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                  }`}>
                  {slide.tag}
                </div>

                {/* Progress bar for active slide */}
                {index === currentSlide && (
                  <div className="absolute bottom-0 left-0 h-[3px] bg-red-500 animate-progress-bar" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t.porQueElegirnos}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="group p-6 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl transition-all duration-300">
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section id="materials-section" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">{t.materialesDisponibles}</h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">{t.detallesMateriales}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((material, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedMaterial(material)}
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <div className="text-blue-600 mb-4">{material.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{material.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{material.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">{material.price}</div>
                  <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{t.verMas}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Details Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-white text-4xl">{selectedMaterial.icon}</div>
                <h2 className="text-3xl font-bold">{selectedMaterial.details.title}</h2>
              </div>
              <button
                onClick={() => setSelectedMaterial(null)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="p-8">
              <p className="text-lg text-gray-700 mb-6">{selectedMaterial.details.description}</p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">📍 {t.mejorPara}</h3>
                  <p className="text-sm text-gray-700">{selectedMaterial.details.bestFor}</p>
                </div>
                <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-200">
                  <h3 className="font-semibold text-gray-900 mb-2">⭐ {t.calidad}</h3>
                  <p className="text-sm text-gray-700">{selectedMaterial.details.quality}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.caracteristicasPrincipales}</h3>
                <ul className="space-y-2">
                  {selectedMaterial.details.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="text-blue-500 font-bold mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{t.precioPorGramo}</p>
                    <p className="text-3xl font-bold text-blue-600">{selectedMaterial.price}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedMaterial(null);
                      onNavigate('upload');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
                  >
                    {t.subirDisenoBtnModal}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Process Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{t.nuestro}</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-lg">
                    {step.num}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">{step.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{step.desc}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
      <ChatWidget />
    </div>
  );
}
