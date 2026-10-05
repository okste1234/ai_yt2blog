/**
 * API service — all backend calls go through here.
 * Base URL is proxied through Vite dev server to http://localhost:8000
 * In production, set VITE_API_BASE_URL env variable.
 */


// type ImportMetaEnv = {
//   VITE_API_BASE_URL?: string
// }

// const BASE_URL = ((import.meta as ImportMeta & { env: ImportMetaEnv }).env.VITE_API_BASE_URL || '/api')

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

export interface User {
  username: string
}

export interface LoginResponse {
  user: User
}

export interface SignupResponse {
  user: User
}

export interface BlogGenerateResponse {
  content: string
}

export interface Blog {
  id: number | string
  youtube_title: string
  youtube_link: string
  generated_content: string
  created_at: string
}

export interface BlogListResponse {
  blogs: Blog[]
}

export interface BlogDetailResponse {
  blog: Blog
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  return res.json()
}

// Auth
export const authApi = {
  login: (username: string, password: string): Promise<LoginResponse> =>
    request<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  signup: (username: string, email: string, password: string, password2: string): Promise<SignupResponse> =>
    request<SignupResponse>('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, password2 }),
    }),

  logout: (): Promise<unknown> => request<unknown>('/logout', { method: 'GET' }),
}

// Blog generation
export const blogApi = {
  generate: (youtubeLink: string): Promise<BlogGenerateResponse> =>
    request<BlogGenerateResponse>('/generate-blog', {
      method: 'POST',
      body: JSON.stringify({ link: youtubeLink }),
    }),

  list: (): Promise<BlogListResponse> => request<BlogListResponse>('/blog-list'),

  detail: (id: number | string): Promise<BlogDetailResponse> =>
    request<BlogDetailResponse>(`/blog-details/${id}/`),
}
