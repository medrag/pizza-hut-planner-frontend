import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Magasin} from '../../models/magasin';

@Component({
  selector: 'app-magasin-modal',
  templateUrl: './magasin-modal.component.html',
  styleUrls: ['./magasin-modal.component.css']
})
export class MagasinModalComponent implements OnInit {

  magasinForm: FormGroup;
  submitted = false;
  @Input() modalAction: string;
  @Input() magasin: Magasin;

  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    if ('add' === this.modalAction || 'edit' === this.modalAction) {
      this.magasinForm = new FormGroup({
        id: new FormControl(''),
        nom: new FormControl('', Validators.required),
        adresse: new FormControl('', Validators.required),
        tel: new FormControl('', Validators.minLength(10)),
        entreprise: new FormControl('')
      });

      if (this.magasin) {
        this.magasinForm.patchValue({
          id: this.magasin.id,
          nom: this.magasin.nom,
          adresse: this.magasin.adresse,
          tel: this.magasin.tel,
          entreprise: this.magasin.entreprise
        });
      }
    }
  }

  get f() {
    return this.magasinForm.controls;
  }

  addEditMagasin(): void {
    this.submitted = true;
    if (this.magasinForm.invalid) {
      return;
    }
    this.activeModal.close(this.magasinForm.value);
  }

  deleteMagasin(): void {
    this.activeModal.close('confirmed');
  }

  onReset() {
    this.activeModal.close('closed');
    this.submitted = false;
    this.magasinForm.reset();
  }

}
