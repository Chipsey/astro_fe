import { FreeUserService } from './../../../services/free-user.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StarLayer } from 'ngx-parallax-stars';
import { LIST_DATA } from '../../../config/list-data';
// import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-landing-page-view',
  templateUrl: './landing-page-view.component.html',
  styleUrl: './landing-page-view.component.css',
})
export class LandingPageViewComponent implements OnInit {
  inputForm: FormGroup;
  isDataLoading: boolean = false;
  isShowResults: boolean = false;
  scrollY: number = 0;
  cards = LIST_DATA.zodiacData;
  rotationDegree: number;
  rotationAngle: number;
  autoRotateInterval: any;
  selectedCard: any;
  selectedZodiac = -1;
  birthTime: string = '';
  birthDate: string = '';
  birthLocation: string = '';
  selectedOption: string = '';
  // storedData: any = '';
  storedData: any;
  rotationSpeed: number = 60;
  selectedOptionTitle: any;
  dropdownOptions: any[] = LIST_DATA.FUTURE_OPTIONS;
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

  constructor(
    private fb: FormBuilder,
    private freeUserService: FreeUserService
  ) {
    this.rotationDegree = 360 / this.cards.length;
    this.rotationAngle = 0;
    this.inputForm = this.fb.group({
      birthTime: ['', Validators.required],
      birthDate: ['', Validators.required],
      birthLocation: ['', Validators.required],
      selectedOption: ['', Validators.required],
    });
  }
  checkValidation(): void {
    for (const control in this.inputForm.controls) {
      if (this.inputForm.controls.hasOwnProperty(control)) {
        const formControl = this.inputForm.get(control);
        if (
          formControl &&
          formControl.invalid &&
          (formControl.dirty || formControl.touched)
        ) {
          console.log(`${control} is invalid`);
        }
      }
    }

    // Log all form values
    console.log('Current form values:', this.inputForm.value);
  }

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

  /**
   * form validator
   * @param form
   * @param field
   */
  isFieldValid(form: FormGroup, field: string, image: string = '') {
    this.checkValidation();
    return !form.get(field)?.valid && form.get(field)?.touched;
  }

  rotateLeft() {
    this.rotationAngle -= this.rotationDegree / 3;
  }

  rotateRight() {
    this.rotationAngle += this.rotationDegree / 3;
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
    this.setRotationSpeed(60, 1);
  }

  handleBackToOptions(): void {
    this.isShowResults = false;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrollY = window.scrollY;

    this.updateStarLayers(this.scrollY);
  }

  private updateStarLayers(scrollY: number) {}

  // Handle form submission
  onSubmit(): void {
    if (this.inputForm.valid) {
      this.save();
    } else {
      console.log('Form is invalid');
    }
  }

  /**
   * save disease type
   */
  async save() {
    this.isDataLoading = true;
    this.selectedOptionTitle =
      this.dropdownOptions.find((option) => option.id === this.selectedOption)
        ?.text || '';
    // Destructure values from the form
    const { birthTime, birthDate, birthLocation, selectedOption } =
      this.inputForm.value;
    const question = `My birth time is ${birthTime}, birth date is ${birthDate}, and location is ${birthLocation}, zodiac sign is ${
      this.selectedCard?.title
    }.
                    ${
                      this.dropdownOptions.find(
                        (option) => option.id === selectedOption
                      )?.prompt || ''
                    }`;

    const payload = { question: question, prompt_id: selectedOption };
    console.log('Payload:', payload);

    try {
      const response = await this.freeUserService.create(payload).toPromise();
      if (response?.success) {
        const resultData = response?.result;
        console.log('Response data:', resultData);
        const parsedData = JSON.parse(resultData);
        console.log('Parsed data:', parsedData.data);
        this.storedData = parsedData.data;
        this.isShowResults = true;
      } else {
        console.log('Error: ', response?.message);
      }
      // this.storedData = [
      //   {
      //     year: '2024',
      //     data: [
      //       {
      //         title: 'Financial Foundations',
      //         data: 'In 2024, your financial journey begins with a strong emphasis on setting a solid foundation. As an Aries, your natural leadership and drive play a vital role in the initial establishment of your financial independence. This year is crucial for learning and applying budgeting skills, understanding investments, and exploring new income streams. The latter part of the year might bring opportunities for financial growth through networking and partnerships. However, caution is advised against impulsive spending and financial decisions without thorough research.',
      //       },
      //     ],
      //   },
      //   {
      //     year: '2025',
      //     data: [
      //       {
      //         title: 'Growth and Opportunities',
      //         data: 'The year 2025 is marked by significant growth and potential financial opportunities. Your innate Aries enthusiasm and determination could lead to increased income and the expansion of financial assets. This period encourages you to take calculated risks, possibly in entrepreneurial ventures or investments that align with your long-term goals. Maintaining a balance between assertiveness and prudence is key in navigating emerging opportunities. Collaborations and strategic alliances could enhance your financial portfolio. However, it is essential to remain vigilant about market trends and to adapt strategies as needed to sustain financial stability.',
      //       },
      //     ],
      //   },
      // ];
      this.isShowResults = true;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isDataLoading = false;
    }
  }
}
