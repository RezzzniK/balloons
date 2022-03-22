import { NgModule, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NotFound404Component } from './not-found404/not-found404.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { LoginInterceptorService } from './_services/login.interceptor.service';
import { LoginEffects } from '../app/login/state/login.effects';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './login/state/login.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { BalloonsEffects } from './home/side-bar/state/balloons.effects';
import { balloonReducer } from './home/side-bar/state/balloons.reducer';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicFormComponent } from './dynamic-forms/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-forms/dynamic-form-question.component';
import { SideBarDialogComponent } from './home/side-bar/side-bar-dialog/side-bar-dialog.component';
import { QuestionService } from './dynamic-forms/question.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CesiumDirective } from './cesium.directive';
import { MapComponent } from './home/map/map.component';
import { focusReducer } from './home/side-bar/focus-state/focus-balloon.reducer';
import { FocusEffects } from './home/side-bar/focus-state/focus-balloon.effects';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    LoginComponent,
    HomeComponent,
    NotFound404Component,
    NavBarComponent,
    SideBarComponent,
    SideBarDialogComponent,
    CesiumDirective,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
    EffectsModule.forRoot([LoginEffects, BalloonsEffects, FocusEffects]),
    StoreModule.forRoot({
      login: loginReducer,
      balloon: balloonReducer,
      focus: focusReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    QuestionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
