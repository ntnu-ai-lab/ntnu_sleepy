import { storeCachedModules } from "../devicestorage/StorageController";
import { callApi } from "../helpers/callApi";
import { Module } from "../types/modules";

//gets specific module based on id
export async function getModule(identiyId: string) {
  const response = await callApi<Module>(`modules/${identiyId}/`, {
    method: "GET",
  });

  if (response.data) {
    const module: Module = response.data;
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
