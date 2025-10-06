export type ListParams = {
  orderBy: string;
  dir: "ASC" | "DESC";
  limit: number;
  offset: number;
};

export function parseListParams(
  q: Record<string, any>,
  opts: {
    allowedSort: Record<string, string>;
    defaultSort: string;
    defaultDir?: "ASC" | "DESC";
    maxLimit?: number;
    defaultLimit?: number;
    defaultOffset?: number;
  }
): ListParams {
  const {
    allowedSort,
    defaultSort,
    defaultDir = "DESC",
    maxLimit = 100,
    defaultLimit = 20,
    defaultOffset = 0,
  } = opts;

  const rawOrder = String(q.orderBy ?? defaultSort);
  const orderBy = allowedSort[rawOrder] ?? allowedSort[defaultSort];

  const dirStr = String(q.dir ?? defaultDir).toUpperCase();
  const dir: "ASC" | "DESC" = dirStr === "ASC" ? "ASC" : "DESC";

  const limitNum = Number.parseInt(String(q.limit ?? defaultLimit), 10);
  const limit = Number.isFinite(limitNum)
    ? Math.min(Math.max(limitNum, 1), maxLimit)
    : defaultLimit;

  const offsetNum = Number.parseInt(String(q.offset ?? defaultOffset), 10);
  const offset = Number.isFinite(offsetNum) ? Math.max(offsetNum, 0) : defaultOffset;

  return { orderBy, dir, limit, offset };
}
