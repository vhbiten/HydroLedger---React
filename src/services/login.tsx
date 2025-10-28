interface LoginData {
    email: string
    password: string
}

interface LoginResponse {
    message?: string
    token?: string
    user?: {
        id: string
        email: string
        name: string
        role: string
    }
}

export async function loginService(data: LoginData): Promise<LoginResponse> {
    try {
        const response = await fetch('https://api-hydroledger.onrender.com/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        if (!response.ok) {
            throw new Error(responseData.message || 'Credenciais inválidas')
        }

        return responseData
        
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error('Erro ao conectar com o servidor')
    }
}