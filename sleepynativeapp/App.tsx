import "react-native-url-polyfill/auto";
import ProjectProvider from "./auth/ProjectProvider";
import React, { useEffect } from "react";
import AuthProvider from "./auth/AuthProvider";
import { RecoilRoot } from "recoil";
import { StorageController } from "./devicestorage/StorageController";
import { Provider as PaperProvider } from "react-native-paper";
import { Navigation } from "./components/Navigation";
import MatomoTracker, {
  MatomoProvider,
  useMatomo,
} from "matomo-tracker-react-native";
import { View } from "react-native";

const MainAppContainer = () => {
  const { trackAppStart } = useMatomo();

  useEffect(() => {
    trackAppStart;
  }, []);

  return <View>Main App</View>;
};

export default function App() {
  const instance = new MatomoTracker({
    urlBase: "https://matomo.idi.ntnu.no/",
    siteId: 9,
  });
  return (
    <>
      <MatomoProvider instance={instance}>
        <MainAppContainer />
      </MatomoProvider>
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
    </>
  );
}
