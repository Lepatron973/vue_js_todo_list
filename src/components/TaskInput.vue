<!-- composants comportant le bouton et le champ permettant l'ajout de tâche -->
<template>
	<div class="form-group d-flex">
		<input type="text" v-model="task" class="form-control mr-1">
		<button class="btn btn-success" @click="addTask">ajouter</button>
	</div> 
</template>

<script>
export default{
	name:'TaskInput',
	data: ()=>{
		return {
			task:''
		}
	},
	props:{
		name:String
	},
	methods: {
		//méthode pour l'ajout de tâche, création d'un évenement (newtask) qui sera récupérer par le composant parent
		addTask: function (){
			this.$emit("newtask", this.task) 
			this.task ="";
		}
	}
}
</script>