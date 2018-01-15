import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
	GraphQLBoolean
} from 'graphql'
import DB from "./DB.js";
import Faker from "faker";
var Person = new GraphQLObjectType({
    name:"Person",
    description:"Person",
    fields:()=>{
    	return {
			id:{
				type:GraphQLInt,
				resolve(person){
					return person.id
				}
			},
	        firstName:{
	            type:GraphQLString,
	            resolve(person){
	                return person.firstName
	            }   
	        },
	        lastName:{
	            type:GraphQLString,
	            resolve(person){
	                return person.lastName
	            }   
	        },
	        email:{
	            type:GraphQLString,
	            resolve(person){
	                return person.email
	            }   
	        },
	        avatar:{
	            type:GraphQLString,
	            resolve(person){
	                return person.avatar
	            }   
	        },
	        posts:{
	            type:new GraphQLList(Post),
	            resolve(person){
	              return person.getPosts()
	            }
	        },
	        info:{
	        	type:Info,
	        	resolve(person){
	        		return person.getInfo()
	        	}
	        }
    	}

    }
})
var Post= new GraphQLObjectType({
    name:"Post",
    description:"post",
    fields:()=>{
    	return {
	        title:{
	            type:GraphQLString,
	            resolve(post){
	                return post.title
	            }
	        },
	        content:{
	            type:GraphQLString,
	            resolve(post){
	                return post.content
	            }
	        },
	        publishTime:{
	            type:GraphQLString,
	            resolve(post){
	                return post.publishTime
	            }
	        },
	        person:{
	        	type:Person,
	        	resolve(post){
	        		return post.getPerson()
	        	}
	        }
   		}
    }
})
var Info  =new GraphQLObjectType({
	name:"Info",
	description:"info",
	fields:()=>{
		return {
			address:{
				type:GraphQLString,
				resolve(info){
					return info.address
				}
			},
			gender:{
				type:GraphQLInt,
				resolve(info){
					return info.gender
				}
			},
			author:{
				type:Person,
				resolve(info){
					return info.getPerson();
				}
			}
		}
	}
})
var  Query = new GraphQLObjectType({
    name:"rootQuery",
    description:"rootQuery",
    fields:{
        person:{
            type:new GraphQLList(Person),
			args:{
				pindex:{
					type:GraphQLInt
				},
				psize:{
					type:GraphQLInt
				}
			},
            resolve(root,args){
                return DB.models.Person.findAll({limit:args.psize,offset:(args.pindex-1)*args.psize})
            }
		},
		personCount:{
			type:GraphQLInt,
			resolve(_,args){
				return DB.models.Person.findAndCountAll().then((_data)=>{
					return _data.count
				})
			}
		},
		onePerson:{
			type:Person,
			args:{
				id:{
					type:new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve(_,args){
                return DB.models.Person.findByPrimary(args.id)
			}
		},
        posts:{
            type:new GraphQLList(Post),
            resolve(root,args){
                return DB.models.Post.findAll(({where:args}))
            }
        },
        infos:{
        	type:new GraphQLList(Info),
        	resolve(root,args){
        		return DB.models.Info.findAll({where:args})
        	}
        }
    }
})

var mutations=new GraphQLObjectType({
	name:"mutation",
	description:"this is mutation",
	fields:()=>{
		return {
			addPerson:{
				type:Person,
				args:{
					firstName:{
						type:new GraphQLNonNull(GraphQLString)
					},
					lastName:{
						type: new GraphQLNonNull(GraphQLString)
					},
					email:{
						type: new GraphQLNonNull(GraphQLString)
					},
					avatar:{
						type: GraphQLString
					},
					gender:{
						type:GraphQLBoolean
					},
					address:{
						type:GraphQLString
					}
				},
				resolve(root,args){
					return DB.models.Person.create({
						firstName:args.firstName,
						lastName:args.lastName,
						email:args.email,
						avatar:Faker.image.avatar()
						
					}).then((person)=>{
						return person.createInfo({
							gender:args.gender,
							address:args.address
						})
					})
				}
			},
			deletePerson:{
				type:GraphQLBoolean,
				args:{
					id:{
						type:new GraphQLNonNull(GraphQLInt)
					}
				},
				resolve(root,args){
					return DB.models.Person.destroy({ where: args, force: true, cascade:true}).then((person)=>{

						return person
					})


				}

			}
		}
	}
})

 export default new GraphQLSchema({
	 query:Query,
	 mutation:mutations
})
