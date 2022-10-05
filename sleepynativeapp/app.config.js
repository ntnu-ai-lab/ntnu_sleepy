export default (parent = {}) => {
  // We gracefully destruct these parameters to avoid "undefined" errors:
  const { config = {} } = parent;
  const { env = {} } = process || {};

  const {
    // environment
    KRATOS_URL = "https://somnus.idi.ntnu.no/auth",
    STATIC_URL = "https://somnus.idi.ntnu.no/static",
  } = env;

  return {
    ...config,
    extra: {
      kratosUrl: KRATOS_URL,
      staticUrl: STATIC_URL,
    },
  };
};
