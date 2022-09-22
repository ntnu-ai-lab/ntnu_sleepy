import "react-native-url-polyfill/auto";
import ProjectProvider from "./auth/ProjectProvider";
import React from "react";
import AuthProvider from "./auth/AuthProvider";
import { Navigation } from "./components/Navigation";
import { RecoilRoot } from "recoil";
import { StorageController } from "./devicestorage/StorageController";

export default function App() {
  return (
    <ProjectProvider>
      <AuthProvider>
        <RecoilRoot>
          <StorageController>
            <Navigation />
          </StorageController>
        </RecoilRoot>
      </AuthProvider>
    </ProjectProvider>
  );
}
