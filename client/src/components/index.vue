<template>

    <div style="width:100%">
        <router-link class="el-button el-button--primary" to="add" tag="el-button">添加用户</router-link>

        <el-table :data="person" @row-click	="themesHandler">
            <el-table-column
                prop="id"
                label="id">
            </el-table-column>
            <el-table-column
                prop="firstName"
                label="firstName">
            </el-table-column>
            <el-table-column
                prop="lastName"
                label="lastName">
            </el-table-column>
            <el-table-column
                prop="email"
                label="email">
            </el-table-column>

            <el-table-column
                prop="avatar"
                label="avatar">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" style="width:60px;height:60px"/>
                </template>

            </el-table-column>

            <el-table-column
                prop=null
                label="OPERATION">
                <template slot-scope="scope">
                    <a href="javascript:void(0)" @click.stop.prevent="deleteHandler(scope.row)">Delete</a> / 
                    <a href="javascript:void(0)" @click.stop.prevent="editHandler(scope.row)">Edit</a>
                </template>
            </el-table-column>


        </el-table>
        <el-pagination
            layout="prev, pager, next"
            :total="ptotal"
            :page-size="5"
              @current-change="handleCurrentChange"
        >
        </el-pagination>
    </div>
    
</template>

<script>
    import gql from 'graphql-tag'
    export default {
        apollo:{
             $subscribe:{
                person:{
                     query: gql`query($pindex:Int!,$psize:Int){person(pindex:$pindex,psize:$psize) {
                        id
                        firstName
                        lastName
                        email
                        avatar
                    }}`,
                    variables(){
                        return {
                            pindex:this.pindex,
                            psize:5
                        }
                    },
                    result:function({data}){
                        this.person=data.person
                    }
                },
                deletePerson:{
                    query:gql`mutation($id:Int!){
                                deletePerson(id:$id)
                            }`,
                    variables(){
                        return {id:this.did}
                    },
                    result:function({data}){
                       this.$apollo.subscriptions.person.refresh()

                    }
                },
                personCount:{
                    query:gql`{personCount}`,
                    result:function({data}){
                      this.ptotal = data.personCount

                    }
                }
            },
        },
        data:function(){
            return {
                person:[],
                did:null,
                pindex:1,
                ptotal:0
            }
        },
        methods:{
            themesHandler:function(item){
                this.$router.push({path:`/themes/${item.id}`})
            },
            deleteHandler:function(item){
                this.did=item.id
            },
            handleCurrentChange:function(pindex){
                this.pindex=pindex;
            },
            editHandler:function(item){
                
                this.$router.push({path:`/edit/${item.id}`})

            }
        },
        mounted:function(){

            console.log(this)
        }
    }
</script>

<style>
.horizontal-list{
    width:100%;
    overflow:hidden;
}
.horizontal-list>li{
    display:flex;
    flex-directives:row;
    border-bottom:1px solid rgba(120,120,120,.54);
    padding:10px 0px 10px 0px;
    transition:all 0.5s;
    cursor:pointer;
}
.horizontal-list>li:hover{
    background-color: rgba(120,120,120,.1);

    padding:15px 0px 15px 0px;

}
.horizontal-list>li>div{
    flex:1
}


</style>