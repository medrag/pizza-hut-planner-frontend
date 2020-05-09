import {Base} from './template/Base';
import {Jour} from './jour';

export class Planning extends Base {
  semaine: string;
  jours: Jour[];
}
