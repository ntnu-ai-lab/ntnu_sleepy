import { Configuration, V0alpha2Api } from "@ory/kratos-client";
import Constants from "expo-constants";
import axiosFactory from "@ory/kratos-client/node_modules/axios/index";
import { resilience } from "./axios";

const axios = axiosFactory.create();
resilience(axios); // Adds retry mechanism to axios

// canonicalize removes the trailing slash from URLs.
const canonicalize = (url: string = "") => url.replace(/\/+$/, "");

// This value comes from ../../app.config.js
export const kratosUrl = (project: string = "Sleepyapp") => {
  const url =
    canonicalize(
      Constants.manifest?.extra?.useLocal === "true" &&
        Constants.manifest?.debuggerHost
        ? `http://${Constants.manifest.debuggerHost.split(":").shift()}:4433`
        : Constants.manifest?.extra?.kratosUrl
    ) || "";

  console.log(url);

  if (url.indexOf("https://playground.projects.oryapis.com/") == -1) {
    // The URL is not from Ory, so let's just return it.
    return url;
  }

  // We handle a special case where we allow the project to be changed
  // if you use an ory project.
  return url;
};

export const newKratosSdk = (project: string) => {
  // console.log(kratosUrl(project))
  return new V0alpha2Api(
    new Configuration({
      basePath: kratosUrl(project),
      baseOptions: {
        // Setting this is very important as axios will send the CSRF cookie otherwise
        // which causes problems with ORY Kratos' security detection.
        withCredentials: false,

        // Timeout after 5 seconds.
        timeout: 10000,
      },
    }),
    "",
    // Ensure that we are using the axios client with retry. ¨
    axios
  );
};
