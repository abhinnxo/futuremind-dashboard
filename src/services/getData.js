import graphQLClient from './gql';

const fetchClientData = async (query) => {
  try {
    const value = await graphQLClient.request(query);
    return value;
  } catch (error) {
    if (error.response.status === 404) {
      throw error;
    }
    throw error;
  }
};

export default fetchClientData;
