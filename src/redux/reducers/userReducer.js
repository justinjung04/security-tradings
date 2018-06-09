export default (initialUser) => (user = initialUser, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER':
      return {
        ...user,
        id: payload.id,
        name: payload.name
      };
    default:
      return user;
  }
}