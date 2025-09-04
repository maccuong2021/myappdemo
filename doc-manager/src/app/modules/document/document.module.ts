import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentRoutingModule } from './document-routing.module';

import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { DocumentDetailComponent } from './components/document-detail/document-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DocumentRoutingModule,
    DocumentListComponent,
    DocumentFormComponent,
    DocumentDetailComponent
  ]
})
export class DocumentModule {}