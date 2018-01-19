<template>

    <div style="width:100%">
        {{book}}
    </div>
    
</template>

<script>
    import gql from 'graphql-tag'
    export default {
        apollo:{
            book:{
                query : gql`query($id:Int!){ book(id: $id) { id title author} } `,
                variables(){
                    return {
                        id:this.$route.query.id || 1
                    }
                },
               /* update:function(){

                },
                result:function(){
                    console.log('-----------------------------result--------------------------')
                    console.log(arguments)
                    console.log('-----------------------------result--------------------------')
                },*/
            //   pollInterval: 3000, // ms
            }
        },
        data:function(){
            return {}
        },
        methods:{
            
        },
        mounted:function(){

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