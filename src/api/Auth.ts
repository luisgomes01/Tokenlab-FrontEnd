import Api from '.';


export const signIn = async (data: AuthSignIn): Promise<User> => {
  const response = await Api.post('/auth', data);

  return response.data;
}