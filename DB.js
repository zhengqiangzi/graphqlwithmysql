import models from "./models"
import Sequelize from "sequelize"
import _ from "lodash"
import Faker from 'faker'
import moment from "moment"
const {sequelize} = models
const Person = sequelize.define("Person",{
	firstName:{
		type:Sequelize.STRING,
		AllowNull:false
	},
	lastName:{
		type:Sequelize.STRING,
		AllowNull:false
	},
	email:{
		type:Sequelize.STRING,
		AllowNull:false,
		validate:{
			isEmail:true
		}
	},
	avatar:{
		type:Sequelize.STRING,
		AllowNull:false
	}
})
const Post = sequelize.define("Post",{
	title:{
		type:Sequelize.STRING,
		AllowNull:false
	},
	content:{
		type:Sequelize.STRING,
		AllowNull:false,
	},
	publishTime:{
		type:Sequelize.BIGINT
	}
})
const Info=sequelize.define("Info",{

	gender:{
		type:Sequelize.BOOLEAN,
		AllowNull:true
	},
	address:{
		type:Sequelize.STRING,
		AllowNull:false
	}
})
Person.hasMany(Post);
Post.belongsTo(Person);
Person.hasOne(Info)
Info.belongsTo(Person)
export default sequelize;
/*sequelize.sync({force:true}).then(()=>{
	_.times(10,function(){
		return Person.create({
			firstName:Faker.name.firstName(),
			lastName:Faker.name.lastName(),
			email:Faker.internet.email(),
			avatar:Faker.image.avatar(),

		}).then((person)=>{
			
			person.createInfo({
				gender:Math.random()>0.5,
				address:Faker.address.streetAddress()
			})
			person.createPost({
				title:`this is title for ${person.firstName}`,
				content:`this is content for ${person.firstName}`,
				publishTime:moment().valueOf()

			})

		})
	})
})
*/