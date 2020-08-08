import { Component } from '@angular/core';

import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private events: EventsService
  ) {}

  scrollToTop() {
    this.events.sendMessage('scrollToTop');
  }

}
