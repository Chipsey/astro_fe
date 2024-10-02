import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { CardComponent } from '../components/card/card.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ParallaxComponent } from './parallax/parallax.component';
import { ZodiacCardComponent } from '../components/zodiac-card/zodiac-card.component';

@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    ParallaxComponent,
    ZodiacCardComponent,
  ],
  imports: [CommonModule],
  exports: [
    ButtonComponent,
    CardComponent,
    ParallaxComponent,
    ZodiacCardComponent,
  ],
})
export class SharedModule {}
