import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [DatePipe]
})
export class FooterComponent implements OnInit {
  currentYear: string;

  constructor(private datePipe: DatePipe) {
      this.currentYear = this.datePipe.transform(new Date(), 'yyyy');
   }

  ngOnInit(): void {
  }

}
