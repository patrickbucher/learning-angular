import { Component, Input } from '@angular/core';
import { Complaint } from '../shared/complaint';

@Component({
  selector: 'rc-complaint-item',
  standalone: false,
  templateUrl: './complaint-item.component.html',
  styleUrl: './complaint-item.component.css'
})
export class ComplaintItemComponent {
  @Input() complaint?: Complaint;
}
