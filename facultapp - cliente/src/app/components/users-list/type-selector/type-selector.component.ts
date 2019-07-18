import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.css']
})
export class TypeSelectorComponent implements OnInit {

  @Output() typeSelected = new EventEmitter();
  typeSelectorForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.typeSelectorForm = this.fb.group({
      type: ['1']
    });
  }

  ngOnInit() {
    this.typeSelectorForm.valueChanges.subscribe(
      () => {
        this.typeSelected.emit(<number> this.typeSelectorForm.controls['type'].value);
      }
    );
  }

}
