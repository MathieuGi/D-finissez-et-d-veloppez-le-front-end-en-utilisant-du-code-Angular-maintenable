import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeadComponent } from './page-head.component';

describe('PageHeadComponent', () => {
  let component: PageHeadComponent;
  let fixture: ComponentFixture<PageHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageHeadComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageHeadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
