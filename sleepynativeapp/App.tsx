import "react-native-url-polyfill/auto";
import ProjectProvider from "./auth/ProjectProvider";
import React from "react";
import AuthProvider from "./auth/AuthProvider";
import { RecoilRoot } from "recoil";
import { StorageController } from "./devicestorage/StorageController";
import { Provider as PaperProvider } from "react-native-paper";
import { Navigation } from "./components/Navigation";

export default function App() {
  return (
    <ProjectProvider>
      <AuthProvider>
        <PaperProvider>
          <RecoilRoot>
            <StorageController>
              <Navigation />
            </StorageController>
          </RecoilRoot>
        </PaperProvider>
      </AuthProvider>
    </ProjectProvider>
  );
}
