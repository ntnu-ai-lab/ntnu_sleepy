export default (parent = {}) => {
  // We gracefully destruct these parameters to avoid "undefined" errors:
  const { config = {} } = parent;
  const { env = {} } = process || {};

  const {
    // environment
    KRATOS_URL = "https://somnus.idi.ntnu.no/auth",
    STATIC_URL = "https://somnus.idi.ntnu.no/static",
    API_URL = "https://somnus.idi.ntnu.no/api",
  } = env;

  return {
    ...config,
    extra: {
      kratosUrl: KRATOS_URL,
      staticUrl: STATIC_URL,
      apiUrl: API_URL,
      eas: {
        projectId: "4682f5a6-523f-4b8b-b5d2-08754e05b2c0",
      },
    },
  };
};
