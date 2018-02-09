import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlackFeedComponent } from './slack-feed.component';

describe('LookupQuoteComponent', () => {
  let component: SlackFeedComponent;
  let fixture: ComponentFixture<SlackFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlackFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlackFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
