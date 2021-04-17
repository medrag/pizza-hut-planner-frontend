import {Base} from './template/Base';
import {Jour} from './jour';

export class Periode extends Base {
  nom: string;
  dateDebut: Date;
  dateFin: Date;
  valeur: string;
  jour: Jour;

  constructor(nom?: string, dateDebut?: Date, dateFin?: Date, valeur?: string, jour?: Jour) {
    super();
    this.nom = nom;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
    this.valeur = valeur;
    this.jour = jour;
  }
}
