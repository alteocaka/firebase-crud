import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private firestore: AngularFirestore) {}

  // Get All Todos
  getAllTodos(paginator: any) {
    return this.firestore
      .collection('todos', (ref) => ref.limit(paginator.pageSize))
      .valueChanges({ idField: 'id' });
  }

  // Search Todos
  searchAllTodos(paginator: any, keyword: string) {
    return this.firestore
      .collection('todos', (ref) =>
        // Problem: Filter is case sensitive..
        ref
          .orderBy('name')
          .startAt(keyword)
          .endAt(keyword + '\uf8ff')
          .limit(paginator.pageSize)
      )
      .valueChanges({ idField: 'id' });
  }

  // Create Todo
  addTodo(todo: any) {
    const id = this.firestore.createId();
    return this.firestore.collection('todos').doc(id).set(todo);
  }

  // Update Todo
  updateTodo(id: any, payload: any) {
    return this.firestore.collection('todos').doc(id).update(payload);
  }

  // Delete Todo
  deleteTodo(id: any) {
    return this.firestore.collection('todos').doc(id).delete();
  }
}
