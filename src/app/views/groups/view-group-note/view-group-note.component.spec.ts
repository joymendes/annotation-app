import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupNoteComponent } from './view-group-note.component';

describe('ViewGroupNoteComponent', () => {
  let component: ViewGroupNoteComponent;
  let fixture: ComponentFixture<ViewGroupNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewGroupNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewGroupNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
