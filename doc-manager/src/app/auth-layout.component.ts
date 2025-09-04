import { Component } from "@angular/core";
import { DocumentRoutingModule } from "./modules/document/document-routing.module";

@Component({
  selector: 'app-auth-layout',
  template: `
    <router-outlet></router-outlet>
  `,
  imports: [DocumentRoutingModule]
})
export class AuthLayoutComponent {}