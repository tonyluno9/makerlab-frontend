import { useState, useEffect } from 'react';
import { FiBell, FiX, FiCheck } from 'react-icons/fi';
import api from '../api/axios';

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [unread, setUnread] = useState(0);
    const [open, setOpen] = useState(false);

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        if (!user) return;
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchNotifications = async () => {
        try {
            const { data } = await api.get('/notifications');
            setNotifications(data.data || []);
            setUnread(data.unread || 0);
        } catch {
            // silently fail
        }
    };

    const markAllRead = async () => {
        try {
            await api.patch('/notifications/read-all');
            setUnread(0);
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        } catch { }
    };

    const markRead = async (id) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            setUnread(prev => Math.max(0, prev - 1));
        } catch { }
    };

    if (!user) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
                <FiBell size={20} />
                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                        {unread > 9 ? '9+' : unread}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-10 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <span className="font-black text-sm text-gray-900">Notificaciones</span>
                        <div className="flex items-center gap-2">
                            {unread > 0 && (
                                <button onClick={markAllRead} className="text-[10px] text-blue-600 font-bold hover:underline">
                                    Marcar todas
                                </button>
                            )}
                            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <FiX size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="py-8 text-center text-gray-400 text-sm">
                                Sin notificaciones
                            </div>
                        ) : (
                            notifications.map(n => (
                                <div
                                    key={n.id}
                                    className={`px-4 py-3 border-b border-gray-50 flex items-start gap-3 cursor-pointer hover:bg-gray-50 transition-colors ${!n.is_read ? 'bg-blue-50/40' : ''}`}
                                    onClick={() => !n.is_read && markRead(n.id)}
                                >
                                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.is_read ? 'bg-blue-500' : 'bg-gray-200'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-gray-900 leading-tight">{n.title}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                                        <p className="text-[10px] text-gray-300 mt-1">
                                            {new Date(n.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    {!n.is_read && (
                                        <button className="text-blue-400 hover:text-blue-600 flex-shrink-0">
                                            <FiCheck size={14} />
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}