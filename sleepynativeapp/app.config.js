
export default (parent = {}) => {
    // We gracefully destruct these parameters to avoid "undefined" errors:
    const { config = {} } = parent
    const { env = {} } = process || {}
  
    const {
      // environment
      KRATOS_URL = "http://10.0.2.2:4433",

    } = env
  
    return {
      ...config,
      extra: {
        kratosUrl: KRATOS_URL,
      },
    }
  }