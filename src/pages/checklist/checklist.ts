import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html'
})
export class ChecklistPage {

  checklist: any;

  constructor(public nav: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

    this.checklist = this.navParams.get('checklist');
  }

  addItem(): void{

  }

  toggleItem(item): void{

  }

  renameItem(item): void {

  }

  uncheckItems(): void {

  }

}
/* Comentarios do código a título de estudos e referencias futuras
=====================================================================
Tudo que foi escrito aqui já foi explicado nas classes anteriores, menos o NavParams. Quando passamos dados para outra página, 
podemos pegá-lo injetando o NavParams e usando o método get. Neste exemplo, estamos apenas passando os dados da lista de verificação que queremos ver,
Mas você também pode passar vários valores, se quiser. Assim como fizemos antes, vamos passar pela implementação dessas funções, uma por uma agora. 
Muitos destes serão bastante semelhantes ao que acabamos de fazer para a home page.




 */

