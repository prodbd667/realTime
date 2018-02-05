import { Component, OnInit } from '@angular/core';

import { SocketSerService } from '../../../services/socket-ser/socket-ser.service';


@Component({
  selector: 'app-wrap',
  templateUrl: './wrap.component.html',
  styleUrls: ['./wrap.component.css']
})
export class WrapComponent implements OnInit {

  title = 'app';

  constructor(private _socketSerService: SocketSerService) { }

  ngOnInit() {
  }

  showAddTodoBox(e): void {
    e.preventDefault();
    this._socketSerService.showAddTodoBox = !this._socketSerService.showAddTodoBox;
  }

}
