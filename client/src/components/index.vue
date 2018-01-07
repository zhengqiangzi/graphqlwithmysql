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
        </el-table>

    </div>
    
</template>

<script>
    import gql from 'graphql-tag'
    export default {
        apollo:{
            person:gql`  {person {
                id
                firstName
                lastName
                email
            }}`
        },
        data:function(){

            return {
            }
        },
        methods:{
            themesHandler:function(item){
             this.$router.push({path:`/themes/${item.id}`})
            }
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