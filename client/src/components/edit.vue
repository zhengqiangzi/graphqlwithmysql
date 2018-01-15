<template>


    <el-form ref="form"  label-width="80px">

        <el-form-item label="firstName">
            <el-input v-model="onePerson2.firstName"></el-input>
        </el-form-item>

        <el-form-item label="lastName">
            <el-input v-model="onePerson2.lastName"></el-input>
        </el-form-item>

        <el-form-item label="email">
            <el-input v-model="onePerson2.email"></el-input>
        </el-form-item>

        <el-form-item label="gender" style="text-align:left">
            <el-switch v-model="onePerson2.info.gender"
            :active-value="1"
            :inactive-value="0">
            </el-switch>
        </el-form-item>

        <el-form-item label="address">
            <el-input v-model="onePerson2.info.address"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
import gql from 'graphql-tag';
import  _  from 'lodash'

    export default {
        data:function(){
            return {
                onePerson2:{
                    info:{
                        gender:1,
                        address:""
                    }
                },
            }
        },
        apollo:{

            onePerson:{
                query:gql`query($id:Int!){ onePerson(id: $id) {
                        id
                        firstName
                        lastName
                        email
                        info{
                            address
                            gender
                        }
                    }}`,
                variables:function(){
                    return {id:this.$route.params.id}
                },
                result:function(data){

                    this.onePerson2 = _.cloneDeep(data.data.onePerson)
                }
             }
             
        },
        
        methods:{
            onSubmit:function(){

            }
        }
    }
</script>