import { Component, HostListener, OnInit } from '@angular/core';
import { StarLayer } from 'ngx-parallax-stars';

@Component({
  selector: 'app-landing-page-view',
  templateUrl: './landing-page-view.component.html',
  styleUrl: './landing-page-view.component.css',
})
export class LandingPageViewComponent implements OnInit {
  ngOnInit(): void {
    const sections = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
    this.startAutoRotateRight();
  }

  ngOnDestroy(): void {
    // Stop the auto-rotation when the component is destroyed
    this.stopAutoRotate();
  }

  layers: StarLayer[] = [
    {
      color: '#ffffff',
      speed: 20,
      density: 0.5,
      size: 2,
      direction: 'up',
      blur: 5,
      glow: 1,
      isRound: false,
    },
    {
      color: '#ffffff',
      speed: 20,
      density: 0.5,
      size: 2,
      direction: 'up',
      blur: 1,
      glow: 2,
      isRound: false,
    },
    {
      color: '#ffffff',
      speed: 20,
      density: 0.5,
      size: 2,
      direction: 'up',
      blur: 0,
      glow: 5,
      isRound: false,
    },
  ];

  scrollY: number = 0;

  cards = [
    {
      imageSrc: '../../../../assets/images/aries.png',
      title: 'Aries',
      description: 'Aries is the first astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/taurus.png',
      title: 'Taurus',
      description: 'Taurus is the second astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/gemini.png',
      title: 'Gemini',
      description: 'Gemini is the third astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/cancer.png',
      title: 'Cancer',
      description: 'Cancer is the fourth astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/leo.png',
      title: 'Leo',
      description: 'Leo is the fifth astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/virgo.png',
      title: 'Virgo',
      description: 'Virgo is the sixth astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/libra.png',
      title: 'Libra',
      description: 'Libra is the seventh astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/scorpio.png',
      title: 'Scorpio',
      description: 'Scorpio is the eighth astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/sagittarius.png',
      title: 'Sagittarius',
      description: 'Sagittarius is the ninth astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/capricorn.png',
      title: 'Capricorn',
      description: 'Capricorn is the tenth astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/aquarius.png',
      title: 'Aquarius',
      description: 'Aquarius is the eleventh astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
    {
      imageSrc: '../../../../assets/images/pisces.png',
      title: 'Pisces',
      description: 'Pisces is the twelfth astrological sign in the zodiac.',
      buttonLabel: 'Learn More',
    },
  ];

  rotationDegree: number;
  rotationAngle: number;
  autoRotateInterval: any;
  selectedCard: any;
  selectedZodiac = -1;
  birthTime: string = '';
  birthDate: string = '';
  birthLocation: string = '';
  selectedOption: string = '';
  rotationSpeed: number = 60;

  dropdownOptions: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  constructor() {
    this.rotationDegree = 360 / this.cards.length;
    this.rotationAngle = 0;
  }
  rotateLeft() {
    this.rotationAngle -= this.rotationDegree / 2;
  }

  rotateRight() {
    this.rotationAngle += this.rotationDegree / 2;
  }

  autoRotateRight() {
    this.rotationAngle += 0.2;
  }

  autoRotateLeft() {
    this.rotationAngle -= 0.2;
  }

  startAutoRotateRight(): void {
    this.autoRotateInterval = setInterval(() => {
      this.autoRotateRight();
    }, this.rotationSpeed);
  }

  startAutoRotateLeft(): void {
    this.autoRotateInterval = setInterval(() => {
      this.autoRotateLeft();
    }, this.rotationSpeed);
  }

  stopAutoRotate(): void {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  setSelectedZodiac(id: number): void {
    this.selectedZodiac = id;
    this.selectedCard = this.cards[id];
    console.log(this.selectedCard);
    this.rotationSpeed = 60;
  }

  setRotationSpeed(speed: number, direction: number): void {
    console.log(speed, direction);
    this.rotationSpeed = speed;

    // Stop any existing rotation
    this.stopAutoRotate();

    // Start the appropriate auto-rotation
    if (direction < 0) {
      this.startAutoRotateLeft();
    } else {
      this.startAutoRotateRight();
    }
  }

  unsetSelectedZodiac(): void {
    this.selectedCard = null;
    this.selectedZodiac = -1;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollY = window.scrollY;

    this.updateStarLayers(this.scrollY);
  }

  private updateStarLayers(scrollY: number) {}
}
