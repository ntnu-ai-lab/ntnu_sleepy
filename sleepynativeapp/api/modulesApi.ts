import { useEffect, useState } from "react";
import { storeCachedModules } from "../devicestorage/StorageController";
import { callApi } from "../helpers/callApi";
import { Module } from "../types/modules";

//gets specific module based on id
export async function getModule(
  id: string
): Promise<
  { module: Module; error: undefined } | { error: any; module: undefined }
> {
  const response = await callApi<Module>(
    `modules/${id}/?expand=pages,pages.sections`,
    {
      method: "GET",
    }
  );

  if (response.response.ok && response.data) {
    return { module: response.data, error: undefined };
  }
  return { error: response.error, module: undefined };
}

//gets all modules and stores in cache.
export async function getAllModules() {
  const response = await callApi<Module[]>(`modules/`, {
    method: "GET",
  });

  if (response.data) {
    const modules: Module[] = response.data;
    storeCachedModules(modules);
    return modules;
  }
}

export function useModule(id: string) {
  const [module, setModule] = useState<Module | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function handleGetModules() {
      const response = await getModule(id);
      response.module && setModule(response.module);
      response.error && setError(response.error);
    }
    handleGetModules();
  }, [id]);

  return {
    module,
    error,
    loading: !module && !error,
  };
}
