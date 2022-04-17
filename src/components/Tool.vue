<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps<{
  total: number
  doneTotal: number
}>()
const { total, doneTotal } = toRefs(props)

const emit = defineEmits<{
  (event: 'toggleAllDone', isAllDone: boolean): void
  (event: 'clearAllDone'): void
}>()

const isAllDone = computed({
  get() {
    return doneTotal.value === total.value && total.value > 0
  },
  set(newVal: boolean) {
    emit('toggleAllDone', newVal)
  },
})

const clearDone = () => {
  if (window.confirm('确认删除已完成任务吗？')) {
    emit('clearAllDone')
  }
}
</script>

<template>
  <div v-show="total" class="todo-footer">
    <label>全部完成<input v-model="isAllDone" type="checkbox" /></label>
    <span> 已完成 {{ doneTotal }} 项/ 全部 {{ total }} 项</span>
    <button class="btn btn-danger" @click="clearDone">清除已完成任务</button>
  </div>
</template>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
