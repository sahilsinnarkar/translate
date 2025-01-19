import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    // Dummy data
    const dummyBlogData = {
        english_text: "hello guys we are here in Mumbai for hackathon",
        translations: {
            Hindi: {
                audio_url: "/api/audio/sample_hi.mp3",
                text: "नमस्कार दोस्तों, हम यहां हैकथॉन के लिए मुंबई में हैं",
            },
        },
    };

    // Fetch blogs from the API
    const fetchBlogs = async () => {
        try {
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

    // Edit, save, delete, and download handlers
    const handleEdit = (id) => {
        setEditingBlogId(id);
        const blog = blogs.find((b) => b.id === id);
        setEditedContent(blog?.content || '');
    };

    const handleSave = async (id) => {
        try {
            await axios.put(`/api/blogs/${id}`, { content: editedContent }); // Replace with your API endpoint
            setEditingBlogId(null);
            fetchBlogs();
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/blogs/${id}`); // Replace with your API endpoint
            fetchBlogs();
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleDownload = (title, content) => {
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${title}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Dummy cards
    const dummyCards = [
        {
            title: 'Hackathon Tips',
            content: 'Discover the best tips to win your next hackathon.',
            imageUrl: 'hack.png',
        },
        {
            title: 'Tech Innovations',
            content: 'Explore cutting-edge tech innovations for 2024.',
            imageUrl: 'tech.jpg',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Blogs</h1>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {/* Render dynamic blogs */}
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white shadow p-6 rounded-lg"
                        style={{ height: '300px', width: '400px' }}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800">{blog.title || 'Untitled Blog'}</h2>
                        <p className="mt-4 text-gray-600">{blog.content || 'No content available.'}</p>

                        {blog.translations &&
                            Object.keys(blog.translations).map((lang) => (
                                <div key={lang} className="mt-2">
                                    <strong>{lang}:</strong>
                                    <p>{blog.translations[lang].text}</p>
                                    <audio controls src={blog.translations[lang].audio_url}></audio>
                                </div>
                            ))}

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
                                onClick={() => handleDownload(blog.title || 'Blog', blog.content || '')}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Download
                            </button>
                        </div>
                    </div>
                ))}

                {/* Render dummy cards */}
                {dummyCards.map((card, index) => (
                    <div key={index} className="bg-white shadow p-6 rounded-lg">
                        <img
                            src={card.imageUrl}
                            alt={card.title}
                            className="rounded-lg w-full h-40 object-cover"
                        />
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">{card.title}</h2>
                        <p className="mt-2 text-gray-600">{card.content}</p>
                        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            Read More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
