import { useState } from "react"
import { Table, Select, Button } from "@radix-ui/themes"
import { buscarDadosHistorico } from "../../services/fetch"
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
                            {Object.keys(dados[0]).map((key) => (
                                <Table.ColumnHeaderCell key={key}> {key} </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {dados.map((item, index) => (
                            <Table.Row key={index}>
                                {Object.values(item).map((value: any, i) => (
                                    <Table.Cell key={i}> {value ?? "-"} </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            )}
        </div>
    )
}