import { describe, it, expect } from "vitest";
import { normalizarRut } from "../src/utils/rut";

describe("normalizarRut", () => {
  it("remueve puntos y normaliza DV a minuscula", () => {
    expect(normalizarRut("22.222.222-2")).toBe("22222222-2");
    expect(normalizarRut("22222222-2")).toBe("22222222-2");
    expect(normalizarRut("12.345.678-K")).toBe("12345678-K");
  });
});
