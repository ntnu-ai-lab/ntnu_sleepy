import { useEffect, useState } from "react";
import { storeCachedModules, storeModuleIds } from "../state/StorageController";
import { callApi } from "./callApi";
import { Module, ModuleExpanded } from "../types/modules";

//gets specific module based on id
export async function getModule(
  id: string
): Promise<
  | { module: ModuleExpanded; error: undefined }
  | { error: any; module: undefined }
> {
  const response = await callApi<ModuleExpanded>(
    `modules/${id}/?expand=parts,parts.pages,parts.pages.sections`,
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
    const moduleIds = response.data;
    storeModuleIds(moduleIds)
    return moduleIds
  }
}

export function useModule(
  id?: string
):
  | { module: ModuleExpanded; loading: false; error: undefined }
  | { module: undefined; loading: true; error: undefined }
  | { module: undefined; loading: false; error: string } {
  const [module, setModule] = useState<ModuleExpanded | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function handleGetModules() {
      if (id) {
        const response = await getModule(id);
        response.module && setModule(response.module);
        response.error && setError(response.error);
      }
    }
    handleGetModules();
  }, [id]);

  if (module) {
    return {
      module,
      loading: false,
      error: undefined,
    };
  }
  if (error) {
    return {
      module: undefined,
      error,
      loading: false,
    };
  }
  return {
    loading: true,
    error: undefined,
    module: undefined,
  };
}
