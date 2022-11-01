import { ReactNode, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getAllModules } from "../api/modulesApi";
import { AuthContext } from "../auth/AuthProvider";
import { loggedInUser } from "./atoms";

export function ApiController(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const user = useRecoilValue(loggedInUser)

  useEffect(() => {
    if (isAuthenticated && user) {
      getAllModules();
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
