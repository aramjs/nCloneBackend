import { Request } from "express";

export function getRandomDate() {
  const startDate = new Date("2023-01-01");
  const endDate = new Date();

  return new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );
}

export const promise = <T>(result: T, ms = 500): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
};

export const getPagination = (req: Request) => {
  const page = parseInt(req.query?.page as string) || 1;
  const limit = parseInt(req.query?.limit as string) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;

  return { page, limit, start, end };
};

export function getPaginatedData<T>(req: Request, data: T[]) {
  const { page, limit, start, end } = getPagination(req);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    perPage: limit,
    currentPage: page,
    totalPages,
    totalItems: data.length,
    data: data.slice(start, end),
  };
}

export function getSortParams(req: Request) {
  try {
    const sorting = req.query.sorting as string;

    if (!sorting) return [];

    return JSON.parse(sorting) as Array<{
      sortBy: string;
      sortDir: "desc" | "asc";
    }>;
  } catch (error) {
    return [];
  }
}

export type Pagination = ReturnType<typeof getPagination>;
