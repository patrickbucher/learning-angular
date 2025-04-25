import { Component } from '@angular/core';
import { Complaint } from '../shared/complaint';

@Component({
  selector: 'rc-complaint-list',
  standalone: false,
  templateUrl: './complaint-list.component.html',
  styleUrl: './complaint-list.component.css',
})
export class ComplaintListComponent {
  public complaints: Complaint[] = [
    {
      id: 1,
      selected: false,
      title: 'Dead Parrot',
      issue: 'This parrot is dead.',
      author: 'Mr. Praline',
      happened: new Date(Date.parse('1972-03-17')),
      offender: 'Michael Palin',
      place: 'Ipswitch',
    },
    {
      id: 2,
      selected: false,
      title: 'Toilet Question Unresolved',
      issue: 'In Vienna, the toilet question has not been resolved yet!',
      author: 'Thomas Bernhard',
      happened: new Date(Date.parse('1976-12-13')),
      offender: 'Austrians',
      place: 'Vienna',
    },
    {
      id: 3,
      selected: false,
      title: 'Sülze von letzter Woche',
      issue:
        'Die Sülze von letzter Woche: Sie schmeckte scheisse, ich musste sie kotzen.',
      author: 'Helge Schneider',
      happened: new Date(Date.parse('1993-04-17')),
      offender: 'Wurstfachverkäuferin',
      place: 'Darmstadt',
    },
  ];

  activate(id: number) {
    this.complaints.map((c) => {
      c.selected = c.id == id;
    });
  }
}
