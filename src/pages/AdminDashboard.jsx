import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Header from '../components/Header';
import { FiX, FiDownload, FiInfo, FiPlay, FiCheckCircle, FiPackage, FiDollarSign } from 'react-icons/fi';

export default function AdminDashboard({ onNavigate }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders');
      // Soportamos tanto si el backend envía el array directo o paginado
      setOrders(response.data.data || response.data); 
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, {
        status: newStatus,
        note: `Estado actualizado a ${newStatus} por el administrador.`
      });
      alert('¡Estado actualizado y cliente notificado por correo!');
      fetchOrders(); 
      setSelectedOrder(null); 
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al actualizar el estado.';
      alert(msg);
    }
  };

  const handleDownload = async (fileId, fileName) => {
    try {
      const response = await api.get(`/orders/files/${fileId}/download`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("No se pudo descargar el archivo.");
    }
  };

  const handleSendQuote = async (orderId, price) => {
    if (!price || price <= 0) return alert("Ingresa un precio válido.");
    try {
      await api.patch(`/orders/${orderId}/quote`, {
        quoted_price: price,
        admin_notes: "Cotización enviada desde el panel."
      });
      alert('¡Cotización enviada!');
      fetchOrders(); 
      setSelectedOrder(null); 
    } catch (error) {
      alert('Error al enviar cotización.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onNavigate={onNavigate} currentPage="admin" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-black text-slate-800 mb-8">Gestión de Taller</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Ticket</th>
                  <th className="p-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Cliente</th>
                  <th className="p-4 font-black text-[10px] uppercase text-slate-400 tracking-widest">Estado / Alerta</th>
                  <th className="p-4 font-black text-[10px] uppercase text-slate-400 tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  // DETECCIÓN DE PAGO: Revisamos si ya subió el comprobante
                  const hasProof = order.files?.some(f => f.original_name.includes('Comprobante'));
                  const needsValidation = order.status === 'aceptado' && hasProof;

                  return (
                    <tr key={order.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${needsValidation ? 'bg-indigo-50/30' : ''}`}>
                      <td className="p-4 font-black text-slate-900">
                        <div className="flex items-center gap-2">
                          {order.ticket}
                          {needsValidation && (
                            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Pago recibido"></span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-slate-700">{order.user?.name}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                            ${order.status === 'solicitado' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                              order.status === 'cotizado' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                              order.status === 'aceptado' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                              order.status === 'en_produccion' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              order.status === 'listo' ? 'bg-green-50 text-green-700 border-green-200' :
                              'bg-slate-100 text-slate-500 border-slate-200'}`}>
                            {order.status.replace('_', ' ')}
                          </span>
                          {needsValidation && (
                            <span className="flex items-center gap-1 text-[9px] font-black text-green-600 uppercase bg-green-100 px-2 py-1 rounded-md">
                              <FiDollarSign /> Pago por validar
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-white hover:bg-blue-600 font-bold text-xs bg-blue-50 px-4 py-2 rounded-xl transition-all"
                        >
                          <FiInfo size={14} /> Gestionar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slideUp" onClick={(e) => e.stopPropagation()}>
            
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black">Ticket: <span className="text-blue-400">{selectedOrder.ticket}</span></h2>
                <p className="text-slate-400 text-sm">Cliente: {selectedOrder.user?.name}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full transition-colors">
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto bg-slate-50 flex-1">
              {/* Sección de Archivos */}
              <div className="mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Expediente</h3>
                {selectedOrder.files?.map(file => {
                  const isProof = file.original_name.includes('Comprobante');
                  return (
                    <div key={file.id} className={`flex items-center justify-between p-3 rounded-xl mb-2 last:mb-0 border ${isProof ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-100'}`}>
                      <div>
                        <p className={`font-bold text-sm ${isProof ? 'text-green-950' : 'text-blue-900'}`}>
                           {isProof ? '📸 COMPROBANTE DE PAGO' : file.original_name}
                        </p>
                        <p className="text-[10px] opacity-60 uppercase font-bold">{(file.size_bytes / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button 
                        onClick={() => handleDownload(file.id, file.original_name)}
                        className={`p-2 rounded-lg text-white ${isProof ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                      >
                        <FiDownload size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">Instrucciones del Cliente</h3>
                <p className="text-sm text-amber-900 whitespace-pre-line leading-relaxed">{selectedOrder.notes || 'Sin notas.'}</p>
              </div>
            </div>

            {/* Acciones del Administrador */}
            <div className="bg-white border-t border-slate-200 p-6 flex items-center justify-end gap-4">
              
              {selectedOrder.status === 'solicitado' && (
                <div className="flex items-center gap-3 w-full">
                  <input 
                    type="number" 
                    id={`price-admin-${selectedOrder.id}`}
                    placeholder="Precio final MXN" 
                    className="flex-1 pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                  <button 
                    onClick={() => handleSendQuote(selectedOrder.id, document.getElementById(`price-admin-${selectedOrder.id}`).value)}
                    className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black uppercase text-xs shadow-lg"
                  >
                    Enviar Cotización
                  </button>
                </div>
              )}

              {selectedOrder.status === 'aceptado' && (
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'en_produccion')} 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2 shadow-xl shadow-indigo-100"
                >
                  <FiPlay /> Validar Pago e Iniciar Impresión
                </button>
              )}

              {selectedOrder.status === 'en_produccion' && (
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'listo')} 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2"
                >
                  <FiCheckCircle /> Marcar como Terminado
                </button>
              )}

              {selectedOrder.status === 'listo' && (
                <button 
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'entregado')} 
                  className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl font-black uppercase text-xs flex items-center justify-center gap-2"
                >
                  <FiPackage /> Confirmar Entrega Final
                </button>
              )}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}