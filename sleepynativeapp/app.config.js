
export default (parent = {}) => {
    // We gracefully destruct these parameters to avoid "undefined" errors:
    const { config = {} } = parent
    const { env = {} } = process || {}
  
    const {
      // This is the URL of your deployment. In our case we use the ORY Demo
      // environment
      KRATOS_URL = "https://localhost:4433",

    } = env
  
    return {
      ...config,
      extra: {
        kratosUrl: KRATOS_URL,
      },
    }
  }