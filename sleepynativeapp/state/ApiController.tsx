import { ReactNode, useContext, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getAllModules } from "../api/modulesApi";
import { getDiary, listDiaryEntries } from "../api/sleepDiaryApi";
import { AuthContext } from "../auth/AuthProvider";
import { loggedInUser, moduleIds, cachedSleepDiary } from "./atoms";

export function ApiController(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const { isAuthenticated } = useContext(AuthContext);
  const user = useRecoilValue(loggedInUser);
  const [mIds, setMIds] = useRecoilState(moduleIds);
  const [, setCachedSleepDiary] = useRecoilState(cachedSleepDiary);

  useEffect(() => {
    if (isAuthenticated && user) {
      getAllModules().then((r) => {
        setMIds(r);
      });
      getDiary().then((d) => {
        d &&
          listDiaryEntries(d.id).then(
            (e) => e && setCachedSleepDiary({ ...d, diary_entries: e })
          );
      });
    }
  }, [isAuthenticated, user]);

  return <>{children}</>;
}
