class Todo {
  id: string;
  text: string;
  removeTodos: (item: Todo) => void;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
    this.removeTodos = (item: Todo) => {};
  }
}

export default Todo;
