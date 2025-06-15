import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, posts }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    const openDeleteModal = (id) => {
        setPostToDelete(id);
        setShowDeleteModal(true);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setPostToDelete(null);
    };

    const confirmDelete = () => {
        if (postToDelete) {
            router.delete(`/posts/${postToDelete}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setPostToDelete(null);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Post List</h2>
                            <Link
                                href="/posts/create"
                                className="bg-blue-600 text-white text-sm px-2.5 py-1.5 rounded hover:bg-blue-700"
                            >
                                ➕ Create
                            </Link>
                        </div>

                        <table className="w-full table-auto border">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border p-2 w-[8%]">No</th>
                                    <th className="border p-2">Title</th>
                                    <th className="border p-2">Body</th>
                                    <th className="border p-2 text-center w-[20%]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="border p-4 text-center text-gray-500">
                                            No posts available.
                                        </td>
                                    </tr>
                                ) : (
                                    posts.map((post, index) => (
                                        <tr key={post.id} className="hover:bg-gray-50">
                                            <td className="border p-2 text-center">{index + 1}</td>
                                            <td className="border p-2">{post.title}</td>
                                            <td className="border p-2">{post.body}</td>
                                            <td className="border p-2 text-center space-x-2">
                                                <Link
                                                    href={`/posts/${post.id}/edit`}
                                                    className="text-xs text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteModal(post.id)}
                                                    className="text-xs text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-md w-full max-w-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                            Confirm Deletion
                        </h2>
                        <p className="text-gray-600 mb-6 text-center">
                            Are you sure you want to delete this post?
                        </p>
                        <div className="flex justify-center space-x-2">
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}