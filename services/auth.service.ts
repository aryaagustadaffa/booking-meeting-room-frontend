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
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('token', auth.token)
      window.localStorage.setItem('user', JSON.stringify(auth.user))
      // Also save token to a cookie for server-side access
      if (window.document) {
        window.document.cookie = `token=${auth.token}; path=/; max-age=86400; SameSite=Lax`
      }
    }
  },

  getAuth(): AuthResponse | null {
    if (typeof window === 'undefined' || !window.localStorage) return null
    const token = window.localStorage.getItem('token')
    const userStr = window.localStorage.getItem('user')
    if (!token || !userStr) return null
    return {
      token,
      user: JSON.parse(userStr) as User,
    }
  },

  clearAuth() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      // Also remove the cookie
      if (window.document) {
        window.document.cookie = 'token=; path=/; max-age=0; SameSite=Lax'
      }
    }
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false
    return !!window.localStorage.getItem('token')
  },
}
