export function parseArrayField<T extends Record<string, any>>(data: T[], field: keyof T): T[] {
  return data.map((item) => ({
    ...item,
    [field]: item[field] ? JSON.parse(item[field]) : [],
  }));
}
