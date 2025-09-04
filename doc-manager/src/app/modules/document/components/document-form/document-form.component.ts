import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-form',
  standalone: true, 
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class DocumentFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private docService: DocumentService, private router: Router) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      content: ['']
    });
  }

  submit() {
    debugger;
    console.log('test');
    if (this.form.valid) {
      this.docService.addDocument({
        id: this.form.value.id || '',
        title: this.form.value.title,
        content: this.form.value.content
      }).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}