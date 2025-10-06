export function normalizarRut(rut: string): string {
  if (!rut) throw new Error("RUT vacío");

  let limpio = rut.replace(/\./g, "").replace(/\s+/g, "").toUpperCase();

  if (!/^[0-9K-]+$/.test(limpio)) {
    throw new Error("RUT contiene caracteres inválidos");
  }

  if ((limpio.match(/-/g) || []).length > 1) {
    throw new Error("RUT con formato incorrecto");
  }

  let cuerpo: string;
  let dv: string;

  if (limpio.includes("-")) {
    [cuerpo, dv] = limpio.split("-");
  } else {
    cuerpo = limpio.slice(0, -1);
    dv = limpio.slice(-1);
  }

  if (!/^\d+$/.test(cuerpo) || !/^[0-9K]$/.test(dv)) {
    throw new Error("Formato de RUT inválido");
  }

  return `${cuerpo}-${dv}`;
}
