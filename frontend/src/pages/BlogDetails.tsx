import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { Blog } from '../services/api'

const DUMMY_BLOGS: Blog[] = [
  {
    id: '1',
    youtube_title: 'How to Build a Full Stack App with React and Django',
    youtube_link: 'https://www.youtube.com/watch?v=example1',
    generated_content: `How to Build a Full Stack App with React and Django

Building a full-stack web application can feel overwhelming at first, but with the right tools and guidance, it becomes an exciting journey. In this article, we'll walk through creating a complete web application using React for the frontend and Django for the backend.

**Why React and Django?**

React is one of the most popular JavaScript libraries for building user interfaces. Its component-based architecture makes it easy to create reusable UI elements. Django, on the other hand, is a high-level Python web framework that encourages rapid development and clean, pragmatic design.

Together, they form a powerful combination: React handles the dynamic, interactive frontend while Django manages the business logic, database, and API.

**Setting Up the Project**

Start by creating your Django project and configuring Django REST Framework. This will serve as your API backend. Then, scaffold a new React app using Vite for a fast development experience.

**Connecting Frontend and Backend**

The key is to have Django expose REST API endpoints and React consume them via fetch or Axios. Use CORS headers in Django to allow your React dev server to communicate with it.

**Deployment**

Once your app is ready, you can deploy Django to services like Railway or Render, and React to Vercel or Netlify. With environment variables and a production build, your full-stack app will be live in minutes.`,
    created_at: '2024-09-15T10:30:00Z',
  },
  {
    id: '2',
    youtube_title: 'Machine Learning Explained in 10 Minutes',
    youtube_link: 'https://www.youtube.com/watch?v=example2',
    generated_content: `Machine Learning Explained in 10 Minutes

Machine learning has gone from an academic curiosity to a technology powering billions of everyday interactions. But what exactly is it, and how does it work?

**What is Machine Learning?**

At its core, machine learning is a subset of artificial intelligence where systems learn from data rather than following explicitly programmed rules. Instead of writing "if the email contains 'free money', mark it as spam," you feed thousands of examples of spam and non-spam emails, and the algorithm figures out the pattern itself.

**The Three Types**

There are three main flavors of machine learning: supervised learning (you provide labeled examples), unsupervised learning (the algorithm finds patterns on its own), and reinforcement learning (the model learns through trial and error with rewards).

**Real-World Applications**

From Netflix recommendations to fraud detection, from medical diagnosis to autonomous vehicles — machine learning is everywhere. The common thread is data: the more high-quality data you have, the better your model can become.

**Getting Started**

Python is the lingua franca of machine learning. Libraries like scikit-learn, TensorFlow, and PyTorch make it accessible to developers of all levels. Start with simple projects, understand the math gradually, and always validate your models on unseen data.`,
    created_at: '2024-09-20T14:15:00Z',
  },
  {
    id: '3',
    youtube_title: 'The Future of AI: What to Expect in 2025',
    youtube_link: 'https://www.youtube.com/watch?v=example3',
    generated_content: `The Future of AI: What to Expect in 2025

Artificial intelligence is no longer a distant concept from science fiction — it's here, it's accelerating, and 2025 promises to be one of the most transformative years yet.

**Multimodal Models Go Mainstream**

AI systems that can simultaneously understand text, images, audio, and video are becoming the standard. Expect to interact with AI assistants that can watch a video, listen to a meeting, and synthesize insights all at once.

**AI Agents Take Action**

The shift from AI that answers questions to AI that takes actions is well underway. Autonomous agents that browse the web, write and run code, send emails, and manage workflows will become common productivity tools.

**Regulation Catches Up**

Governments worldwide are moving to establish AI governance frameworks. The EU AI Act is already in effect, and more regional regulations will shape how companies build and deploy AI systems.

**What This Means for You**

Whether you're a developer, business owner, or curious individual, the message is clear: AI literacy is becoming as important as basic computer literacy. Understanding what AI can and can't do — and how to use it effectively — will be a defining skill of this decade.`,
    created_at: '2024-10-01T09:00:00Z',
  },
]

export default function BlogDetails() {
  const { id } = useParams()
  const [copied, setCopied] = useState(false)

  const blog = DUMMY_BLOGS.find((b) => b.id === id) || DUMMY_BLOGS[0]
  const loading = false
  const error = ''

  const handleCopy = () => {
    if (!blog) return
    navigator.clipboard.writeText(blog.generated_content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blogger-orange mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to My Blogs
        </Link>

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

        {!loading && blog && (
          <article>
            {/* Article header */}
            <div className="card p-6 mb-6">
              <div className="flex items-start gap-4">
                {/* YouTube thumbnail placeholder */}
                <a
                  href={blog.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-24 h-16 bg-blogger-orange-bg rounded-lg flex items-center justify-center text-blogger-orange hover:opacity-80 transition-opacity"
                >
                  <svg className="w-9 h-9" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-medium text-gray-900 mb-2 leading-snug">
                    {blog.youtube_title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span>
                      {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    <a
                      href={blog.youtube_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blogger-orange hover:underline font-medium"
                    >
                      Watch on YouTube ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Article body */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
                <span className="text-sm font-medium text-gray-600">Generated Article</span>
                <button onClick={handleCopy} className="btn-ghost text-xs gap-1.5">
                  {copied ? (
                    <>
                      <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy article
                    </>
                  )}
                </button>
              </div>
              <div className="p-6 sm:p-8">
                <div className="blog-content whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                  {blog.generated_content}
                </div>
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  )
}
