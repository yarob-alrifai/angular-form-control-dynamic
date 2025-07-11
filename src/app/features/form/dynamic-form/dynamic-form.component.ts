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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  formModel!: DynamicControl[];
  // checkboxModel: any = {};

  #dynamicFormService = inject(DynamicFormService);
  addTextInputToModel() {
    this.#dynamicFormService.addToForm(
      this.formModel,
      this.#dynamicFormService.textItem
    );
    this.#createForm()
  }
  addCheckBoxToModel() {
    this.#dynamicFormService.addToForm(
      this.formModel,
      this.#dynamicFormService.checkBoxItem
    );
    this.#createForm()
  }

  #createForm() {
    this.form = this.#dynamicFormService.createForm(this.formModel);
  }
  #getFormModel() {
    this.formModel = this.#dynamicFormService.getFormModel();
  }
  ngOnInit() {
    this.#getFormModel();
    this.#createForm();
    // this.checkboxModel = {};
    // this.formModel.forEach((control) => {
    //   if (control.type === 'checkbox-list') {
    //     this.checkboxModel[control.name] = {};
    //     control.options?.forEach((option) => {
    //       this.checkboxModel[control.name][option] = this.form
    //         .get(control.name)
    //         ?.value.includes(option);
    //     });
    //   }
    // });
  }

  onCheckboxListChange(name: string, value: string, event: any) {
    const current = this.form.get(name)?.value || [];
    if (event.target.checked) {
      this.form.get(name)?.setValue([...current, value]);
    } else {
      this.form.get(name)?.setValue(current.filter((v: string) => v !== value));
    }
  }
}
