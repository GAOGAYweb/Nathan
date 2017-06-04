import { Component } from '@angular/core';

import { MomentsPage } from './moments';
import { LikesPage } from './likes';
import { RecommendPage } from './recommend';
 
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MomentsPage;
  tab2Root = LikesPage;
  tab3Root = RecommendPage;

  constructor() {

  }
}
