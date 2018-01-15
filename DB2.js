const Sequelize=require("sequelize");
const Faker= require("faker")
const _ = require("lodash");

let DB = new Sequelize('test2',"root",null,{

    dialect:"mysql"
});

DB.define("Person",{

    uid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true

    },
    name:{
        type:Sequelize.STRING,
        unique:true,
        validate:{
            len:{
                args:[6,110],
                msg:"请输入6~10个字符"
            },
            isUppercaseFirst: function (value) {

                var value = value.charAt(0)

                if (value === value.toUpperCase()) {

                } else {

                    throw (new Error("please up first lette to Uppercase"))
                }

            }
        }
    },
    gender:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    email:{
        type:Sequelize.STRING,
        validate:{
            isEmail:{
                args:true,
                msg:"请输入 正确的email格式 "
            }

        }

    }

},
{
    timestamps:false,
    freezeTableName:true
})

DB.sync({force:true,logging:()=>{}}).then((data)=>{

    _.times(10,()=>{

            data.models.Person.create({
                name: Faker.name.lastName()+"."+Faker.name.firstName(),
                gender:Math.random()>0.5,
                email:Faker.internet.email()
            })

    })

})