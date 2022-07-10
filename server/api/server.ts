import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'

export async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema
  })

  await server.start()

  // Apply middleware
  // app.use()

  // Custom Pathing
  server.applyMiddleware({ app, path: '/graphql' })
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
