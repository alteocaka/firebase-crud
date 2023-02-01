import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, collection, getCountFromServer } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private firestore: AngularFirestore) {}

  // Get Total Number of Entities on collection:

  async getTotalUsers(): Promise<any> {
    const firestore = getFirestore();
    const userCollectionReference = collection(firestore, "todos");
    const userCollectionSnapshot = await getCountFromServer(userCollectionReference);
    return userCollectionSnapshot.data().count;
  }

  // Get All Todos
  getAllTodos(paginator: any, keyword: string) {
    return this.firestore
      .collection('todos', (ref) => ref.limit(paginator.pageSize).orderBy('name').startAt(keyword)
      .endAt(keyword + '\uf8ff'))
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
