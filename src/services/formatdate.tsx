function dateFormat(dataString: string) {
    if (!dataString) return "-";

    const d = new Date(dataString);
    
    const dia = String(d.getDate())
    const mes = String(d.getMonth() + 1)
    const ano = String(d.getFullYear())
    return `${dia}/${mes}/${ano}`;
}

export { dateFormat };