import Todo from '../types/todo'

export function saveTodos(todos: Todo[]) {
  localStorage.setItem('TODOS', JSON.stringify(todos))
}

export function readTodos(): Todo[] {
  return JSON.parse(localStorage.getItem('TODOS') ?? '[]')
}
