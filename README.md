**Moran Creative** es una plataforma web innovadora diseñada para la cotización automatizada, gestión y exploración de servicios de impresión 3D. El sistema agiliza el proceso desde que un cliente tiene un modelo (STL/OBJ) hasta la generación de presupuestos profesionales en formato PDF, complementado por un asistente virtual impulsado por Inteligencia Artificial.
## ✨ Características Principales
### 🧠 Integración de Inteligencia Artificial (Asistente Virtual)
- **ChatBot Asistente en Tiempo Real:** Integración directa con la API de Inferencia de Hugging Face utilizando el modelo `Mistral-7B-Instruct`.
- **Atención al Cliente Autónoma:** La IA es capaz de responder preguntas sobre materiales (PLA, ABS, Resina, etc.), tiempos de entrega, costos procedimentales y formatos aceptados.
- **Sistema de Respaldo Híbrido:** Si la API externa no está disponible, el sistema cuenta con un motor local de respuestas heurísticas basadas en palabras clave para garantizar 100% de disponibilidad.
### 💰 Motor de Cotización y Procesamiento de Archivos
- **Carga de Archivos 3D:** Interfaz "Drag & Drop" con validación estricta de formatos (`.stl`, `.obj`) y restricción de peso (hasta 100MB).
- **Cálculo de Variables:** Fórmulas dinámicas basadas en tipo de material (PLA, PLA+, ABS, Resina), color y cantidades solicitadas.
- **Generación de Reportes PDF:** Creación instantánea de cotizaciones profesionales exportables a PDF en tiempo real directamente desde el navegador (utilizando `jsPDF`).
### 🛍️ Galería de Diseños 3D Interactiva
- Sistema de catálogo de productos estilo '*Grid Layout*', diseñado con principios de diseño minimalista y enfoque en la conversión del usuario.
- Elementos de UI Premium: Tarjetas con efectos de *glassmorphism*, insignias superpuestas, contadores de ventas y categorización.
- Filtros dinámicos de visualización de productos.
### 🌐 Interfaz y Experiencia de Usuario (UX/UI)
- **Diseño Responsivo:** Adaptación perfecta a dispositivos móviles, tablets y escritorios usando una estrategia "Mobile-First".
- **Soporte Multi-Idioma:** Contextos incorporados para cambiar el idioma de la aplicación dinámicamente.
- **Autenticación e Interfaz Condicional:** Rutas y páginas accesibles basándose en el estado de autenticación de los usuarios.
---
## 🛠️ Tecnologías y Herramientas
### Frontend Core
- **React 19:** Renderizado eficiente y arquitectura de componentes modernos mediante Hooks.
- **Vite:** Empaquetador extremadamente rápido para una experiencia de desarrollo fluida.
### Estilos e Interfaz
- **Tailwind CSS:** Framework de utilidades para desarrollo ágil y diseño a medida.
- **DaisyUI:** Componentes semánticos sobre Tailwind para estructurar layouts rápidamente.
- **React Icons (Lucide/Feather):** Iconografía moderna, vectorizada y ligera a nivel de componente.
### Utilidades y Herramientas
- **jsPDF & html2canvas:** Generación compleja e impresión paramétrica de documentos PDF en el lado del cliente sin requerir backend.
- **Hugging Face Inference API / Fetch API:** Integración de flujos de datos asíncronos para inteligencia artificial.
---
## 🚀 Guía de Instalación (Desarrollo Local)
Si deseas ejecutar este proyecto en tu propia máquina, sigue estos pasos:
1. **Clona el repositorio**
   ```bash
   git clone https://github.com/TU_USUARIO/nombre-de-tu-repo.git
   cd nombre-de-tu-repo
## 📦 Instalación de Dependencias

Para que el proyecto funcione correctamente, necesitas instalar las siguientes dependencias principales que potencian la aplicación:

```bash
# Instala todas las dependencias del [package.json](cci:7://file:///c:/Users/kevin/OneDrive/Desktop/Proyecto%20Parcial%20Chuc/proyecto-3d-frontend/package.json:0:0-0:0)
# Esto incluye React, Vite, Tailwind CSS, DaisyUI, jsPDF, html2canvas y react-icons
npm install
---
## 📂 Arquitectura de Carpetas
El proyecto sigue una estructura modular para mantener la escalabilidad y facilitar el mantenimiento de los componentes de React:
```text
proyecto-3d-frontend/
├── public/                 # Assets estáticos públicos
├── src/
│   ├── components/         # Componentes reutilizables de UI
│   │   ├── ChatWidget.jsx  # Bot de IA (Fetch API a HuggingFace + Fallback local)
│   │   ├── Footer.jsx      # Pie de página global
│   │   ├── Header.jsx      # Barra de navegación principal
│   │   └── UserProfileAvatar.jsx
│   ├── context/            # Proveedores de estado global
│   │   └── LanguageContext.jsx # Gestión de internacionalización (i18n)
│   ├── pages/              # Vistas principales (Páginas del Router condicional)
│   │   ├── Auth.jsx        # Pantalla de Login / Registro animada
│   │   ├── Designs.jsx     # Galería de productos interactiva (Estilo E-commerce)
│   │   ├── MainMenu.jsx    # Dashboard / Hub principal
│   │   └── Upload.jsx      # Cotizador automático y generador de PDF
│   ├── App.jsx             # Punto de entrada de React y gestor de rutas
│   ├── index.css           # Estilos globales y capas de Tailwind CSS
│   ├── main.jsx            # Renderizado en el DOM
│   └── translations.js     # Diccionarios de idiomas (Español/Inglés)
├── package.json            # Dependencias y scripts del proyecto
├── tailwind.config.js      # Configuración de temas y plugins (DaisyUI)
└── vite.config.js          # Configuración del empaquetador Vite
