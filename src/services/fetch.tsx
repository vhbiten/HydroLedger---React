const API_BASE_URL = "https://api-hydroledger.onrender.com/registros"

async function requisicao(endpoint: string, params: Record<string, any> = {}) {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("Token não encontrado")

    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString())
    })

    const response = await fetch(`${API_BASE_URL}${endpoint}?${queryParams}`, {
        headers: { "Authorization": `Bearer ${token}` }
    })

    if (!response.ok) throw new Error("Erro ao buscar dados")
    return response.json()
}

export async function buscarDadosHistorico(
    tipoTabela: "pocos" | "efluentes" | "cloro",
    numeroPoco?: string,
    dataInicio?: string,
    dataFim?: string
) {
    const endpoints = {
        pocos: "/pocos/index",
        efluentes: "/efluentes/index",
        cloro: "/cloro-residual/index"
    }

    return requisicao(endpoints[tipoTabela], {
        ...(tipoTabela === "pocos" && numeroPoco && { numeroPoco }),
        dataInicio,
        dataFim
    })
}
