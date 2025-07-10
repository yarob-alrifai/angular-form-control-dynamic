import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicControl } from './dynamic-form-model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  template: `
    <form
      [formGroup]="form"
      class="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
    >
      @for (control of formModel; track $index) {

      <!-- Text input -->
      @if (control.type === 'text') {
      <div class="flex flex-col gap-1">
        <label class="font-semibold">{{ control.label }}</label>
        <input
          type="text"
          [formControlName]="control.name"
          class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      }

      <!-- Single checkbox -->
      @if (control.type === 'checkbox') {
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          [formControlName]="control.name"
          class="accent-blue-600"
        />
        <label class="font-semibold">{{ control.label }}</label>
      </div>
      }

      <!-- Checkbox list -->
      @if (control.type === 'checkbox-list') {
      <div>
        <p class="font-semibold mb-2">{{ control.label }}</p>
        <div class="flex flex-wrap gap-4">
          @for (option of control.options ?? []; track $index) {
          <label class="flex items-center gap-2">
            <input
              type="checkbox"
              class="accent-blue-600"
              [checked]="form.get(control.name)?.value.includes(option)"
              (change)="onCheckboxListChange(control.name, option, $event)"
            />
            {{ option }}
          </label>
          }
        </div>
      </div>
      }

      <!-- Radio group -->
      @if (control.type === 'radio') {
      <div>
        <p class="font-semibold mb-2">{{ control.label }}</p>
        <div class="flex flex-col gap-2">
          @for (option of control.options ?? []; track $index) {
          <label class="flex items-center gap-2">
            <input
              type="radio"
              class="accent-blue-600"
              [value]="option"
              [formControlName]="control.name"
            />
            {{ option }}
          </label>
          }
        </div>
      </div>
      }

      <!-- Range slider -->
      @if (control.type === 'range') {
      <div class="flex flex-col space-y-2">
        <label class="font-semibold">
          {{ control.label }}: {{ form.get(control.name)?.value }}
        </label>
        <input
          type="range"
          class="w-full accent-blue-600"
          [attr.min]="control.min"
          [attr.max]="control.max"
          [formControlName]="control.name"
        />
      </div>
      } }

      <div class="bg-gray-100 p-4 rounded-xl">
        <h4 class="font-semibold mb-2">Form Value:</h4>
        <pre>{{ form.value | json }}</pre>
      </div>
    </form>
  `,
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;

  formModel!: DynamicControl[];
  checkboxModel: any = {};
  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit() {
    this.formModel = this.dynamicFormService.getFormModel();
    this.form = this.dynamicFormService.createForm(this.formModel);

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
