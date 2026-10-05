import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Blog } from '../services/api'

const DUMMY_BLOGS: Blog[] = [
  {
    id: 1,
    youtube_title: 'How to Build a Full Stack App with React and Django',
    youtube_link: 'https://www.youtube.com/watch?v=example1',
    generated_content: 'In today\'s tech-driven world, building full-stack applications has become an essential skill for developers. This comprehensive guide walks you through creating a robust web application using React for the frontend and Django for the backend, covering everything from project setup to deployment.',
    created_at: '2024-09-15T10:30:00Z',
  },
  {
    id: 2,
    youtube_title: 'Machine Learning Explained in 10 Minutes',
    youtube_link: 'https://www.youtube.com/watch?v=example2',
    generated_content: 'Machine learning is transforming industries at an unprecedented pace. From recommendation systems to self-driving cars, the applications are seemingly limitless. In this article, we break down the core concepts of machine learning in a way that\'s accessible to everyone, no PhD required.',
    created_at: '2024-09-20T14:15:00Z',
  },
  {
    id: 3,
    youtube_title: 'The Future of AI: What to Expect in 2025',
    youtube_link: 'https://www.youtube.com/watch?v=example3',
    generated_content: 'Artificial intelligence continues to evolve at a breakneck pace. As we look ahead to 2025, several groundbreaking developments are on the horizon that promise to reshape how we work, communicate, and solve problems. This article explores the most anticipated AI advancements and what they mean for everyday life.',
    created_at: '2024-10-01T09:00:00Z',
  },
]

interface BlogCardProps {
  blog: Blog
}

function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link to={`/blogs/${blog.id}`} className="block group">
      <article className="card p-5 group-hover:border-blogger-orange transition-colors duration-200">
        <div className="flex gap-4">
          {/* Thumbnail placeholder */}
          <div className="flex-shrink-0 w-20 h-20 bg-blogger-orange-bg rounded-lg flex items-center justify-center text-blogger-orange">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-base font-medium text-gray-900 group-hover:text-blogger-orange transition-colors line-clamp-2 mb-1">
              {blog.youtube_title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {blog.generated_content?.slice(0, 120)}…
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-1 text-blogger-orange font-medium">
                Read more →
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function AllBlogs() {
  const [blogs] = useState<Blog[]>(DUMMY_BLOGS)
  const loading = false
  const error = ''

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-medium text-gray-900">My Blog Articles</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {!loading && `${blogs.length} article${blogs.length !== 1 ? 's' : ''} generated`}
            </p>
          </div>
          <Link to="/" className="btn-primary text-sm">
            + New Article
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="spinner" />
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-blogger-orange-bg rounded-full flex items-center justify-center mx-auto mb-4 text-blogger-orange">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No articles yet</h3>
            <p className="text-sm text-gray-400 mb-6">
              Generate your first blog article from a YouTube video.
            </p>
            <Link to="/" className="btn-primary">
              Generate your first article
            </Link>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="space-y-4">
            {[...blogs].reverse().map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
