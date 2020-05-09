import {Base} from './template/Base';
import {Periode} from './periode';

export class Jour extends Base {
  nom: string;
  date: Date;
  periodes: Periode[];
}
