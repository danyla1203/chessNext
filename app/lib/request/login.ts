type LoginData = {
  email: string;
  password: string;
};

export const userLogin = async (data: LoginData) => {
  const host = process.env.NEXT_PUBLIC_API_HOST as string;
  try {
    return (
      await fetch(`${host}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
    ).json();
  } catch (e) {
    console.error('Login failed');
  }
};
