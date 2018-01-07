import Express from 'express';
import graphqlHTTP from 'express-graphql'
import schema from "./schema.js"
import cors  from 'cors'

const APP_PORT = 3000;


const app = new Express();

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
  pretty:true
}))
app.listen(APP_PORT,function(){
	console.log( `server is turn on at port ${APP_PORT} `)
})