import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

interface ProductOption {
  value: string;
  label: string;
  basePrice?: number;
  category: 'impresion' | 'otro';
}

interface PrintTypeOption {
  value: string;
  label: string;
  multiplier: number;
}

interface PaperTypeOption {
  value: string;
  label: string;
  pricePerSheet: number;
}

interface PrintsPerSheetOption {
  value: number;
  label: string;
}

interface BudgetItem {
  id: string;
  product: string;
  quantity: number;
  printType?: string;
  printsPerSheet?: number;
  paperType?: string;
  subtotal: number;
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  budgetForm: FormGroup;
  budgetItems: BudgetItem[] = [];
  total: number = 0;

  productOptions: ProductOption[] = [
    {
      value: 'impresiones',
      label: 'Impresiones',
      category: 'impresion',
    },
    {
      value: 'cuadernos',
      label: 'Cuadernos Personalizados',
      basePrice: 7000,
      category: 'otro',
    },
  ];

  printTypeOptions: PrintTypeOption[] = [
    { value: 'simple', label: 'Simple Faz', multiplier: 1.0 },
    { value: 'doble', label: 'Doble Faz', multiplier: 0.5 },
  ];

  paperTypeOptions: PaperTypeOption[] = [
    { value: 'normal', label: 'Obra 75g', pricePerSheet: 100 },
    { value: 'a5', label: 'A5 Obra 75g', pricePerSheet: 50 },
    { value: 'a3', label: 'A3 Obra 120g', pricePerSheet: 800 },
    { value: 'fotografico', label: 'Foografico 195g', pricePerSheet: 500 },
    { value: 'sticker 120', label: 'Sticker 120g', pricePerSheet: 600 },
  ];

  printsPerSheetOptions: PrintsPerSheetOption[] = [
    { value: 1, label: '1 impresión por hoja' },
    { value: 2, label: '2 impresiones por hoja' },
    { value: 4, label: '4 impresiones por hoja' },
    { value: 8, label: '8 impresiones por hoja' },
  ];

  constructor(private fb: FormBuilder) {
    this.budgetForm = this.fb.group({
      product: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      printType: [''],
      printsPerSheet: [''],
      paperType: [''],
    });

    // Escuchar cambios en el formulario para recalcular
    this.budgetForm.valueChanges.subscribe(() => {
      this.calculateSubtotal();
    });

    // Escuchar cambios en el producto para mostrar/ocultar campos
    this.budgetForm.get('product')?.valueChanges.subscribe((productValue) => {
      this.handleProductChange(productValue);
    });
  }

  handleProductChange(productValue: string) {
    const selectedProduct = this.productOptions.find(
      (p) => p.value === productValue
    );

    if (selectedProduct?.category === 'impresion') {
      // Mostrar campos de impresión
      this.budgetForm.get('printType')?.setValidators([Validators.required]);
      this.budgetForm
        .get('printsPerSheet')
        ?.setValidators([Validators.required]);
      this.budgetForm.get('paperType')?.setValidators([Validators.required]);
    } else {
      // Ocultar campos de impresión
      this.budgetForm.get('printType')?.clearValidators();
      this.budgetForm.get('printsPerSheet')?.clearValidators();
      this.budgetForm.get('paperType')?.clearValidators();

      // Limpiar valores
      this.budgetForm.get('printType')?.setValue('');
      this.budgetForm.get('printsPerSheet')?.setValue('');
      this.budgetForm.get('paperType')?.setValue('');
    }

    // Actualizar validadores
    this.budgetForm.get('printType')?.updateValueAndValidity();
    this.budgetForm.get('printsPerSheet')?.updateValueAndValidity();
    this.budgetForm.get('paperType')?.updateValueAndValidity();
  }

  showPrintFields(): boolean {
    const productValue = this.budgetForm.get('product')?.value;
    const selectedProduct = this.productOptions.find(
      (p) => p.value === productValue
    );
    return selectedProduct?.category === 'impresion';
  }

