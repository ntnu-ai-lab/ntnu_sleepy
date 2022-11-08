import { ReactNode, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getAllModules } from "../api/modulesApi";
import { AuthContext } from "../auth/AuthProvider";
import { loggedInUser, moduleIds } from "./atoms";

export function ApiController(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const user = useRecoilValue(loggedInUser)
  const [mIds, setMIds] = useRecoilState(moduleIds)

  useEffect(() => {
    if (isAuthenticated && user) {
      getAllModules().then((r) => {
        setMIds(r)});
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
