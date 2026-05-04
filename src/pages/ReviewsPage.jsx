import { useState, useEffect } from 'react';
import { FiStar, FiSend } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import api from '../api/axios';

function StarRating({ value, onChange, readonly = false }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    onClick={() => onChange && onChange(star)}
                    onMouseEnter={() => !readonly && setHovered(star)}
                    onMouseLeave={() => !readonly && setHovered(0)}
                    className={`text-2xl transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
                >
                    <FiStar
                        size={24}
                        className={`${(hovered || value) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} transition-colors`}
                        fill={(hovered || value) >= star ? '#facc15' : 'none'}
                    />
                </button>
            ))}
        </div>
    );
}

export default function ReviewsPage({ onNavigate }) {
    const [reviews, setReviews] = useState([]);
    const [average, setAverage] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const { data } = await api.get('/reviews');
            setReviews(data.data || []);
            setAverage(data.average || 0);
            setTotal(data.total || 0);
        } catch {
            setError('No se pudieron cargar las reseñas.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (comment.trim().length < 10) {
            setError('El comentario debe tener al menos 10 caracteres.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            await api.post('/reviews', { rating, comment });
            setSuccess('¡Reseña publicada exitosamente!');
            setComment('');
            setRating(5);
            fetchReviews();
        } catch (err) {
            setError(err.response?.data?.message || 'Error al publicar la reseña.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header onNavigate={onNavigate} currentPage="reviews" />

            <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-gray-900 mb-2">
                        Reseñas de <span className="text-blue-600">Clientes</span>
                    </h1>
                    <div className="h-1 w-16 bg-blue-600 mx-auto mb-4 rounded-full" />
                    {total > 0 && (
                        <div className="flex items-center justify-center gap-3">
                            <StarRating value={Math.round(average)} readonly />
                            <span className="text-2xl font-black text-gray-900">{average}</span>
                            <span className="text-gray-400 text-sm">({total} reseñas)</span>
                        </div>
                    )}
                </div>

                {/* Formulario nueva reseña */}
                {user && user.role !== 'admin' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                        <h2 className="text-lg font-black text-gray-900 mb-4">Deja tu reseña</h2>
                        <div className="mb-4">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Calificación</label>
                            <StarRating value={rating} onChange={setRating} />
                        </div>
                        <div className="mb-4">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Comentario</label>
                            <textarea
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                placeholder="Cuéntanos tu experiencia con Maker Lab..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none min-h-[100px]"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-black transition-colors disabled:opacity-50"
                        >
                            <FiSend size={16} />
                            {submitting ? 'Publicando...' : 'Publicar reseña'}
                        </button>
                    </div>
                )}

                {/* Lista de reseñas */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-lg">Aún no hay reseñas.</p>
                        <p className="text-sm mt-1">¡Sé el primero en dejar una!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {reviews.map(review => (
                            <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                                        {review.user_name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-gray-900">{review.user_name}</span>
                                            <span className="text-xs text-gray-400">
                                                {new Date(review.created_at).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <StarRating value={review.rating} readonly />
                                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer onNavigate={onNavigate} />
        </div>
    );
}