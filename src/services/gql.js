import { GraphQLClient } from 'graphql-request';

const endpoint =
  'https://mvxrhy4ufbhfdojcwfdf7hvuky.appsync-api.ap-south-1.amazonaws.com/graphql';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'x-api-key': 'da2-6mkzyytq4vbzzbs5cp7uq3cyua',
  },
});

export default graphQLClient;
