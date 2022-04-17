<script setup lang="ts">
import { inject, nextTick, ref, toRef } from 'vue'
import Todo from '../types/todo'

const props = defineProps<{ todo: Todo }>()
const todo = toRef(props, 'todo')

const deleteTodo = inject('deleteTodo') as (id: number) => void
const del = () => {
  if (window.confirm(`确认删除 ${todo.value.title} 吗？`)) {
    deleteTodo(todo.value.id)
  }
}

const toggleDone = inject('toggleDone') as (id: number) => void
const toggle = () => {
  toggleDone(todo.value.id)
}

const editTitle = ref<HTMLInputElement | null>(null)
const edit = () => {
  todo.value.isBeingEdited = true
  nextTick(() => {
    editTitle.value?.focus()
  })
}

const updateTodoTitle = inject('updateTodoTitle') as (
  id: number,
  newVal: string
) => void
const finishEdit = (event: FocusEvent) => {
  todo.value.isBeingEdited = false
  if (!(event.target as HTMLInputElement).value.trim()) {
    alert('输入值不能为空！')
    return
  }
  updateTodoTitle(
    todo.value.id,
    (event.target as HTMLInputElement).value.trim()
  )
}
</script>

<template>
  <li>
    <label>
      <input type="checkbox" :checked="todo.isDone" @change="toggle" />
      <span v-show="!todo.isBeingEdited" v-text="todo.title"></span>
      <input
        v-show="todo.isBeingEdited"
        ref="editTitle"
        type="text"
        :value="todo.title"
        @blur="finishEdit"
      />
    </label>
    <div class="btns">
      <button v-show="!todo.isBeingEdited" class="btn btn-edit" @click="edit">
        编辑
      </button>
      <button class="btn btn-danger" @click="del">删除</button>
    </div>
  </li>
</template>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

.btns {
  float: right;
  display: flex;
  flex-direction: row;
  margin-top: 3px;
}

li button {
  display: none;
  margin-right: 8px;
}

li:hover {
  font-weight: bold;
  color: blueviolet;
  background-color: lightgrey;
}

li:hover button {
  display: block;
}
</style>
