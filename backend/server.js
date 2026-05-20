const { createServer } = require("node:http");
const { createYoga, createSchema } = require("graphql-yoga");

const orders = [
    {
        id: "1001",
        customer: "Rahul Mondal",
        items: 13,
        total: 45,
        status: "Delivered",
    },
    {
        id: "1002",
        customer: "Sarah Smith",
        items: 2,
        total: 28,
        status: "Pending",
    },
    {
        id: "1003",
        customer: "Michael Lee",
        items: 5,
        total: 72,
        status: "Preparing",
    },
    {
        id: "1004",
        customer: "Emma Watson",
        items: 1,
        total: 15,
        status: "Cancelled",
    },
];

const yoga = createYoga({
    schema: createSchema({
        typeDefs: `
      type Order {
        id: ID!
        customer: String!
        items: Int!
        total: Int!
        status: String!
      }

      type Query {
        orders: [Order!]!
      }
    `,

        resolvers: {
            Query: {
                orders: () => orders,
            },
        },
    }),
});

const server = createServer(yoga);

server.listen(4000, () => {
    console.log("GraphQL running:");
    console.log("http://localhost:4000/graphql");
});