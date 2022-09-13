import React, { createContext, ReactNode, useEffect, useState } from "react"
import {
  getAuthenticatedSession,
  killAuthenticatedSession,
  SessionContext,
  setAuthenticatedSession,
} from "./Auth"
import { AxiosError } from "axios"
import { newKratosSdk } from "./Sdk"
import { Session } from "@ory/kratos-client"

interface Context {
  project: string
  setProject: (project: string) => void
}

export const ProjectContext = createContext<Context>({
  setProject: () => {},
  project: "playground",
})

interface Props {
  children: ReactNode
}

export default ({ children }: Props) => {
  const [project, setProject] = useState("playground")

  return (
    <ProjectContext.Provider
      value={{
        // Helpers to set the global Ory Project for this app.
        project,
        setProject: (project: string) => {
          setProject(project)
        },
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}