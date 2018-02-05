import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { SocketSerService } from './../../../services/socket-ser/socket-ser.service';


@Component({
  selector: 'app-field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.css']
})
export class FieldDetailComponent implements OnInit {
  todo: any[] = [];

  constructor(
    private _socketSerService: SocketSerService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this._socketSerService.getTodo(params.get('id')))
      .subscribe(td => this.todo = td.todo[0])
  }

  goBack():void {
    this.location.back();
  }

}
