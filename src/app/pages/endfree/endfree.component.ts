import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view.service';

@Component({
  selector: 'app-endfree',
  templateUrl: './endfree.component.html',
  styleUrls: ['./endfree.component.scss']
})
export class EndfreeComponent {
  
  viewService = inject(ViewService)
  router = inject(Router)

  ChangeSub(sub:Number){
    this.viewService.cambiarSub(sub).then(res => {
      if(res){
        this.router.navigate(['/home'])
      }
    })
  }
}
