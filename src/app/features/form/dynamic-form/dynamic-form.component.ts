import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { DynamicControl } from '../../../core/services/dynamic-form/dynamic-form-model';
import { DynamicFormService } from '../../../core/services/dynamic-form/dynamic-form.service';
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent  implements OnInit {
  form!: FormGroup;

  formModel!: DynamicControl[];
  checkboxModel: any = {};

  #dynamicFormService = inject(DynamicFormService)
addToModel(){
  const item:DynamicControl =  {
    type: 'checkbox',
    name: 'agreeTerms',
    label: 'Agree to Terms and Conditions',
    defaultValue: false,
  }
    const lastMatchingIndex = this.formModel
            .map((control, index) => (control.type === item.type ? index : -1))
            .filter((index) => index !== -1)
            .pop();
          if (lastMatchingIndex !== undefined) {
            this.formModel.splice(lastMatchingIndex + 1, 0, item);
          } else {
            this.formModel.push(item); // Append if no matching type
          }

  // this.formModel.push( item)
    this.form = this.#dynamicFormService.createForm(this.formModel);
}
  ngOnInit() {
    this.formModel = this.#dynamicFormService.getFormModel();
    this.form = this.#dynamicFormService.createForm(this.formModel);

    this.checkboxModel = {};
    this.formModel.forEach((control) => {
      if (control.type === 'checkbox-list') {
        this.checkboxModel[control.name] = {};
        control.options?.forEach((option) => {
          this.checkboxModel[control.name][option] = this.form
            .get(control.name)
            ?.value.includes(option);
        });
      }
    });
  }

  onCheckboxListChange(name: string, value: string, event: any) {
    debugger;
    const current = this.form.get(name)?.value || [];
    if (event.target.checked) {
      this.form.get(name)?.setValue([...current, value]);
    } else {
      this.form.get(name)?.setValue(current.filter((v: string) => v !== value));
    }
  }
}
