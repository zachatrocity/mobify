import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbInputModule,
  NbCardModule,
  NbButtonModule,
  NbCheckboxModule,
  NbProgressBarModule,
  NbListModule
} from '@nebular/theme';
import { NgxUploaderModule } from 'ngx-uploader';

import { AppComponent } from './app.component';
import { ConvertComponent } from './components/convert/convert.component';
import { MobFileUploadComponent } from './components/mob-file-upload/mob-file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ConvertComponent,
    MobFileUploadComponent
  ],
  imports: [
    RouterModule.forRoot(
      [
        { path: '', component: AppComponent}
      ]
    ),
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbCheckboxModule,
    CommonModule,
    FormsModule,
    NgxUploaderModule,
    NbProgressBarModule,
    NbListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
