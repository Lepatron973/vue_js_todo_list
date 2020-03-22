<template>
	<tbody>	
		<!-- boucle sur les différentes données issue de DB -->
		<tr v-for='(task, index) in tasks' :key="task.text">
			<td class="d-flex justify-content-between" >
				<div class="form-check">
					<input type="checkbox" class="form-check-input " v-model="task.status" >
					<label class="form-check-label pl-2">{{task.text}} {{task.status}} </label>
				</div>
				<button class="btn btn-danger" @click="del(index)">x</button>
			</td>
		</tr>
	</tbody>
</template>

<script>
	export default{
		name:'Tasks',
		props:{
			tasks: Array
		},
		methods: {
			del: function(index){
				this.$emit("delete-task",index)

			}
		}

	}
</script>