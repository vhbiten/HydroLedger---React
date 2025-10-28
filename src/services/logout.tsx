import type { NavigateFunction } from 'react-router-dom'

export function logoutService(navigate: NavigateFunction): void {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('role')
    
    navigate('/')
}
