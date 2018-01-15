<template>
    <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="firstName">
            <el-input v-model="form.firstName"></el-input>
        </el-form-item>

        <el-form-item label="lastName">
            <el-input v-model="form.lastName"></el-input>
        </el-form-item>

        <el-form-item label="email">
            <el-input v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="gender" style="text-align:left">
            <el-switch v-model="form.gender"></el-switch>
        </el-form-item>
        <el-form-item label="address">
            <el-input v-model="form.address"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
import Faker from 'faker'
import gql from "graphql-tag"
    export default {
        data:function(){
            return {
                form:{
                    firstName:Faker.name.firstName(),
                    lastName:Faker.name.lastName(),
                    email:Faker.internet.email(),
                    gender:true,
                    address:Faker.address.streetAddress(),
                }
            }
        },
        methods:{
            onSubmit:function(){
                this.$apollo.mutate(
                    {
                        mutation:gql`mutation($firstName:String!,$lastName:String!,$email:String!,$avatar:String,$gender:Boolean!,$address:String!){
                                addPerson(firstName:$firstName,lastName:$lastName,email:$email,avatar:$avatar,gender:$gender,address:$address){
                                    firstName,
                                    lastName,
                                    email
                                    avatar
                                }
                                }`,
                        variables:{
                            firstName:this.form.firstName,
                            lastName:this.form.lastName,
                            email:this.form.email,
                            avatar:Faker.image.avatar(),
                            gender:this.form.gender,
                            address:this.form.address
                        }
                        

                }).then((data)=>{

                    this.$router.push({path:"/"})
                })
            }
        }
    }
</script>