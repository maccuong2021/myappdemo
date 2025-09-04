import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { DocumentDetailComponent } from './components/document-detail/document-detail.component';

const routes: Routes = [
  { path: '', component: DocumentListComponent },
  { path: 'add', component: DocumentFormComponent },
  { path: 'detail/:id', component: DocumentDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule {}