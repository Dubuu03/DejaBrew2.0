import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CustomButtonComponent } from './custom-button.component';
import { IonicModule } from '@ionic/angular'; // Import IonicModule for testing Ionic components
import { CommonModule } from '@angular/common'; // Import CommonModule for basic Angular features

describe('CustomButtonComponent', () => {
  let component: CustomButtonComponent;
  let fixture: ComponentFixture<CustomButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CustomButtonComponent], // Add CustomButtonComponent in declarations
      imports: [IonicModule.forRoot(), CommonModule], // Import IonicModule for Ionic components and CommonModule for Angular basic functionality
    }).compileComponents();

    fixture = TestBed.createComponent(CustomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy(); // Check if the component is created successfully
  });
});
