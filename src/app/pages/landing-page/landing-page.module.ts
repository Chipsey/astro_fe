import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageViewComponent } from './landing-page-view/landing-page-view.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxParallaxStarsComponent } from 'ngx-parallax-stars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingPageViewComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
    NgxParallaxStarsComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LandingPageModule {}
