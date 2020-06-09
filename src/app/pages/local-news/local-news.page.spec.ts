import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalNewsPage } from './local-news.page';

describe('LocalNewsPage', () => {
  let component: LocalNewsPage;
  let fixture: ComponentFixture<LocalNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
