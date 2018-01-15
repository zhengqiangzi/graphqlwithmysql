<template>
    <div>
      
        <router-link class="el-button el-button--primary" to="/" tag="el-button">返回</router-link>

        <el-card class="box-card">

            <div slot="header" class="clearfix">
                <h3> Information <i>{{onePerson.lastName}}.{{onePerson.firstName}}</i></h3>

                <img :src="onePerson.avatar"/>
            </div>

            <div class="card-item"><label><b>Name:</b></label>{{onePerson.lastName}}.{{onePerson.firstName}}</div>
            <div class="card-item"><label><b>Email:</b></label>{{onePerson.email}}</div>
            <div  class="card-item"><label><b>Gender:</b></label>{{onePerson.info.gender==0?"male":"famle"}}</div>
            <div  class="card-item"><label><b>address:</b></label>{{onePerson.info.address}}</div>
        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3>Posts</h3>
            </div>
            
            <div v-for="item in onePerson.posts" style="border-bottom:1px dashed rgba(255,0,0,.3)">
                <p><b>title</b> {{item.title}}</p>
                 <p><b>content</b> {{item.content}}</p>
                 <p><b>publishTime</b> {{item.publishTime|moment}}</p>
            </div>


        </el-card>


    </div>
</template>
<script>
    import gql from 'graphql-tag'
    import moment from "moment"

    export default {

        apollo:{
            onePerson(){ 
                return {
                    query: gql`query onePerson ($id:Int!){
                                onePerson(id: $id) {
                                    id
                                    firstName
                                    lastName
                                    email
                                    avatar
                                    posts {
                                        title
                                        content
                                        publishTime
                                    }
                                    info {
                                        address
                                        gender
                                    }
                                }
                                }`,
                    variables:{
                         id:this.$route.params.id
                    }           
                }
            }
        },

        data:function(){
            return {
                onePerson:{
                    info:{

                    },
                    posts:[]
                },
            }
        },
        filters:{
            moment:function(value){
                return moment(value/1000).format("YYYY-MM-DD")
            }
        }
    }
</script>

<style>
.card-item{
    width:100%;
    padding:10px 0px 10px 0px;
    }
</style>