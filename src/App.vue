<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Add from './components/Add.vue'
import List from './components/List.vue'
import Tool from './components/Tool.vue'
import { computed, onMounted, provide, reactive, watch } from 'vue'
import Todo from './types/todo'
import { readTodos, saveTodos } from './utils/locallyStoreTodos'

const todos = reactive<Todo[]>([])
onMounted(() => {
  setTimeout(() => {
    todos.push(...readTodos())
  }, 1000)
})

watch(todos, (newValue) => {
  saveTodos(newValue)
})

const addTodo = (todo: Todo) => {
  todos.unshift(todo)
}

const deleteTodo = (id: number) => {
  let idx = 0
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      idx = i
      break
    }
  }
  todos.splice(idx, 1)
}

const toggleDone = (id: number) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].isDone = !todos[i].isDone
      break
    }
  }
}

const total = computed(() => todos.length)

const doneTotal = computed(() =>
  todos.reduce((pre, cur) => pre + (cur.isDone ? 1 : 0), 0)
)

const toggleAllDone = (isAllDone: boolean) => {
  todos.forEach((item) => {
    item.isDone = isAllDone
  })
}

const clearAllDone = () => {
  const temp = todos.filter((item) => !item.isDone)
  todos.length = 0
  todos.push(...temp)
}

const updateTodoTitle = (id: number, newVal: string) => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      todos[i].title = newVal
      break
    }
  }
}

provide('deleteTodo', deleteTodo)
provide('toggleDone', toggleDone)
provide('updateTodoTitle', updateTodoTitle)
</script>

<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <h1>Your TodoList</h1>
      <Add @add-todo="addTodo" />
      <List :todos="todos" />
      <Tool
        :total="total"
        :done-total="doneTotal"
        @toggle-all-done="toggleAllDone"
        @clear-all-done="clearAllDone"
      />
    </div>
  </div>
</template>

<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.todo-wrap h1 {
  text-align: center;
}
</style>
