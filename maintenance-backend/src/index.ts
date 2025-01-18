import './cron/maintenanceCron'; // Import the cron job script
import { ApolloServer } from '@apollo/server';
// import { WebSocketServer } from 'graphql-ws/lib/use/ws';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { startStandaloneServer } from '@apollo/server/standalone';
import { execute, subscribe } from 'graphql';
import { typeDefs, resolvers } from './schemas';
import { ValidationError } from './errors/ValidationError';
import { WebSocketServer } from 'ws';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from '@graphql-tools/schema';

interface MyContext {
  token?: String;
  schema?: String;
}
const app = express();
const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer<MyContext>({
  schema, 
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError: (err) => {
    // Accessing the underlying error
    const originalError = err.extensions?.exception as Error; // Safely casting it

    if (originalError && originalError instanceof ValidationError) {
      return {
        message: err.message,
        statusCode: originalError.statusCode,
        locations: err.locations,
        path: err.path,
      };
    }

    // Default error formatting
    return {
      message: err.message,
      locations: err.locations,
      path: err.path,
    };
  },
});

async function startServer() {
  
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
  });


  console.log(`🚀  Server ready at ${url}graphql`);

  SubscriptionServer.create(
  {
      execute,
      subscribe,
      schema,
      onConnect: () => {
        console.log('Client connected to WebSocket');
      },
      onDisconnect: () => {
        console.log('Client disconnected from WebSocket');
      },
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  );
  console.log('WebSocket server is running on ws://localhost:4000/graphql', SubscriptionServer);

}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});