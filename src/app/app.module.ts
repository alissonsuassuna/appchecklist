import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { ChecklistPage } from '../pages/checklist/checklist';
import { Data } from '../providers/data'; 


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    ChecklistPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    ChecklistPage
  ],
  providers: [Storage, Data]
})
export class AppModule {}
