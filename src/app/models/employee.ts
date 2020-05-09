import {Base} from './template/Base';
import {Magasin} from './magasin';

export class Employee extends Base {
  nomComplet: string;
  dateNaissance: Date;
  dateEntree: Date;
  adresse: string;
  tel: string;
  mail: string;
  contrat: number;
  poste: string;
  magasin: Magasin;
}
