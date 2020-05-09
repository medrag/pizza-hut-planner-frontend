import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../../models/employee';
import {Magasin} from '../../models/magasin';
import {MagasinService} from '../../services/magasin.service';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {

  employeeForm: FormGroup;
  submitted = false;
  @Input() modalAction: string;
  @Input() employee: Employee;
  magasinsList: Magasin[] = [];
  compareFn = this._compareFn.bind(this);

  constructor(public activeModal: NgbActiveModal, private magasinService: MagasinService) {
  }

  ngOnInit() {
    if (this.modalAction === 'add' || this.modalAction === 'edit') {

      this.magasinService.getMagasins()
        .subscribe( data => {
          this.magasinsList = data;
        });

      this.employeeForm = new FormGroup({
        id: new FormControl(''),
        nomComplet: new FormControl('', Validators.required),
        dateNaissance: new FormControl(''),
        contrat: new FormControl('', Validators.required),
        poste: new FormControl('', Validators.required),
        magasin: new FormControl('', Validators.required),
        dateEntree: new FormControl('', Validators.required),
        mail: new FormControl('', Validators.email),
        tel: new FormControl('', [Validators.required, Validators.minLength(10)]),
        adresse: new FormControl('', [Validators.required])
      });

      if (this.employee) {
        this.employeeForm.patchValue({
          id: this.employee.id,
          nomComplet: this.employee.nomComplet,
          dateNaissance: this.setDateInput(this.employee.dateNaissance),
          contrat: this.employee.contrat,
          poste: this.employee.poste,
          magasin: this.employee.magasin,
          dateEntree: this.setDateInput(this.employee.dateEntree),
          mail: this.employee.mail,
          tel: this.employee.tel,
          adresse: this.employee.adresse
        });
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.employeeForm.controls;
  }

  addEditEmployee(): void {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    console.log(this.employeeForm.value);
    this.activeModal.close(this.employeeForm.value);
  }

  onReset() {
    this.activeModal.close('closed');
    this.submitted = false;
    this.employeeForm.reset();
  }

  deleteEmployee() {
    this.activeModal.close('confirmed');
  }

  setDateInput(date: Date): string {
    return new Date(date).toISOString().substring(0, 10);
  }

  _compareFn(a, b) {
    // Handle compare logic (eg check if unique ids are the same)
    return a.id === b.id;
  }
}
