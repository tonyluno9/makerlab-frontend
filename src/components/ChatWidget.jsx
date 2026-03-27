import { useState, useRef, useEffect } from 'react';
import { LuX, LuMessageCircle, LuSend, LuLoader } from 'react-icons/lu';

// Función para obtener respuesta de IA
async function getAIResponse(userMessage) {
  try {
    // Usar una API gratuita de IA - HuggingFace
    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1', {
      headers: { Authorization: 'Bearer hf_yQwtnZKPfzfKpDWXXXXXXXXXXXXXXXX' }, // Nota: Usar token gratuito o endpoint local
      method: 'POST',
      body: JSON.stringify({
        inputs: `Eres un asistente de atención al cliente para una empresa de impresión 3D llamada "Moran Creative". 
        Responde de forma amable, profesional y concisa en español.
        Contexto de servicios: Ofrecemos impresión 3D con materiales PLA, PLA+, ABS, PETG y Resina.
        
        Pregunta del cliente: ${userMessage}
        
        Respuesta:`,
        parameters: { max_length: 150 }
      }),
    });

    if (!response.ok) {
      // Si la API falla, usar respuestas locales inteligentes
      return getLocalAIResponse(userMessage);
    }

    const result = await response.json();
    return result[0]?.generated_text?.split('Respuesta:')[1]?.trim() || getLocalAIResponse(userMessage);
  } catch (error) {
    // Fallback a respuestas locales si hay error
    return getLocalAIResponse(userMessage);
  }
}

