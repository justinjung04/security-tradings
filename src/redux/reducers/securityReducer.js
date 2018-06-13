export default (initialSecurity) => (security = initialSecurity, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_SECURITY_LIST':
      return {
        ...security,
        list: payload.securityList
      };
    default:
      return security;
  }
}