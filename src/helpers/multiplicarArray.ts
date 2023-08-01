export const multiplicarArray = (arr: any[], cantidad: number) => {
    const resultado = [...arr];

    for (let i = 1; i < cantidad; i++) {
        resultado.push(...arr);
    }
    return resultado;
}