import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]); // Initialize as an empty array
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    // Dummy data
    const dummyBlogData = {
        english_text: "hello guys we are here in Mumbai for hackathon",
        translations: {
            Bengali: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_bn.mp3",
                text: "হ্যালো বন্ধুরা আমরা এখানে হ্যাকাথনের জন্য মুম্বাইতে এসেছি"
            },
            Gujarati: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_gu.mp3",
                text: "હેલો મિત્રો અમે અહીં હેકાથોન માટે મુંબઈમાં છીએ"
            },
            Hindi: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_hi.mp3",
                text: "नमस्कार दोस्तों, हम यहां हैकथॉन के लिए मुंबई में हैं"
            },
            Kannada: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_kn.mp3",
                text: "ಹಲೋ ಗೆಳೆಯರೇ ನಾವು ಹ್ಯಾಕಥಾನ್‌ಗಾಗಿ ಮುಂಬೈನಲ್ಲಿದ್ದೇವೆ"
            },
            Malayalam: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_ml.mp3",
                text: "ഹലോ സുഹൃത്തുക്കളെ ഞങ്ങൾ ഹാക്കത്തോണിനായി മുംബൈയിലാണ്"
            },
            Marathi: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_mr.mp3",
                text: "नमस्कार मित्रांनो आम्ही हॅकाथॉनसाठी मुंबईत आहोत"
            },
            Odia: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_or.mp3",
                text: "ନମସ୍କାର ବନ୍ଧୁମାନେ ଆମେ ହାକାଥନ୍ ପାଇଁ ମୁମ୍ବାଇରେ ଅଛୁ |"
            },
            Punjabi: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_pa.mp3",
                text: "ਹੈਲੋ ਦੋਸਤੋ ਅਸੀਂ ਇੱਥੇ ਹੈਕਾਥਨ ਲਈ ਮੁੰਬਈ ਵਿੱਚ ਹਾਂ"
            },
            Tamil: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_ta.mp3",
                text: "வணக்கம் நண்பர்களே, நாங்கள் ஹேக்கத்தானுக்கு மும்பையில் இருக்கிறோம்"
            },
            Telugu: {
                audio_url: "/api/audio/2afeb45d-915d-48db-9297-4d86bc8bc125_te.mp3",
                text: "హలో అబ్బాయిలు మేము హ్యాకథాన్ కోసం ముంబైలో ఉన్నాము"
            }
        }
    };

    // Fetch blogs from the API
    const fetchBlogs = async () => {
        try {
            // Assuming you want to add the dummy blog data to the existing fetched blogs
            const response = await axios.get('/api/blogs'); // Replace with your API endpoint
            if (Array.isArray(response.data)) {
                setBlogs([...response.data, dummyBlogData]); // Adding dummy data
            } else {
                console.error('Invalid data format received:', response.data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Edit blog handler
    const handleEdit = (id) => {
        setEditingBlogId(id);
        const blog = blogs.find((b) => b.id === id);
        setEditedContent(blog?.content || '');
    };

    // Save edited blog
    const handleSave = async (id) => {
        try {
            await axios.put(`/api/blogs/${id}`, { content: editedContent }); // Replace with your API endpoint
            setEditingBlogId(null);
            fetchBlogs();
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    // Delete blog handler
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/blogs/${id}`); // Replace with your API endpoint
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    // Download blog handler
    const handleDownload = (title, content) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${title}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Blogs</h1>

            {blogs.length === 0 ? (
                <p className="text-gray-600">No blogs uploaded yet.</p>
            ) : (
                <ul className="space-y-6">
                    {blogs.map((blog) => (
                        <li
                            key={blog.id}
                            className="bg-white shadow p-6 rounded-lg"
                            style={{ height: '300px', width: '400px' }} // Fixed height and width
                        >
                            {/* Blog Title */}
                            <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>

                            {/* Blog Content */}
                            {editingBlogId === blog.id ? (
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className="mt-4 w-full p-4 border rounded-lg"
                                    rows="5"
                                />
                            ) : (
                                <div>
                                    <p className="mt-4 text-gray-600">{blog.content}</p>
                                    {blog.translations && Object.keys(blog.translations).map((lang) => (
                                        <div key={lang} className="mt-2">
                                            <strong>{lang}:</strong>
                                            <p>{blog.translations[lang].text}</p>
                                            <audio controls src={blog.translations[lang].audio_url}></audio>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-6 flex items-center gap-4">
                                {editingBlogId === blog.id ? (
                                    <button
                                        onClick={() => handleSave(blog.id)}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(blog.id)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleDownload(blog.title, blog.content)}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                >
                                    Download
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Blogs;
