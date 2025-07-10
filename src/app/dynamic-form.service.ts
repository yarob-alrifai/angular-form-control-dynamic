import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {

  DynamicControl,
 BIG_DYNAMIC_FORM_MODEL
} from './dynamic-form-model';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}

  createForm(controls: DynamicControl[]): FormGroup {
    const group: any = {};
    controls.forEach((control) => {
      group[control.name] = this.fb.control(control.defaultValue);
    });
    return this.fb.group(group);
  }

  getFormModel() {
    return BIG_DYNAMIC_FORM_MODEL;
  }

}