  calculateSubtotal(): number {
    if (this.budgetForm.valid) {
      const formValue = this.budgetForm.value;

      const selectedProduct = this.productOptions.find(
        (p) => p.value === formValue.product
      );

      if (selectedProduct) {
        // Para productos de impresión, usar la fórmula con precio del papel
        if (selectedProduct.category === 'impresion') {
          const selectedPrintType = this.printTypeOptions.find(
            (p) => p.value === formValue.printType
          );
          const selectedPaperType = this.paperTypeOptions.find(
            (p) => p.value === formValue.paperType
          );
          const selectedPrintsPerSheet = this.printsPerSheetOptions.find(
            (p) => p.value === formValue.printsPerSheet
          );

          if (
            selectedPrintType &&
            selectedPaperType &&
            selectedPrintsPerSheet
          ) {
            const paperPrice = selectedPaperType.pricePerSheet; // Precio base del papel
            const quantity = formValue.quantity;
            const printMultiplier = selectedPrintType.multiplier;
            const printsPerSheet = selectedPrintsPerSheet.value;

            // Nueva fórmula: (Precio del papel × Cantidad × Multiplicador de impresión) ÷ Impresiones por hoja
            const subtotal =
              (paperPrice * quantity * printMultiplier) / printsPerSheet;
            return subtotal;
          }
        } else {
          // Para otros productos, usar precio base del producto
          if (selectedProduct.basePrice) {
            const subtotal = selectedProduct.basePrice * formValue.quantity;
            return subtotal;
          }
        }
      }
    }
    return 0;
  }

  addProduct() {
    if (this.budgetForm.valid) {
      const formValue = this.budgetForm.value;
      const selectedProduct = this.productOptions.find(
        (p) => p.value === formValue.product
      );

      if (selectedProduct) {
        const newItem: BudgetItem = {
          id: Date.now().toString(),
          product: formValue.product,
          quantity: formValue.quantity,
          printType: formValue.printType || undefined,
          printsPerSheet: formValue.printsPerSheet || undefined,
          paperType: formValue.paperType || undefined,
          subtotal: this.calculateSubtotal(),
        };

        this.budgetItems.push(newItem);
        this.calculateTotal();
        this.resetForm();
      }
    }
  }

  removeProduct(itemId: string) {
    this.budgetItems = this.budgetItems.filter((item) => item.id !== itemId);
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.budgetItems.reduce((sum, item) => sum + item.subtotal, 0);
  }

  getProductLabel(productValue: string): string {
    const product = this.productOptions.find((p) => p.value === productValue);
    return product ? product.label : productValue;
  }

  getProductPrice(): number {
    const productValue = this.budgetForm.get('product')?.value;
    const product = this.productOptions.find((p) => p.value === productValue);
    return product?.basePrice || 0;
  }

  getPrintTypeLabel(printTypeValue: string): string {
    const printType = this.printTypeOptions.find(
      (p) => p.value === printTypeValue
    );
    return printType ? printType.label : printTypeValue;
  }

  getPaperTypeLabel(paperTypeValue: string): string {
    const paperType = this.paperTypeOptions.find(
      (p) => p.value === paperTypeValue
    );
    return paperType ? paperType.label : paperTypeValue;
  }

  getPaperPrice(): number {
    const paperValue = this.budgetForm.get('paperType')?.value;
    const paper = this.paperTypeOptions.find((p) => p.value === paperValue);
    return paper ? paper.pricePerSheet : 0;
  }

  getPrintTypeMultiplier(): number {
    const printTypeValue = this.budgetForm.get('printType')?.value;
    const printType = this.printTypeOptions.find(
      (p) => p.value === printTypeValue
    );
    return printType ? printType.multiplier : 1;
  }

  resetForm() {
    this.budgetForm.reset();
  }

  resetAll() {
    this.budgetForm.reset();
    this.budgetItems = [];
    this.total = 0;
  }
}
