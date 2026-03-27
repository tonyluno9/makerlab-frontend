import moranLogo from '../assets/Moran Creative Logo.png';

export default function Footer({ onNavigate }) {
  const handleServiceClick = (e, material) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('mainmenu', { scrollTo: 'materials', material });
    }
  };

  const handleInfoClick = (e, section) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('mainmenu', { scrollTo: section });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={moranLogo} alt="Moran Creative" className="h-8 w-auto brightness-0 invert" />
              <span className="text-xl font-black tracking-tighter text-white leading-none">
                MAKER <span className="text-blue-500">LAB</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-xs">Transformando ideas en realidad a través de la impresión 3D profesional.</p>
          </div>

          {/* Services */}
          <div className="col-span-6 md:col-span-3">
            <h4 className="text-white font-semibold mb-3">Servicios</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={(e) => handleServiceClick(e, 'PLA')} className="text-gray-400 hover:text-white transition bg-transparent border-none p-0">Impresión PLA</button></li>
              <li><button onClick={(e) => handleServiceClick(e, 'ABS')} className="text-gray-400 hover:text-white transition bg-transparent border-none p-0">Impresión ABS</button></li>
              <li><button onClick={(e) => handleServiceClick(e, 'Resina')} className="text-gray-400 hover:text-white transition bg-transparent border-none p-0">Resina</button></li>
              <li><button onClick={(e) => onNavigate('upload')} className="text-gray-400 hover:text-white transition bg-transparent border-none p-0">Diseño personalizado</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-6 md:col-span-5">
            <h4 className="text-white font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">+52 951 297 4496</li>
              <li className="text-gray-400">+52 981 399 1081</li>
              <li className="text-gray-400">+52 981 384 2650</li>
              <li className="text-gray-400">moranprint.mx@gmail.com</li>
              <li className="text-gray-400">Campeche, México</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex items-center justify-between">
          <p className="text-sm text-gray-400">© 2026 Moran Creative. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/1CHqUC89Ds/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">Facebook</a>
            <a href="https://www.tiktok.com/@moranprint.mx?_r=1&_t=ZS-94BF4AZiIuj" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
