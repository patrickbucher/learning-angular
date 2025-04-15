import { Component } from '@angular/core';

@Component({
  selector: 'rc-complaints-list',
  standalone: false,
  templateUrl: './complaints-list.component.html',
  styleUrl: './complaints-list.component.css',
})
export class ComplaintsListComponent {
  complaints: string[] = [
    'This parrot is dead!',
    'The service here is horrible.',
    "There's a rat in my bat soup!",
  ];
}
