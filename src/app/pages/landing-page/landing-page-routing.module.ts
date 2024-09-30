import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageViewComponent } from './landing-page-view/landing-page-view.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
