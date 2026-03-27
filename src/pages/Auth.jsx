import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import api from '../api/axios';
import moranLogo from '../assets/Moran Creative Logo.png';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiPhone, FiMapPin, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

export default function Auth({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language, setLanguage } = useLanguage();

  // Lock body scroll when on Auth page
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleEnterFocus = (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const form = e.target.form;
    if (!form) return;
    const focusables = Array.from(form.querySelectorAll('input, button'))
      .filter((el) => !el.disabled && el.type !== 'hidden');
    const idx = focusables.indexOf(e.target);
    if (idx > -1 && idx < focusables.length - 1) {
      const next = focusables[idx + 1];
      next.focus();
      if (next.tagName.toLowerCase() === 'button' && next.type === 'submit') next.click();
    }
  };

  const t = translations[language];

  const handleAction = async (e) => {
    e.preventDefault();
    setRegSuccess(false);
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      if (isSignUp) {
        await api.post('/auth/register', {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          password: data.password,
          password_confirmation: data.password_confirmation
        });
        setRegSuccess(true);
        setIsSignUp(false);
      } else {
        const res = await api.post('/auth/login', {
          email: data.email,
          password: data.password
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        if (onLogin) onLogin(res.data.user);
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      alert(errors ? Object.values(errors).flat().join('\n') : (err.response?.data?.message || 'Error en la autenticación.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">

      {/* Background Layer */}
      <div className="absolute inset-0 bg-[#0a0a0a]"></div>
      <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>

      {/* Centered Pro Card */}
      <div className="w-full max-w-5xl bg-[#121212] rounded-[3rem] shadow-[0_50px_120px_rgba(0,0,0,1)] border border-white/5 flex flex-col md:flex-row overflow-hidden relative z-10 animate-fade-up">

        {/* Top Window Decoration */}
        <div className="absolute top-8 left-10 flex gap-2 z-40 lg:flex hidden">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
        </div>

        {/* --- LEFT: FORM SECTION --- */}
        <div className="flex-[1.1] flex flex-col h-[650px] md:h-[min(750px,90vh)] relative bg-[#121212]">

          {/* Header (Branding + Lang selector - fixed at top) */}
          <div className="px-10 pt-10 pb-4 flex justify-between items-center bg-[#121212] z-40">
            <div className="flex items-center gap-3 animate-fade-up">
              {/* Moran Creative Logo */}
              <img src={moranLogo} alt="Moran Creative" className="h-10 w-auto" />

              {/* Maker Lab Text Branding (Matching Main Page) */}
              <span className="text-xl font-black tracking-tighter text-white leading-none uppercase">
                MAKER <span className="text-blue-500">LAB</span>
              </span>
            </div>

            <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
              {['ES', 'EN'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest transition-all ${language === lang ? 'bg-white/10 text-white shadow-sm' : 'text-white/20 hover:text-white/40'
                    }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* INTERNAL FORM SCROLL */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-10 md:px-16 pb-12">
            <div className="mt-4 mb-10">
              <h1 className="text-4xl font-black text-white tracking-tighter leading-none animate-fade-up delay-100">
                {isSignUp ? t.crearCuenta : t.iniciarSesion}
              </h1>
              <p className="text-white/20 text-sm font-medium mt-3 animate-fade-up delay-200">
                {isSignUp ? t.crearCuentaDesc : t.bienvenidoDesc}
              </p>

              {regSuccess && !isSignUp && (
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3 text-green-400 text-xs font-bold animate-fadeIn">
                  <FiCheckCircle size={18} />
                  {language === 'ES' ? '¡Registro exitoso! Iniciemos sesión.' : 'Success! Now sign in.'}
                </div>
              )}
            </div>

            <form className="space-y-7" onSubmit={handleAction}>
              {isSignUp && (
                <div className="animate-fade-up delay-300">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 block">{t.nombreCompleto}</label>
                  <div className="relative group">
                    <FiUser className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      name="name" type="text" required placeholder="Juan Pérez" onKeyDown={handleEnterFocus}
                      className="w-full bg-[#181818] border border-white/5 pl-14 pr-6 py-5 rounded-2xl text-white focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-white/5"
                    />
                  </div>
                </div>
              )}

              <div className="animate-fade-up delay-400">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 block">{t.email}</label>
                <div className="relative group">
                  <FiMail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    name="email" type="email" required placeholder="tu@correo.com" onKeyDown={handleEnterFocus}
                    className="w-full bg-[#181818] border border-white/5 pl-14 pr-6 py-5 rounded-2xl text-white focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-white/5"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-7 animate-fade-up delay-500">
                  <div>
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 block">{t.telefono}</label>
                    <div className="relative group">
                      <FiPhone className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        name="phone" type="text" required placeholder="981 123 4567" onKeyDown={handleEnterFocus}
                        className="w-full bg-[#181818] border border-white/5 pl-14 pr-6 py-5 rounded-2xl text-white focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-white/5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 block">{t.direccion}</label>
                    <div className="relative group">
                      <FiMapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-blue-500 transition-colors" />
                      <input
                        name="address" type="text" required placeholder="Calle 123, Col. Centro..." onKeyDown={handleEnterFocus}
                        className="w-full bg-[#181818] border border-white/5 pl-14 pr-6 py-5 rounded-2xl text-white focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-white/5"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="animate-fade-up delay-600">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">{t.contrasena}</label>
                  {!isSignUp && (
                    <button type="button" className="text-[9px] font-bold text-white/20 hover:text-blue-500 transition-colors uppercase tracking-widest leading-none">
                      {language === 'ES' ? '¿Olvidaste?' : 'Forgot?'}
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••" onKeyDown={handleEnterFocus}
                    className="w-full bg-[#181818] border border-white/5 pl-14 pr-16 py-5 rounded-2xl text-white focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-white/5"
                  />
                  <button
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 hover:text-white transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="animate-fade-up delay-700">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-3 block">{t.confirmarContrasena}</label>
                  <div className="relative group">
                    <FiLock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      name="password_confirmation" type={showPassword ? "text" : "password"} required placeholder="••••••••" onKeyDown={handleEnterFocus}
                      className="w-full bg-[#181818] border border-white/5 pl-14 pr-6 py-5 rounded-2xl text-white focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-white/5"
                    />
                  </div>
                </div>
              )}

              <div className="pt-8 flex flex-col gap-6 animate-fade-up delay-800">
                <button
                  type="submit" disabled={isLoading}
                  className="w-full py-5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl transition-all shadow-2xl shadow-blue-900/10 flex items-center justify-center gap-3"
                >
                  {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>{isSignUp ? t.crearCuentaBtn : t.iniciarSesionBtn} <FiArrowRight size={18} /></>}
                </button>

                <button
                  type="button"
                  onClick={() => { setIsSignUp(!isSignUp); setRegSuccess(false); }}
                  className="w-full py-4 rounded-2xl border border-white/5 text-[10px] font-black text-white/30 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest"
                >
                  {isSignUp ? t.conCuenta : t.sinCuenta}
                </button>
              </div>
            </form>
          </div>

          {/* Fixed Footer */}
          <div className="px-10 py-6 border-t border-white/5 text-center hidden md:block bg-[#121212] z-20">
            <p className="text-[9px] text-white/10 font-bold uppercase tracking-[0.5em]">
              © {new Date().getFullYear()} Moran Creative • Maker Lab
            </p>
          </div>
        </div>

        {/* --- RIGHT: 3D TECHNICAL ILLUSTRATION --- */}
        <div className="hidden md:flex flex-1 bg-[#0a0a0a] relative flex-col items-center justify-center p-20 overflow-hidden border-l border-white/5 h-[min(750px,90vh)]">

          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
          </div>

          {/* Pulsing focal point */}
          <div className="absolute w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>

          {/* Animated 3D Cube (Technical) */}
          <div className="perspective-1000 relative z-10 w-64 h-64 flex items-center justify-center scale-110">
            <div className="w-32 h-32 relative animate-rotate-3d">
              {/* Cube Faces */}
              <div className="absolute inset-0 border-2 border-blue-500/20 bg-blue-500/5 translate-z-[64px]"></div>
              <div className="absolute inset-0 border-2 border-blue-500/20 bg-blue-500/5 rotate-y-90 translate-z-[64px]"></div>
              <div className="absolute inset-0 border-2 border-blue-500/20 bg-blue-500/5 rotate-y-180 translate-z-[64px]"></div>
              <div className="absolute inset-0 border-2 border-blue-500/20 bg-blue-500/5 rotate-y-270 translate-z-[64px]"></div>
              <div className="absolute inset-0 border-2 border-blue-500/20 bg-blue-500/5 rotate-x-90 translate-z-[64px]"></div>
              <div className="absolute inset-0 border-2 border-blue-500/20 bg-blue-500/5 rotate-x-270 translate-z-[64px]"></div>
            </div>

            {/* Core light */}
            <div className="absolute w-4 h-4 bg-blue-400 rounded-full blur-md opacity-50"></div>
          </div>

          <div className="absolute bottom-20 text-center opacity-20">
            <p className="text-white text-[9px] font-black uppercase tracking-[0.8em]">Maker Lab Intelligence</p>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto"></div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes rotate-3d {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }
        .animate-rotate-3d {
          animation: rotate-3d 40s infinite linear;
          transform-style: preserve-3d;
        }
        .perspective-1000 { perspective: 1000px; }
        .translate-z-\\[64px\\] { transform: translateZ(64px); }
        .rotate-y-90  { transform: rotateY(90deg) translateZ(64px); }
        .rotate-y-180 { transform: rotateY(180deg) translateZ(64px); }
        .rotate-y-270 { transform: rotateY(270deg) translateZ(64px); }
        .rotate-x-90  { transform: rotateX(90deg) translateZ(64px); }
        .rotate-x-270 { transform: rotateX(-90deg) translateZ(64px); }
        
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
}
