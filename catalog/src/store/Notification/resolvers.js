import gql from 'graphql-tag';

const resolvers = {
  Mutation: {
    sendNotification: (_, args, { cache }) => {
      const notification = {
        ...args,
        visible: true,
        __typename: 'Notification',
      };
      cache.writeData({
        data: {
          notification,
        },
      });
      return notification;
    },
    clearNotification: (_, args, { cache }) => {
      const notification = cache.readQuery({
        query: gql`
          query notification {
            notification @client {
              title
              color
              icon
              visible
            }
          }
        `,
      }).notification;

      cache.writeData({
        data: {
          notification: {
            ...notification,
            visible: false,
          },
        },
      });
      return null;
    },
  },
};

export default resolvers;
