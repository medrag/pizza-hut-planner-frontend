import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MagasinModalComponent} from '../magasin-modal/magasin-modal.component';
import {Magasin} from '../../models/magasin';
import {MagasinService} from '../../services/magasin.service';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-magasins',
  templateUrl: './magasins.component.html',
  styleUrls: ['./magasins.component.css']
})
export class MagasinsComponent implements OnInit, OnDestroy {

  magasinsList: Magasin[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private modalService: NgbModal,
              private magasinService: MagasinService,
              private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      paging: false,
      processing: true,
      ordering: false,
      stateSave: true,
      lengthChange: false,
      info: false,
      dom: 'lfrtp',
      language: {
        url: '/assets/resources/datatable-french.json'
      },
      autoWidth: false,
      initComplete() {
        $('.dataTables_wrapper').css('width', '80%');
      }
    };

    this.magasinService.getMagasins()
      .subscribe(result => {
        this.magasinsList = result;
        this.dtTrigger.next();
      });
  }

  openModal(action: string, magasin: Magasin) {
    const modalRef = this.modalService.open(MagasinModalComponent, {centered: true, backdrop: 'static'});

    if ('add' === action) {
      modalRef.componentInstance.modalAction = 'add';
      modalRef.result.then((result) => {
        if (result && result !== 'closed') {
          this.magasinService.addMagasin(result)
            .subscribe( data => {
              this.magasinsList.push(data);
            });
        }
      });
    } else if ('edit' === action) {
      modalRef.componentInstance.modalAction = 'edit';
      modalRef.componentInstance.magasin = magasin;
      modalRef.result.then((result) => {
        if (result && result !== 'closed') {
          this.magasinService.editMagasin(result)
            .subscribe( data => {
              const index = this.magasinsList.indexOf(magasin);
              this.magasinsList[index] = data;
            });
        }
      });
    } else {
      modalRef.componentInstance.modalAction = 'delete';
      modalRef.componentInstance.magasin = magasin;
      modalRef.result.then((result) => {
        if (result && result === 'confirmed') {
          this.magasinService.deleteMagasin(magasin.id)
            .subscribe(data => {
              this.magasinsList = this.magasinsList.filter(savedMagasin => savedMagasin !== magasin);
            });
        }
      });
    }
  }

  openPlanning(magasinId: number, magasinNom: string) {
    this.router.navigate(['planning/' + magasinId + '/' + magasinNom]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
