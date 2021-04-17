import {Base} from './template/Base';
import {Planning} from './planning';

export class Jour extends Base {
  nom: string;
  date: Date;
  planning: Planning;

  constructor(nom?: string, date?: Date, planning?: Planning) {
    super();
    this.nom = nom;
    this.date = date;
    this.planning = planning;
  }
}