// Sistema de IA local inteligente con memoria de contexto
function getLocalAIResponse(message, fullHistory = []) {
  const lowerMessage = message.toLowerCase().trim();

  // Buscar el último mensaje de la IA para entender el contexto
  const lastAIMessage = [...fullHistory].reverse().find(m => m.sender === 'ai')?.text.toLowerCase() || "";

  // 1. Manejo de respuestas de confirmación o elección directa (ej: "si", "subir diseño")
  const isShortAffirmation = ['si', 'sí', 'claro', 'va', 'ok', 'dale', 'afirmativo', 'me interesa', 'por favor', 'venga', 'listo', 'ya'].includes(lowerMessage);
  const isDirectUploadChoice = lowerMessage.includes('subir') || lowerMessage.includes('diseño') || lowerMessage.includes('archivo');

  if (isShortAffirmation || (isDirectUploadChoice && (lastAIMessage.includes('subir') || lastAIMessage.includes('cotización') || lastAIMessage.includes('diseño')))) {
    if (lastAIMessage.includes('cotización') || lastAIMessage.includes('archivo') || lastAIMessage.includes('diseño') || lastAIMessage.includes('listo')) {
      return '🚀 **¡Correcto! Sigue estos pasos finales:**\n\n' +
        '1️⃣ Haz clic en **"Subir Diseño"** en el menú de arriba.\n' +
        '2️⃣ **Pone tu diseño**: Carga el archivo (STL/OBJ).\n' +
        '3️⃣ **Completos tus datos**: Nombre, correo y teléfono.\n' +
        '4️⃣ **Personaliza**: Elige material y cantidad.\n\n' +
        '¡Y listo! Ya podrás descargar tu PDF. ¿Quieres saber algo más sobre los materiales antes?';
    }
    if (lastAIMessage.includes('materiales') || lastAIMessage.includes('precios')) {
      return '🔬 **Resumen de materiales y precios:**\n\n' +
        '• **PLA ($0.05/g)**: Ecológico y versátil.\n' +
        '• **ABS ($0.08/g)**: Fuerte y duradero.\n' +
        '• **Resina ($0.20/g)**: Ultra-detalle joyería/figuras.\n\n' +
        '¿Cuál material crees que le sirve más a tu pieza?';
    }
  }

  // 2. Detección de fuera de tema mejorada (Regex más robusta)
  const is3DRelated = /impresi|3d|stl|obj|material|pla|abs|resina|petg|precio|costo|cotiza|envio|tiempo|entrega|pedido|diseno|pieza|crear|maker|moran|paso|como|pasos|subir|archivo|listo|donde|hacer/i.test(lowerMessage);
  const greetingKeywords = ['hola', 'buenos', 'hi', 'tal', 'que hay', 'que haces', 'buenas'];
  const isGreeting = greetingKeywords.some(kw => lowerMessage.includes(kw));

  if (!is3DRelated && !isGreeting && lowerMessage.length > 3) {
    return '🤔 Lo siento, solo puedo apoyarte en temas de **Moran Creative** e **impresión 3D**.\n\n¿Quieres saber los precios de materiales o cómo subir tu diseño para cotizar?';
  }

  // 3. Proceso de Cotización o Subida Directa
  if (lowerMessage.includes('cómo') || lowerMessage.includes('como') || lowerMessage.includes('cotizar') || lowerMessage.includes('proceso') || lowerMessage.includes('pasos') || (lowerMessage.includes('subir') && lowerMessage.includes('diseño'))) {
    return '📲 **Para tu cotización:**\n\n' +
      'Ve a la pestaña **"Subir Diseño"**. Allí deberás **poner tu diseño**, **completar tus datos** (Nombre, Email, Teléfono) y seleccionar material.\n\n' +
      'Manejamos:\n• **PLA**: $0.05/g\n• **ABS**: $0.08/g\n• **Resina**: $0.20/g\n\n¿Tienes tu diseño listo o prefieres saber más de algún material antes?';
  }

  // 4. Materiales y Precios
  if (lowerMessage.includes('material') || lowerMessage.includes('pla') || lowerMessage.includes('resina') || lowerMessage.includes('abs') || lowerMessage.includes('petg')) {
    return '🔬 **Precios en Moran Creative:**\n\n' +
      '• **PLA/PLA+**: $0.05 por gramo.\n' +
      '• **ABS/PETG**: $0.08 por gramo.\n' +
      '• **Resina**: $0.20 por gramo.\n\n' +
      '¿Deseas ir directo a **Subir Diseño** para cotizar tu pieza o prefieres que te hable más de algún material?';
  }

  // Saludos
  if (isGreeting) {
    return '👋 ¡Hola! Soy el experto de **Moran Creative**. \n\n¿Deseas saber sobre materiales y precios, o prefieres que te explique cómo subir tu diseño para cotizar?';
  }

  // Respuesta por defecto
  return '✨ Recuerda que para cotizar debes **poner tu diseño** y **completar tus datos** en la sección de **"Subir Diseño"**.\n\n¿En qué más te puedo ayudar hoy?';
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '👋 ¡Hola! Soy el experto de Moran Creative. ¿Deseas saber sobre nuestros materiales (PLA, ABS, Resina), precios o cómo realizar una cotización?', sender: 'ai', timestamp: new Date(Date.now() - 60000) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const userText = inputValue;

      // 3. Verificación de repetición mejorada
      const lastUserMsg = messages.filter(m => m.sender === 'user').pop();
      if (lastUserMsg && userText.toLowerCase().trim() === lastUserMsg.text.toLowerCase().trim() && !['si', 'sí', 'no', 'claro', 'ok', 'va'].includes(userText.toLowerCase().trim())) {
        const repeatMsg = {
          id: messages.length + 1,
          text: 'Entiendo que es un detalle importante. Como te mencioné, puedes **poner tu diseño** en la pestaña de **"Subir Diseño"**. ¿Tienes alguna otra duda?',
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages([...messages, { id: messages.length + 2, text: userText, sender: 'user', timestamp: new Date() }, repeatMsg]);
        setInputValue('');
        return;
      }

      const newMessage = {
        id: messages.length + 1,
        text: userText,
        sender: 'user',
        timestamp: new Date()
      };

      setMessages([...messages, newMessage]);
      setInputValue('');
      setIsLoading(true);

      // Obtener respuesta de IA
      setTimeout(async () => {
        const aiResponse = await getLocalAIResponse(userText, messages);
        const aiMessage = {
          id: messages.length + 2,
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 400);
    }
  };

  return (
    <>
      {/* Chat Button Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-12 right-6 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all z-40 hover:scale-110"
        title="Asistente IA"
      >
        {isOpen ? <LuX size={24} /> : <LuMessageCircle size={24} />}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 w-96 bg-white rounded-2xl shadow-2xl flex flex-col h-96 z-50 animate-fade-in border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-semibold">Asistente IA</h3>
            <p className="text-xs text-red-100">Responde al instante</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm leading-relaxed ${msg.sender === 'user'
                    ? 'bg-red-500 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none whitespace-pre-wrap'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-lg px-4 py-2 rounded-bl-none flex items-center gap-2">
                  <LuLoader size={14} className="animate-spin" />
                  <span className="text-xs">Pensando...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-3 rounded-b-2xl bg-white flex gap-2">
            <input
              type="text"
              placeholder="Escribe tu pregunta..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm disabled:bg-gray-100"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors disabled:bg-gray-400"
            >
              <LuSend size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
