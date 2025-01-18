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
// import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from '@graphql-tools/schema';
import mqtt from 'mqtt';

interface MyContext {
  token?: String;
  schema?: String;
}
const app = express();
const httpServer = http.createServer(app);

// const wsServer = new WebSocketServer({
//   server: httpServer,
//   path: '/graphql',
// });

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

// Connect to the MQTT broker
const mtqq_host = process.env.MTQQ_HOST_URL?.toString() || 'mqtt://localhost:1883';
console.log(mtqq_host);
const mqttClient = mqtt.connect(mtqq_host);

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');

  // Subscribe to a topic
  mqttClient.subscribe('maintenance/updates', (err) => {
    if (!err) {
      console.log('Subscribed to maintenance/updates');
    }
  });
});

mqttClient.on('error', (error) => {
  console.error('MQTT connection error:', error);
});

mqttClient.on('message', (topic, message) => {
  // Handle incoming messages
  console.log(`Received message: ${message.toString()} on topic: ${topic}`);
});

async function startServer() {
  
  const PORT = process.env.PORT || 4000;
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: Number(PORT) },
  });

  console.log(`🚀  Server ready at ${url}graphql`);

  // const subscribews = SubscriptionServer.create(
  // {
  //     execute,
  //     subscribe,
  //     schema,
  //     onConnect: () => {
  //       console.log('Client connected to WebSocket');
  //     },
  //     onDisconnect: () => {
  //       console.log('Client disconnected from WebSocket');
  //     },
  //   },
  //   {
  //     server: httpServer,
  //     path: '/graphql',
  //   }
  // );
  // console.log('WebSocket server is running on ws://localhost:4000/graphql', subscribews);

}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});