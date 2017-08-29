import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HelperService } from './services/helper.service';
import { CreateTopicGuard } from 'app/services/create-topic-guard.service';
import { ToastrService } from './services/toastr.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ])
  ],
  providers: [
    AuthService,
    HelperService,
    CreateTopicGuard,
    ToastrService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
