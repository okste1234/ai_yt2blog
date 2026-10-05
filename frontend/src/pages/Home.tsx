import { useState } from 'react'
import Navbar from '../components/Navbar'
import { blogApi } from '../services/api'

function YoutubeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  )
}

export default function Home() {
  const [youtubeLink, setYoutubeLink] = useState<string>('https://www.youtube.com/watch?v=example')
  const [generatedContent, setGeneratedContent] = useState<string>(`10 Productivity Hacks That Actually Work

We all have the same 24 hours, yet some people seem to accomplish far more than others. The difference often comes down to a few key habits and strategies. Here are ten productivity hacks that are backed by research and used by high performers.

**1. Time Blocking**

Instead of working from a to-do list, schedule specific blocks of time for each task. Treat these blocks like meetings you can't cancel. This prevents the endless task-switching that kills deep work.

**2. The Two-Minute Rule**

If a task takes less than two minutes, do it immediately. Deferring small tasks creates mental clutter that drains your focus throughout the day.

**3. Eat the Frog**

Tackle your most difficult or dreaded task first thing in the morning, when your willpower is at its peak. Everything after that feels easier by comparison.

**4. Single-Tasking**

Multitasking is a myth — your brain switches between tasks, not simultaneously processes them. Focus on one thing at a time and you'll finish faster with higher quality output.

**5. The Pomodoro Technique**

Work for 25 minutes, then take a 5-minute break. After four cycles, take a longer break. This rhythm keeps your mind fresh and makes large tasks feel manageable.

**6. Batch Similar Tasks**

Group similar activities together — answer all emails at once, make all phone calls back-to-back. Context switching has a cognitive cost; batching minimizes it.

**7. Protect Your Morning**

The first hour of your day sets the tone. Avoid checking email or social media before you've completed at least one meaningful task.

**8. Weekly Reviews**

Every Friday, spend 30 minutes reviewing what you accomplished, what slipped, and what's ahead. This keeps you aligned with your goals and prevents urgent tasks from crowding out important ones.

**9. Learn to Say No**

Every yes to something unimportant is a no to something that matters. Guard your time like the finite resource it is.

**10. Optimize Your Environment**

Your environment shapes your behavior more than you think. A clean desk, silencing notifications, and the right background music can dramatically increase your output.`)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!youtubeLink.trim()) return
    setError('')
    setGeneratedContent('')
    setLoading(true)

    try {
      const data = await blogApi.generate(youtubeLink.trim())
      setGeneratedContent(data.content)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate article. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blogger-orange-bg text-blogger-orange text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <YoutubeIcon />
            YouTube → Blog Article
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-3">
            Turn any YouTube video
            <br />
            into a <span className="text-blogger-orange">blog article</span>
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Paste a YouTube link and our AI will transcribe the video and write a
            polished blog post for you in seconds.
          </p>
        </div>

        {/* Input card */}
        <div className="card p-6 mb-6">
          <form onSubmit={handleGenerate}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube video URL
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <YoutubeIcon />
                </span>
                <input
                  type="url"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="input-field pl-10"
                  required
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                disabled={loading || !youtubeLink.trim()}
                className="btn-primary whitespace-nowrap"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <SparkleIcon />
                    Generate
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="card p-10 flex flex-col items-center gap-4 text-center">
            <div className="spinner" />
            <div>
              <p className="font-medium text-gray-700">Generating your article…</p>
              <p className="text-sm text-gray-400 mt-1">
                Downloading audio · Transcribing · Writing blog post
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex gap-2">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {/* Result */}
        {generatedContent && !loading && (
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <SparkleIcon />
                Generated Article
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(generatedContent)}
                className="btn-ghost text-xs gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
            </div>
            <div className="p-6">
              <div className="blog-content whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                {generatedContent}
              </div>
            </div>
          </div>
        )}

        {/* Empty state hint */}
        {!generatedContent && !loading && !error && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-blogger-orange-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <YoutubeIcon />
            </div>
            <p className="text-gray-400 text-sm">
              Your generated article will appear here
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
