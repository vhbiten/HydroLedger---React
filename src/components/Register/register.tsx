import styles from "./styles.module.css"
import { Navigate } from "react-router-dom"
import { useState } from "react"
import { registrarPocos, registrarEfluentes, registrarCloroResidual } from "../../services/send"

type Category = "pocosCaptacao" | "efluente" | "cloroResidual"

export function Register() {
    
    const token = localStorage.getItem("token")
    const [selectedCategory, setSelectedCategory] = useState<Category>("pocosCaptacao")
    
    // useState poços
    const [dataColeta, setDataColeta] = useState("")
    const [numeroPoco, setNumeroPoco] = useState("")
    const [hidrometro, setHidrometro] = useState("")
    const [horimetro, setHorimetro] = useState("")
    const [mensagem, setMensagem] = useState("")
    
    // useState efluentes
    const [vazao1, setVazao1] = useState("")
    const [vazao2, setVazao2] = useState("")
    const [vazao3, setVazao3] = useState("")
    const [ph, setPh] = useState("")
    const [temperatura, setTemperatura] = useState("")
    const [condutividade, setCondutividade] = useState("")
    const [sd30, setSd30] = useState("")

    // useState cloro residual
    const [cozinha, setCozinha] = useState("")
    const [saidaTratamento, setSaidaTratamento] = useState("")
    const [bebedouro1, setBebedouro1] = useState("")
    const [bebedouro2, setBebedouro2] = useState("")
    const [bebedouro3, setBebedouro3] = useState("")

    const enviarDadosPocos = async () => {
        try {
            setMensagem("Enviando...")
            
            await registrarPocos({
                dataColeta,
                numeroPoco: Number(numeroPoco),
                hidrometro: Number(hidrometro),
                horimetro: Number(horimetro)
            })
            
            setMensagem("Dados registrados com sucesso!")
            setDataColeta("")
            setNumeroPoco("")
            setHidrometro("")
            setHorimetro("")

        } catch (error) {
            if (error instanceof Error) {
                setMensagem(error.message)
            } else {
                setMensagem("Erro ao conectar com a API")
            }
        }
    }

    const enviarDadosEfluentes = async () => {
        try {
            setMensagem("Enviando...")
            
            await registrarEfluentes({
                dataColeta,
                vazao1: Number(vazao1),
                vazao2: Number(vazao2),
                vazao3: Number(vazao3),
                ph: Number(ph),
                temperatura: Number(temperatura),
                condutividade: Number(condutividade),
                SD30: Number(sd30)
            })
            
            setMensagem("Dados registrados com sucesso!")
            setDataColeta("")
            setVazao1("")
            setVazao2("")
            setVazao3("")
            setPh("")
            setTemperatura("")
            setCondutividade("")
            setSd30("")

        } catch (error) {
            if (error instanceof Error) {
                setMensagem(error.message)
            } else {
                setMensagem("Erro ao conectar com a API")
            }
        }
    }

    const enviarDadosCloroResidual = async () => {
        try {
            setMensagem("Enviando...")
            
            await registrarCloroResidual({
                dataColeta,
                cozinha: Number(cozinha),
                saidaTratamento: Number(saidaTratamento),
                bebedouro1: Number(bebedouro1),
                bebedouro2: Number(bebedouro2),
                bebedouro3: Number(bebedouro3)
            })
            
            setMensagem("Dados registrados com sucesso!")
            setDataColeta("")
            setCozinha("")
            setSaidaTratamento("")
            setBebedouro1("")
            setBebedouro2("")
            setBebedouro3("")

        } catch (error) {
            if (error instanceof Error) {
                setMensagem(error.message)
            } else {
                setMensagem("Erro ao conectar com a API")
            }
        }
    }

    if (!token) {
        return <Navigate to="/" />
    }

    return (
        <div className={styles.registerContainer}>
            <div className={styles.categorySelection}>
                <h3>Selecione a Categoria</h3>
                <div className={styles.categoryButtons}>
                    <button 
                        onClick={() => setSelectedCategory("pocosCaptacao")}
                        className={selectedCategory === "pocosCaptacao" ? styles.active : ""}
                    >
                        Poços de Captação
                    </button>

                    <button 
                        onClick={() => setSelectedCategory("efluente")}
                        className={selectedCategory === "efluente" ? styles.active : ""}
                    >
                        Efluente
                    </button>

                    <button 
                        onClick={() => setSelectedCategory("cloroResidual")}
                        className={selectedCategory === "cloroResidual" ? styles.active : ""}
                    >
                        Cloro Residual Livre
                    </button>
                </div>
            </div>

            <div className={styles.dataColeta}>
                <div>
                    <label htmlFor="dataColeta">Data</label>
                    <input 
                    type="date"
                    id="dataColeta"
                    name="dataColeta"
                    value={dataColeta}
                    onChange={(e) => setDataColeta(e.target.value)}
                    required
                    />
                </div>
            </div>

            {selectedCategory === "pocosCaptacao" && (
                <div className={styles.pocosCaptacao}>
                    <label>Número do poço:</label>
                    <select 
                    id="numeroPoco" 
                    name="numeroPoco"
                    value={numeroPoco}
                    onChange={(e) => setNumeroPoco(e.target.value)}
                    required
                    >
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <label>Hidrômetro</label>
                    <input 
                    type="number"
                    id="hidrometro"
                    name="hidrometro"
                    value={hidrometro}
                    onChange={(e) => setHidrometro(e.target.value)}
                    required
                    />

                    <label>Horímetro</label>
                    <input 
                    type="number"
                    id="horimetro"
                    name="horimetro"
                    value={horimetro}
                    onChange={(e) => setHorimetro(e.target.value)}
                    required
                    />
                </div>
            )}

            {selectedCategory === "efluente" && (
                <div className={styles.efluentes}>
                    <div>
                        <h3>Vazão</h3>
                        <div>
                            <label>Vazão 1 (m³/h)</label>
                            <input 
                            type="number"
                            id="vazao1"
                            name="vazao1"
                            placeholder="0.00"
                            min={0}
                            value={vazao1}
                            onChange={(e) => setVazao1(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>Vazão 2 (m³/h)</label>
                            <input 
                            type="number"
                            id="vazao2"
                            name="vazao2"
                            placeholder="0.00"
                            min={0}
                            value={vazao2}
                            onChange={(e) => setVazao2(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>Vazão 3 (m³/h)</label>
                            <input 
                            type="number"
                            id="vazao3"
                            name="vazao3"
                            placeholder="0.00"
                            min="0"
                            value={vazao3}
                            onChange={(e) => setVazao3(e.target.value)}
                            required
                            />
                        </div>
                    </div>

                    <div>
                        <h3>Parâmetros Físico-Químicos</h3>
                        <div>
                            <label>pH</label>
                            <input 
                            type="number" 
                            id="ph" 
                            name="ph" 
                            min="0" 
                            max="14" 
                            placeholder="7.0"
                            value={ph}
                            onChange={(e) => setPh(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>Temperatura (ºC)</label>
                            <input 
                            type="number" 
                            id="temperatura" 
                            name="temperatura" 
                            placeholder="25.0"
                            value={temperatura}
                            onChange={(e) => setTemperatura(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>Condutividade (µs)</label>
                            <input 
                            type="number" 
                            id="condutividade" 
                            name="condutividade"
                            min="0"
                            placeholder="0.0"
                            value={condutividade}
                            onChange={(e) => setCondutividade(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>SD30 (mL/L)</label>
                            <input 
                            type="number" 
                            id="sd30" 
                            name="sd30"
                            min="0"
                            placeholder="0.0"
                            value={sd30}
                            onChange={(e) => setSd30(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                </div>
            )}

            {selectedCategory === "cloroResidual" && (
                <div className={styles.cloroResidual}>
                    <div>
                        <h3>Pontos de coleta</h3>

                        <div>
                            <label>Saída do Tratamento (mg/L)</label>
                            <input 
                            type="number" 
                            id="saidaTratamento" 
                            name="saidaTratamento" 
                            min="0" 
                            placeholder="0.00"
                            value={saidaTratamento}
                            onChange={(e) => setSaidaTratamento(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>Cozinha (mg/L)</label>
                            <input 
                            type="number" 
                            id="cozinha" 
                            name="cozinha" 
                            min="0" 
                            placeholder="0.00"
                            value={cozinha}
                            onChange={(e) => setCozinha(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>Bebedouro 1 (mg/L)</label>
                            <input 
                            type="number" 
                            id="bebedouro1" 
                            name="bebedouro1" 
                            min="0" 
                            placeholder="0.00"
                            value={bebedouro1}
                            onChange={(e) => setBebedouro1(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>Bebedouro 2 (mg/L)</label>
                            <input 
                            type="number" 
                            id="bebedouro2" 
                            name="bebedouro2" 
                            min="0" 
                            placeholder="0.00"
                            value={bebedouro2}
                            onChange={(e) => setBebedouro2(e.target.value)}
                            required
                            />
                        </div>

                        <div>
                            <label>Bebedouro 3 (mg/L)</label>
                            <input 
                            type="number" 
                            id="bebedouro3" 
                            name="bebedouro3" 
                            min="0" 
                            placeholder="0.00"
                            value={bebedouro3}
                            onChange={(e) => setBebedouro3(e.target.value)}
                            required
                            />
                        </div>
                    </div>
                </div>
            )}

            {mensagem && <p className={styles.mensagem}>{mensagem}</p>}

            <button 
                type="button" 
                className={styles.submitBtn}
                onClick={() => {
                    if (selectedCategory === "pocosCaptacao") {
                        enviarDadosPocos()
                    } else if (selectedCategory === "efluente") {
                        enviarDadosEfluentes()
                    } else if (selectedCategory === "cloroResidual") {
                        enviarDadosCloroResidual()
                    }
                }}
            >
                    Registrar Dados
            </button>
        </div>
    )
}