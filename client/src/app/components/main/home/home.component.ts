import { Component, OnInit } from '@angular/core';

import { SocketSerService } from '../../../services/socket-ser/socket-ser.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos: any[] = [];
  constructor(private _socketSerService: SocketSerService) { }

  ngOnInit(): void {
    this._socketSerService.getTodos()
      .then(todos => this.todos = todos.fields.reverse().slice(0, 3));
  }

}
