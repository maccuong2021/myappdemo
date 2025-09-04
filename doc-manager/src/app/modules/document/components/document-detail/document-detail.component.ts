import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document.model';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  imports: [CommonModule], 
  styleUrls: [
    './document-detail.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush  
})

export class DocumentDetailComponent implements OnInit {
  doc?: Document;

  constructor(private route: ActivatedRoute, private docService: DocumentService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;        
    this.docService.getDocumentById(id).subscribe((doc: Document) => {
      this.doc = doc;
      this.cdr.markForCheck();  
    }, (error) => {
      console.error(error);
    });    
  }
}