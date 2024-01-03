export const getProfile = async (accessToken: string) => {
  const host = process.env.API_HOST as string;
  try {
    return (
      await fetch(`${host}/user`, {
        headers: {
          Authorization: accessToken,
        },
      })
    ).json();
  } catch (e) {
    console.error('Access token is invalid');
  }
};
