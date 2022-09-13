import ProjectProvider from "./auth/ProjectProvider";
import React from "react";
import AuthProvider from "./auth/AuthProvider";
import { Navigation } from "./components/Navigation";

export default function App() {

  return (
    <ProjectProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </ProjectProvider>
  );
}
