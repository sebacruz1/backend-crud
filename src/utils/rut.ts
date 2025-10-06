export function normalizarRut(rut: string): string {
  if (!rut) return rut;

  let limpio = rut.replace(/\./g, "").replace(/\s+/g, "").toUpperCase();

  if (!/^[0-9K-]+$/.test(limpio)) {
    throw new Error("RUT contiene caracteres inválidos");
  }

  if ((limpio.match(/-/g) || []).length > 1) {
    throw new Error("RUT con formato incorrecto");
  }
  if (limpio.includes("-")) {
    const [cuerpo, dv] = limpio.split("-");
    return `${cuerpo}-${dv}`;
  }

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);
  return `${cuerpo}-${dv}`;
}
