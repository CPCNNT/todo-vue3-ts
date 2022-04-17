<script setup lang="ts">
import Item from './Item.vue'
import Todo from '../types/todo'

const props = defineProps<{ todos: Todo[] }>()
</script>

<template>
  <ul class="todo-main">
    <Item v-for="todo in props.todos" :key="todo.id" :todo="todo" />
  </ul>
</template>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
