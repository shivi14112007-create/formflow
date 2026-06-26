export const login = async () => {
  return Promise.resolve({
    success: true,
  });
};

export const logout = async () => {
  return Promise.resolve({
    success: true,
  });
};

export const signup = async (name: string, email: string) => {
  return Promise.resolve({
    success: true,
    user: {
      name,
      email,
    },
  });
};