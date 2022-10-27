import "react-native-url-polyfill/auto";
import ProjectProvider from "./auth/ProjectProvider";
import React from "react";
import AuthProvider from "./auth/AuthProvider";
import { RecoilRoot } from "recoil";
import { StorageController } from "./state/StorageController";
import { Provider as PaperProvider } from "react-native-paper";
import { Navigation } from "./components/navigation/Navigation";
import { MainAppContainer } from "./components/matomo/MainAppContainer";
import MatomoTracker, {
  MatomoProvider,
  useMatomo,
} from "matomo-tracker-react-native";
import { ApiController } from "./state/ApiController";

export default function App() {
  const instance = new MatomoTracker({
    urlBase: "https://matomo.idi.ntnu.no/",
    siteId: 9,
  });
  return (
    <ProjectProvider>
      <AuthProvider>
        <PaperProvider>
          <RecoilRoot>
            <ApiController>
              <StorageController>
                <MatomoProvider instance={instance}>
                  <MainAppContainer>
                    <Navigation />
                  </MainAppContainer>
                </MatomoProvider>
              </StorageController>
            </ApiController>
          </RecoilRoot>
        </PaperProvider>
      </AuthProvider>
    </ProjectProvider>
  );
}
