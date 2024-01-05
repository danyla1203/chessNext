export const codeConfirm = async (code: string, email: string) => {
  const host = process.env.NEXT_PUBLIC_API_HOST as string;
  try {
    return (
      await fetch(`${host}/auth/verify-email`, {
        method: 'PATCH',
        body: JSON.stringify({ code, email }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  } catch (e) {
    console.error('Verification failed');
  }
};
