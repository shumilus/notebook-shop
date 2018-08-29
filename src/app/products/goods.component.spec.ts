import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AppModule} from '../app.module';

import {GoodsComponent} from './goods.component';

describe('GoodsComponent', () => {
  let component: any;
  let fixture: ComponentFixture<GoodsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppModule
      ],
      providers: [],
      schemas: []
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GoodsComponent);
      component = fixture.debugElement.componentInstance;
    });

  }));

  it('Should create GoodsComponent', async(() => {
    expect(component).toBeTruthy();
  }));

});