import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.css'],
})
export class ParallaxComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset;

    const elements = document.querySelectorAll('.parallax');
    elements.forEach((element: Element) => {
      const htmlElement = element as HTMLElement;
      const speed = parseFloat(htmlElement.getAttribute('data-speed') || '0.5');
      htmlElement.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
  }
}
