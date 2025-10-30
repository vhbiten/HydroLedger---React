import { useState } from "react"
import { Table, Select, Button } from "@radix-ui/themes"
import { buscarDadosHistorico } from "../../services/fetch"
import { dateFormat } from "../../services/formatdate"
import { parseISO, isAfter, isBefore, isEqual, startOfDay } from 'date-fns'
import styles from "./styles.module.css"

export function Manage() {
    const [tipoTabela, setTipoTabela] = useState<"pocos" | "efluentes" | "cloro">("pocos")
    const [numeroPoco, setNumeroPoco] = useState("1")
    const [dataInicio, setDataInicio] = useState("")
    const [dataFim, setDataFim] = useState("")
    const [dados, setDados] = useState<any[]>([])
    const [carregando, setCarregando] = useState(false)

    const buscarDados = async () => {
        setCarregando(true)
        try {
            const resultado = await buscarDadosHistorico(tipoTabela, numeroPoco, dataInicio, dataFim)
            setDados(resultado)
        } catch (error) {
            console.log(error)
        } finally {
            setCarregando(false)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.filtros}>
                <h2>Consultar Histórico</h2>
                
                <label>
                    Tipo de Tabela
                    <Select.Root value={tipoTabela} onValueChange={(v) => setTipoTabela(v as "pocos" | "efluentes" | "cloro")}>
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Item value="pocos">Poços</Select.Item>
                            <Select.Item value="efluentes">Efluentes</Select.Item>
                            <Select.Item value="cloro">Cloro Residual</Select.Item>
                        </Select.Content>
                    </Select.Root>
                </label>

                {tipoTabela === "pocos" && (
                    <label>
                        Número do Poço
                        <Select.Root value={numeroPoco} onValueChange={setNumeroPoco}>
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Item value="1">Poço 1</Select.Item>
                                <Select.Item value="2">Poço 2</Select.Item>
                                <Select.Item value="3">Poço 3</Select.Item>
                            </Select.Content>
                        </Select.Root>
                    </label>
                )}

                <label>
                    Data Início
                    <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
                </label>

                <label>
                    Data Fim
                    <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                </label>

                <Button className={styles.getBtn} onClick={buscarDados} disabled={carregando}>
                    {carregando ? "Carregando..." : "Buscar"}
                </Button>
            </div>

            {dados.length > 0 && (
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            {Object.keys(dados[0])
                                .filter(key => !["id", "createdAt", "updatedAt"].includes(key))
                                .map((key) => (
                                    <Table.ColumnHeaderCell key={key}>
                                        {key === "dataColeta" ? "Data":
                                        key === "numeroPoco" ? "Poço":
                                        key === "hidrometro" ? "Hidrometro (m³)":
                                        key === "horimetro" ? "Horímetro (h)":

                                        key === "vazao1" ? "Vazão 1 (m³/h)":
                                        key === "vazao2" ? "Vazão 2 (m³/h)":
                                        key === "vazao3" ? "Vazão 3 (m³/h)":
                                        key === "ph" ? "pH":
                                        key === "temperatura" ? "Temperatura (°C)":
                                        key === "condutividade" ? "Condutividade (µs)":
                                        key === "SD30" ? "SD30 (mL/L)":

                                        key === "cozinha" ? "Cozinha (mg/L)":
                                        key === "saidaTratamento" ? "Saída Tratamento (mg/L)":
                                        key === "bebedouro1" ? "Bebedouro 1 (mg/L)":
                                        key === "bebedouro2" ? "Bebedouro 2 (mg/L)":
                                        key === "bebedouro3" ? "Bebedouro 3 (mg/L)":
                                        
                                        key}
                                    </Table.ColumnHeaderCell>
                                ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {[...dados]
                            .sort((a, b) => new Date(a.dataColeta).getTime() - new Date(b.dataColeta).getTime())
                            .filter(item => tipoTabela !== "pocos" || item.numeroPoco?.toString() === numeroPoco)
                            .filter(item => {
                                let data = startOfDay(parseISO(item.dataColeta))
                                let inicio = dataInicio ? startOfDay(parseISO(dataInicio)) : null
                                let fim = dataFim ? startOfDay(parseISO(dataFim)) : null
                                return (!inicio || isAfter(data, inicio) || isEqual(data, inicio)) &&
                                       (!fim || isBefore(data, fim) || isEqual(data, fim))
                            })
                            .map((item, index) => (
                                <Table.Row key={index}>
                                    {Object.keys(item)
                                        .filter(key => !["id", "createdAt", "updatedAt"].includes(key))
                                        .map((key, i) => (
                                            <Table.Cell key={i}>
                                                {key === "dataColeta"
                                                    ? dateFormat(item[key])
                                                    : item[key] ?? "-"}
                                            </Table.Cell>
                                        ))}
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table.Root>
            )}
        </div>
    )
}