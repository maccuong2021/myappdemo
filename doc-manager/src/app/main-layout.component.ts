import { Component } from "@angular/core";
import { DocumentRoutingModule } from "./modules/document/document-routing.module";
import { HeaderComponent } from "./modules/header/header.component";

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  imports: [DocumentRoutingModule, HeaderComponent]
})
export class MainLayoutComponent {}