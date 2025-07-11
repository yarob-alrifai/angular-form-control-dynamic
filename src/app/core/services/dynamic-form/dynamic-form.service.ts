import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {

  DynamicControl,
 DYNAMIC_FORM_MODEL
} from './dynamic-form-model';

@Injectable({ providedIn: 'root' })
export class DynamicFormService {
  fb = inject(FormBuilder)

  createForm(controls: DynamicControl[]): FormGroup {
    const group: any = {};
    controls.forEach((control) => {
      group[control.name] = this.fb.control(control.defaultValue);
    });
    return this.fb.group(group);
  }

  getFormModel() :DynamicControl[] {
    return DYNAMIC_FORM_MODEL;
  }

  addToForm(controls: DynamicControl[],item:DynamicControl){

      const lastMatchingIndex = controls
            .map((control, index) => (control.type === item.type ? index : -1))
            .filter((index) => index !== -1)
            .pop();
          if (lastMatchingIndex !== undefined) {
            controls.splice(lastMatchingIndex + 1, 0, item);
          } else {
            controls.push(item); // Append if no matching type
          }

             // this.formModel.push( item)
  }


    textItem: DynamicControl = {
    type: 'text',
    name: 'new_text',
    label: 'New text',
    defaultValue: '',
  };
  checkBoxItem: DynamicControl = {
    type: 'checkbox',
    name: 'new_checkbox',
    label: 'New checkbox',
    defaultValue: false,
  }

}
