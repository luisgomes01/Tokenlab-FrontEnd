import Api from '.';


export const signUp = async (data: User): Promise<User> => {
  const response = await Api.post('/users', data);
  return response.data;
}
