export function normalizarRut(rut: string): string {
  if (!rut) return rut;
  let limpio = rut.replace(/\./g, "").replace(/\s+/g, "").toLowerCase();

  const cuerpo = limpio.slice(0, -2);
  const dv = limpio.slice(-1);

  return `${cuerpo}-${dv}`;
}
