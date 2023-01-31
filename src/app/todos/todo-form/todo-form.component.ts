import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css'],
})
export class TodoFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onFormSubmit(input: any) {
    this.formSubmit.emit(input.value);
    // Reset:
    input.value = '';
  }
}
