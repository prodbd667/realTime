import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import * as io from 'socket.io-client';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class SocketSerService {

  private url = 'http://localhost:4000/api/';
  private socket;
  showAddTodoBox: boolean = true;

  constructor(private _http: HttpClient) { }
  getTodos(): Promise<any> {
    return this._http.get(this.url)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }
  getTodo(id: string): Promise<any> {
    return this._http.get(this.url + id)
      .toPromise()
      .then(this.handleData)
      .catch(this.handleError)
  }
  updateTodo(field: any, socket: any, action?: string): void {
    socket.emit('updateTodo', field, action);
  }
  createField(field: any, socket: any): void {
    socket.emit('addTodo', field);
  }

  deleteTodo(field: any, socket: any): void {
    socket.emit('deleteTodo', field);
  }



  private handleData(res: any) {
    console.log('res', res);
    let body = res;
    console.log(body); // for development purposes only
    return body || {};
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for development purposes only
    return Promise.reject(error.message || error);
  }
  // sendMessage(message) {
  //   this.socket.emit('add-message', message);
  // }

  // getMessages() {
  //   let observable = new Observable(observer => {
  //     this.socket = io(this.url);
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     }
  //   });
  //   return observable;
  // }



}
