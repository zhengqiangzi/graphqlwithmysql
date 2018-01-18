const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
import _ from "lodash";
import Faker from 'faker';


const {books,messages,authors }= (()=>{
  let _books=[]
  let _messages=[]
  let _authors=[]
  for(var i=1;i<=100;i++)
  {
    let _book_title = Faker.name.jobTitle()
    _books.push({
        id : i,
        title: _book_title,
        author:i,
        msg:i
    })
    _messages.push({
      id:i,
      content: `messages about ${_book_title}`
    })
    _authors.push({
      id:i,
      name:Faker.name.firstName()
    })
  }
  return { books: _books, authors: _authors, messages:_messages}
})()
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
      books(pnu:Int,psize:Int):[Book]
   }
   type Mutation{
      addBook(title:String!,author:String!,msg:String!):Book
   }
`;

let base_id=102
// The resolvers
const resolvers = {
  Query: { 
    book:function(_book,{id}){
      let _data =books.find((item)=>{
        return item.id==id
      });
      return _data
    },
    books:function(root,{pnu,psize}){
        if(pnu){
          let g = _.chunk(books,psize)
          return g[pnu-1]
        } 
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
    name:function(_,args,context){
      /**
       * context 服务器传回的相伴信息
        console.log(context.username)
      */
      let r = authors.find((item) => {
        return item.id == _
      })
      return r.name +'--->'+ context.username.toUpperCase()
    }
  },
  Mutation:{
    addBook:(_,{title,msg,author})=>{
      let k = {
        id: base_id,
        title: title,
        author: base_id,
        msg: base_id
      }
      books.unshift(k)
      authors.unshift({
        id: base_id,
        name:author
      })
      messages.unshift({
        id: base_id,
        content:msg,
      })
      base_id++;

      return k
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
        username:"zhengqiangzi"//字段resolve中 function第三个参数可以读取此处内容 
      }
    }
}));
// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});