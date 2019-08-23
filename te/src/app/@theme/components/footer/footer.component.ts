import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Developed by <b><a href="http://verbosetechlabs.com/" target="_blank">Verbose TechLabs</a></b> 2019</span>    
  `,
})
export class FooterComponent {
}
