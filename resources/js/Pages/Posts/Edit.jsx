import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ auth, post }) {
    const { data, setData, put, processing, errors } = useForm({
        title: post.title || '',
        body: post.body || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/posts/${post.id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Post
                </h2>
            }
        >
            <Head title="Edit Post" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-5">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <Link
                            href="/posts"
                            className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300"
                        >
                            🔙 Back
                        </Link>

                        <form onSubmit={submit} className="space-y-4 mt-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                                <textarea
                                    value={data.body}
                                    onChange={(e) => setData('body', e.target.value)}
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                                />
                                {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition ${
                                    processing ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                💾 Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}