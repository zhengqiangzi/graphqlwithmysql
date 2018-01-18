const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

import cors from 'cors';
import _ from "lodash";

// Some fake data
const books = [
  {
    id:1,
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    id:2,
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const messages=[
    {id:3,bid:1,content:"this is good books"},
    {id:4,bid:2,content:"this is good books2"}
]
// The GraphQL schema in string form
const typeDefs = `
  type Book {
    id:Int
    title:String
    author:String
    msg:Msg
  }
  type Msg {
    content:String
    id:Int
  }
  type Query {
      book(id:Int!): Book,
   }
`;
// The resolvers
const resolvers = {
  Query: { 
    book:function(_book,{id}){

      let _data =books.find((item)=>{

        return item.id==id
      })

      let r =  Object.assign({},_data,{msg:_data.id});
      return r
    }
  },
  Msg:{
    content:function(_r,book){
      var p = messages.find((_item)=>{
        return _item.bid == _r
      })
      return p.content
    },
    id:function(_r){
      var p = messages.find((_item) => {
        return _item.bid == _r
      })
      return p.id
    
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();
app.use(cors());

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress((req)=>{

    return {
      schema:schema,
      context: {
        username:"zhengqiangzi"
      }
    }
}));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});