import { apiClient } from './api'
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '@/types'

export const authService = {
  async login(data: LoginRequest) {
    return apiClient.post<AuthResponse>('/auth/login', data)
  },

  async register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>('/auth/register', data)
  },

  async getProfile() {
    return apiClient.get<User>('/auth/profile')
  },

  async logout() {
    return apiClient.post<{ message: string }>('/auth/logout')
  },

  saveAuth(auth: AuthResponse) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', auth.token)
      localStorage.setItem('user', JSON.stringify(auth.user))
      // Also save token to a cookie for server-side access
      document.cookie = `token=${auth.token}; path=/; max-age=86400; SameSite=Lax`
    }
  },

  getAuth(): AuthResponse | null {
    if (typeof window === 'undefined') return null
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    if (!token || !userStr) return null
    return {
      token,
      user: JSON.parse(userStr) as User,
    }
  },

  clearAuth() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      // Also remove the cookie
      document.cookie = 'token=; path=/; max-age=0; SameSite=Lax'
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false
    return !!localStorage.getItem('token')
  },
}
