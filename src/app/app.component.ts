import { Component } from '@angular/core';
import { from } from 'rxjs';
import { TodoService } from './todos/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'firebase-crud';

  constructor(private todoService: TodoService){}

  // Add Todo
  addTodo(value: any) {
    const promise = this.todoService.addTodo({ name: value, done: false });
    const newTodo$ = from(promise);
    newTodo$.subscribe(() => {
      console.log('Added todo!');
    });
  }
}
