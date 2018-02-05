import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FieldDetailComponent } from './../components/app/field-detail/field-detail.component';
import { FieldListComponent } from './../components/app/field-list/field-list.component';

const fieldRoutes: Routes = [
    { path: 'fields', component: FieldListComponent },
    { path: 'field/:id', component: FieldDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(fieldRoutes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})

export class FieldRoutingModule { }