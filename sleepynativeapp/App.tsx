import "react-native-url-polyfill/auto";
import ProjectProvider from "./auth/ProjectProvider";
import React from "react";
import AuthProvider from "./auth/AuthProvider";
import { Navigation } from "./components/Navigation";
import { RecoilRoot } from "recoil";
import { StorageController } from "./devicestorage/StorageController";
import { Provider as PaperProvider } from "react-native-paper";

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
