import { storeCachedModules } from "../devicestorage/StorageController";
import { callApi } from "../helpers/callApi";
import { Module } from "../types/modules";

//gets specific module based on id
export async function getModule(id: string) {
  const response = await callApi<Module>(`modules/${id}/`, {
    method: "GET",
  });

  if (response.data) {
    return response.data;
  }
}

//gets all modules and stores in cache.
export async function getAllModules() {
  const response = await callApi<Module[]>(`modules/`, {
    method: "GET",
  });

  if (response.data) {
    const modules: Module[] = response.data;
    storeCachedModules(modules);
  }
}
