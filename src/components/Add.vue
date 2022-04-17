<script setup lang="ts">
import { ref } from 'vue'
import Todo from '../types/todo'

const emit = defineEmits<{ (event: 'addTodo', todo: Todo): void }>()
const title = ref('')
const add = () => {
  const text = title.value
  if (!text.trim()) {
    alert('输入不能为空！')
    title.value = ''
    return
  }
  const todo: Todo = {
    id: Date.now(),
    title: text.trim(),
    isDone: false,
    isBeingEdited: false,
  }
  emit('addTodo', todo)
  title.value = ''
}
</script>

<template>
  <div class="todo-header">
    <input
      v-model="title"
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      @keyup.enter="add"
    />
  </div>
</template>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
