interface RegistroPocoData {
    dataColeta: string
    numeroPoco: number
    hidrometro: number
    horimetro: number
}

interface RegistroEfluenteData {
    dataColeta: string
    vazao1: number
    vazao2: number
    vazao3: number
    ph: number
    temperatura: number
    condutividade: number
    SD30: number
}

interface RegistroCloroResidualData {
    dataColeta: string
    cozinha: number
    saidaTratamento: number
    bebedouro1: number
    bebedouro2: number
    bebedouro3: number
}

interface RegistroResponse {
    message?: string
    success?: boolean
}

const API_BASE_URL = "https://api-hydroledger.onrender.com/registros"

async function fetchWithAuth(
    endpoint: string, 
    data: RegistroPocoData | RegistroEfluenteData | RegistroCloroResidualData
): Promise<RegistroResponse> {
    const token = localStorage.getItem("token")
    
    if (!token) {
        throw new Error("Token de autenticação não encontrado")
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            throw new Error("Erro ao registrar dados")
        }

        return { success: true, message: "Dados registrados com sucesso!" }
        
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error("Erro ao conectar com a API")
    }
}

export async function registrarPocos(data: RegistroPocoData): Promise<RegistroResponse> {
    return fetchWithAuth("/pocos", data)
}

export async function registrarEfluentes(data: RegistroEfluenteData): Promise<RegistroResponse> {
    return fetchWithAuth("/efluentes", data)
}

export async function registrarCloroResidual(data: RegistroCloroResidualData): Promise<RegistroResponse> {
    return fetchWithAuth("/cloro-residual", data)
}
