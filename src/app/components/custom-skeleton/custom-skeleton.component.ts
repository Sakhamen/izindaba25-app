import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'custom-skeleton',
  templateUrl: './custom-skeleton.component.html',
  styleUrls: ['./custom-skeleton.component.scss'],
})
export class CustomSkeletonComponent implements OnInit {

  fakeUsers: Array<any> = new Array(7);

  constructor() { }

  ngOnInit() {}

}
