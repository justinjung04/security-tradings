export default (initialApp) => (app = initialApp, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_LOADED':
      return {
        ...app,
        isLoaded: payload.isLoaded
      };
    default:
      return app;
  }
}