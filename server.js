const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

import _ from "lodash";

// Some fake data
const books = [
  {
    id:1,
    title: "Harry Potter and the Sorcerer's stone",
    author: 1,
    msg:1
  },
  {
    id:2,
    title: 'Jurassic Park',
    author: 2,
    msg:2
  },
];

const messages=[
    {id:1,content:"this is good books"},
    {id:2,content:"this is good books2"}
]

const authors=[
  { id:1,name:"author1"},
  { id:2,name:"author2"}
]
// The GraphQL schema in string form
const typeDefs = `
  type Book {
    id:Int
    title:String
    author:Author
    msg:Msg
  }
  type Msg {
    content:String
    id:Int
  }
  type Author {
    id:Int
    name:String
  }
  type Query {
      book(id:Int!): Book,
      books:[Book]
   }
`;
// The resolvers
const resolvers = {
  Query: { 
    book:function(_book,{id}){
      let _data =books.find((item)=>{
        return item.id==id
      });
      return _data
    },
    books:function(){
        return books
    }
  },
  Msg:{
    content:function(_r,book){
      var r =  messages.find((item)=>{
          return _r==item.id
        })
        return r.content
    },
    id:function(_r){
      var r = messages.find((item) => {
        return _r == item.id
      })
      return r.id

    }
  },
  Author:{
    id:function(_){
     let r =  authors.find((item)=>{
        return item.id==_
      })
      return r.id
    },
    name:function(_){
      let r = authors.find((item) => {
        return item.id == _
      })
      return r.name
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