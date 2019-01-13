import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mob-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements OnInit {

  public upload = false;
  public shouldEmail = false;

  constructor() { }

  ngOnInit() {
  }

}
