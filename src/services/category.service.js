import api from "../api/axios";

const unwrapResponseData = (response) =>  response.data;

const normalizeIds = (ids = []) =>
  ids
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id));

const createMassDestroyPayloads = (data) => {
  if (!Array.isArray(data)) {
    return [data];
  }

  const ids = normalizeIds(data);

  return [
    { ids },
    { indices: ids },
    { indices: ids.join(",") },
  ];
};

const createMassUpdatePayloads = (data) => {
  if (!Array.isArray(data)) {
    return [data];
  }

  const categories = data
    .map((item) => ({
      id: Number(item.id),
      description: item.description ?? "",
    }))
    .filter((item) => Number.isFinite(item.id));

  const ids = categories.map((item) => item.id);

  return [
    { categories },
    { items: categories },
    { ids, categories },
    { indices: ids.join(","), categories },
  ];
};

const postWithFallbacks = async (url, payloads) => {
  let lastError;

  for (const payload of payloads) {
    try {
      const response = await api.post(url, payload);
      return unwrapResponseData(response);
    } catch (error) {
      const status = error?.response?.status;
      lastError = error;

      if (![400, 404, 405, 409, 415, 422].includes(status)) {
        throw error;
      }
    }
  }

  throw lastError;
};

export const getCategories = async (params = {}) => {
  const response = await api.get("/catalog/categories", { params });
  return unwrapResponseData(response);
};

export const getCategory = async (id) => {
  const response = await api.get(`/catalog/categories/${id}`);
  return unwrapResponseData(response);
};

export const createCategory = async (data) => {
  const response = await api.post("/catalog/categories", data);
  return unwrapResponseData(response);
};

export const updateCategory = async (id, data) => {
  const response = await api.put(`/catalog/categories/${id}`, data);
  return unwrapResponseData(response);
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/catalog/categories/${id}`);
  return unwrapResponseData(response);
};

export const massUpdateCategories = async (data) =>
  postWithFallbacks(
    "/catalog/categories/mass-update",
    createMassUpdatePayloads(data),
  );

export const massDestroyCategories = async (data) =>
  postWithFallbacks(
    "/catalog/categories/mass-destroy",
    createMassDestroyPayloads(data),
  );
