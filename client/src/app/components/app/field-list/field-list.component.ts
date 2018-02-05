import { Component, OnInit } from '@angular/core';

import { SocketSerService } from './../../../services/socket-ser/socket-ser.service';

import * as io from 'socket.io-client';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css']
})
export class FieldListComponent implements OnInit {

  private _url = 'http://localhost:4000';
  private _socket;

  fields: any[] = [];
  field: any = {};

  apiMessage: string;

  todoToEdit: any = {};
  todoToDelete: any = {};
  fetchingData: boolean = false;

  constructor(private _socketSerService: SocketSerService) { }

  ngOnInit(): void {
    this._socketSerService.showAddTodoBox = true;

    this._socketSerService.getTodos()
      .then(td => {
        console.log('td', td);
        this.fields = td.fields;
      });

    this._socket = io.connect(this._url);
    // Receive Added Todo
    this._socket.on('fieldAdded', (data) => {
      console.log('TodoAdded: ' + JSON.stringify(data));
      this.fields.push(data.field);
    });
    //Receive Updated Todo
    this._socket.on('fieldUpdated', (data) => {
      console.log('fieldUpdated: ' + JSON.stringify(data));
      const updatedTodos = this.fields.map(t => {
        if (data.field._id !== t._id) {
          return t;
        }
        return { ...t, ...data.field };
      })
      this.apiMessage = data.message;
      this.fields = updatedTodos;
    });

    //Receive Deleted Todo and remove it from liste
    this._socket.on('fieldDeleted', (data) => {
      console.log('fieldDeleted: ' + JSON.stringify(data));
      const filteredTodos = this.fields.filter(t => t._id !== data.field._id);
      this.apiMessage = data.message;
      this.fields = filteredTodos;
    });

  }

  addField(f: any): void {
    console.log('f', f);
    if (!f) { return; }
    this._socketSerService.createField(f, this._socket);
  }

  editField(f: any): void {
    if (!f) { return; }
    f.id = this.todoToEdit._id;
    f.editNow = true;
    this._socketSerService.updateTodo(f, this._socket, 'update');
  }

  deleteFields(f: any): void {
    if (!f) { return; }
    this._socketSerService.deleteTodo(f, this._socket);
  }

  // edited = false;
  showEditTodo(f: any): void {
    this.todoToEdit = f;
    f.id = this.todoToEdit._id;
    const asd = { ...f, editNow: true, id: f._id }
    this._socketSerService.updateTodo(asd, this._socket, 'open');
    
    this.apiMessage = "";
  }

  closeEditTodo(todo: any): void {
    const asd = { ...todo, editNow: false }
    this._socketSerService.updateTodo(asd, this._socket, 'close');
  }

  showDeleteTodo(todo: any): void {
    console.log('todo', todo);
    this.todoToDelete = todo;
    this.apiMessage = "";
  }

}
