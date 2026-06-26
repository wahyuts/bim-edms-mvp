const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

export function getPagination(query = {}) {
  const page = Math.max(Number(query.page || DEFAULT_PAGE), 1);
  const rawPageSize = Math.max(Number(query.pageSize || DEFAULT_PAGE_SIZE), 1);
  const pageSize = Math.min(rawPageSize, MAX_PAGE_SIZE);
  const offset = (page - 1) * pageSize;

  return { page, pageSize, offset };
}

export function buildPaginationMeta(page, pageSize, totalItems) {
  return {
    page,
    pageSize,
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
  };
}
