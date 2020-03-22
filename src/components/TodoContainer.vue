<!-- composant comportant la todo list -->
<template>
  <div class="todoContainer">
    <div class="container">
      <table class="table table-hover">
        <thead class="thead-dark">
          <tr>
            <th class="text-center">Todo List</th>          
          </tr>
        </thead>
        <TaskInput @newtask="show"/> <!-- insertion du composant d'ajout de tâche et récupération de l'évènement-->
        <Tasks :tasks="tasks" @delete-task="del"/> <!--insertion des diférentes tâches-->

      </table>
    </div>
    <div class="btn btn-primary">save</div>
  </div>
</template>

<script>

import TaskInput from './TaskInput.vue';
import Tasks from './Tasks.vue'
import db from './firebaseComponents/firebaseInit'
const dbTask = db.collection("task")

export default {
  name: 'TodoContainer',
  components: {TaskInput,Tasks},
  data:() => { 
    return {
      tasks: [],
      state: 1

    }
  },
  computed: {
    done: {
      get: function(){
        return this.tasks.status; 
      },
      set: function(value,){
         // db.collection('task').
         return this.tasks.status = value;
       }
     }
   },
   props: {
    msg: String
  },
  methods: {
    show: function(value){
        // this.tasks.push(value)
        //ajout des nouvelles tâches à la base de données
        dbTask.doc().set({
          status: false,
          text:value 
        });

      },
      del: async function(index){
        try {
          let test = await index;
          console.log(test)
        } catch(e) {
          // statements
          console.log(e);
        }
        //console.log(id)
        //dbTask.doc(id).delete().then( ()=>{console.log('success')})
        
      },
      save: function(){

      }

    },
    // lors du montage de l'élément : récupération des données de la DB
    mounted: function(){
      const listTask = []
      dbTask.get().then( (snapshot) =>{//connection à la base de donnée, récupération d'un instantané comportant les data
        snapshot.forEach( function(element) {//boucles sur les data
          console.log(element.id)
          listTask.push({id:element.id,text:element.data().text})
        });
        this.tasks = listTask
        console.log(this.tasks)
      })
    },
    updated: function(){
      const updatedList = [];
      dbTask.get().then((snap)=>{
        snap.forEach( function(element) {
          if(element != undefined){
            updatedList.push({id:element.id,text:element.data().text})
          }

        });
        this.tasks = updatedList;
      }).catch(err => {
        console.log(err)
      })
    },
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .todoContainer{

    border:   1px;
    text-align: center;
  }
  .container{
    max-height: 500px;
    overflow-y: scroll;
  }
  </style>
