import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  imports: [
    CommonModule,
    RouterModule,
  ],
  styleUrls: [
    './document-list.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush 
})

export class DocumentListComponent implements OnInit {
  documents: Document[] = []; 

  constructor(private docService: DocumentService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {}

  ngOnInit() {    
    this.loadDocuments();
  }

  loadDocuments() {
    this.docService.getDocuments().subscribe((documents: Document[]) => {
      this.documents = documents;
      this.cdr.markForCheck();  
    });    
  }
  
  deleteDoc(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this document?'
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.docService.deleteDocument(id).subscribe(() => {
          this.loadDocuments();
          this.cdr.markForCheck();
        });
      }
    });
  }

}