import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  isEditMode: boolean = false;
  @Output() delete = new EventEmitter();
  @Output() udpate = new EventEmitter();
  @Input() name!: string;
  @Input() done!: boolean;

  constructor() {}

  ngOnInit(): void {}

  openUpdateBox() {
    this.isEditMode = true;
  }

  onDelete() {
    this.delete.emit();
  }

  onUpdate(input: any) {
    this.udpate.emit({name: input.value});
    input.value = null;
    this.isEditMode = false;
  }
}
