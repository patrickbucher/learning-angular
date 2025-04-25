import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComplaintListComponent } from './complaint-list/complaint-list.component';
import { ComplaintItemComponent } from './complaint-item/complaint-item.component';

@NgModule({
  declarations: [AppComponent, ComplaintListComponent, ComplaintItemComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
