import { storeCachedModules } from "../devicestorage/StorageController";
import { callApi } from "../helpers/callApi";
import { Module } from "../types/modules";

export async function getModules(identiyId: string) {
  const response = await callApi<Module[]>(`/modules/modules/${identiyId}/`, {
    method: "GET",
  });

  if (response.data) {
    const modules: Module[] = response.data;
    storeCachedModules(modules);
  }
}
