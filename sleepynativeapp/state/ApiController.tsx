import { ReactNode, useContext, useEffect } from "react";
import { getAllModules } from "../api/modulesApi";
import { AuthContext } from "../auth/AuthProvider";

export function ApiController(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      getAllModules();
    }
  }, [isAuthenticated]);

  return <>{children}</>;
}
