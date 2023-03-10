import { Component, OnInit } from '@angular/core';
import { debounceTime, last, map, Observable } from 'rxjs';
import { TodoService } from '../todo.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  paginator = {
    length,
    pageSize: 10,
    pageIndex: 0,
    pageSizeOptions: [3, 10, 20],
    hidePageSize: false,
    showPageSizeOptions: true,
    showFirstLastButtons: true,
    disabled: false,
  };
  searchInput!: string;
  pageEvent!: PageEvent;
  todos$!: Observable<any>;
  searchedTodos$!: Observable<any>;

  // We need to create a "lastVisible" variable which holds the value of the last entity
  // in the initial todo's array, and build another query using that, to trigger data
  // fetching when we go to the next page on pagination...
  // https://firebase.google.com/docs/firestore/query-data/query-cursors#paginate_a_query
  lastVisible: any;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getAllTodos(this.paginator, '');
    this.getTotalUsersCounter();
  }

  async getTotalUsersCounter() {
    const data = await this.todoService.getTotalUsers();
    (this.paginator.length = data),
      console.log('Counter: ', data, this.paginator.length);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.paginator.length = e.length;
    this.paginator.pageSize = e.pageSize;
    this.paginator.pageIndex = e.pageIndex;
    this.todos$ = this.todoService.getAllTodos(this.paginator, this.searchInput);
    console.log('Paginator: ', this.paginator);
  }

  onSearch(keyword: string) {
    this.todos$ = this.todoService.searchAllTodos(this.paginator, keyword).pipe(
      map((data: any) => data),
      debounceTime(500)
    );
    if (keyword === '') {
      this.todos$ = this.todoService.getAllTodos(this.paginator, keyword);
    }
  }

  deleteTodo(id: any) {
    this.todoService.deleteTodo(id).then(() => {
      console.log('Deleted successfully!');
    });
  }

  updateTodo(id: any, payload: any) {
    this.todoService.updateTodo(id, payload);
  }
}
