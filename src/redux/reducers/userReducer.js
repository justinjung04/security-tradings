export default (initialUser) => (user = initialUser, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER':
      return {
        ...user,
        id: payload.id,
        name: payload.name
      };
    case 'SET_USER_SECURITIES':
      return {
        ...user,
        securities: payload.securities
      };
    case 'SET_USER_ACTION':
      return {
        ...user,
        action: {
          type: payload.type,
          security: payload.security
        }
      };
    default:
      return user;
  }
}