import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MagasinModalComponent} from './magasin-modal.component';

describe('MagasinModalComponent', () => {
  let component: MagasinModalComponent;
  let fixture: ComponentFixture<MagasinModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MagasinModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagasinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
