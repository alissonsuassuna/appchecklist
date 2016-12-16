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

    let prompt = this.alertCtrl.create({
      title: 'Adiciona item',
      message: 'Digite o seu novo item',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            this.checklist.addItem(data.name);
          }
        }
      ]
    });
    prompt.present();
  }

  removeItem(item): void {
    this.checklist.removeItem(item);
  }

  toggleItem(item): void{

    this.checklist.toggleItem(item);

  }

  renameItem(item): void {

    let prompt = this.alertCtrl.create({
      title: 'Renomea',
      message: 'Informe o novo nome',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            this.checklist.renameItem(item, data.name);
          }
        }
      ]
    });

    prompt.present();

  }

  uncheckItems(): void {

    this.checklist.items.forEach((item) => {
      if(item.checked){
        this.checklist.toggleItem(item);
      }
    });
  }
}
/* Comentarios do código a título de estudos e referencias futuras
=====================================================================
Tudo que foi escrito aqui já foi explicado nas classes anteriores, menos o NavParams. Quando passamos dados para outra página, 
podemos pegá-lo injetando o NavParams e usando o método get. Neste exemplo, estamos apenas passando os dados da lista de verificação que queremos ver,
Mas você também pode passar vários valores, se quiser. Assim como fizemos antes, vamos passar pela implementação dessas funções, uma por uma agora. 
Muitos destes serão bastante semelhantes ao que acabamos de fazer para a home page.

função addItem

Isso tudo deve parecer muito familiar, mas observe a diferença no handler (Manipulador). Desde que criamos um addItem
A função que está no nosso model nos ajuda deixando a crianção de novos itens bem mais simples, tudo o que temos a fazer é chamar isso e passar o nome do item que queremos
Criar (Essa é uma das vantagens de se criar um model de dados).

função renameItem

Mais uma vez, quase exatamente a mesma idéia, exceto que estamos chamando a função auxiliar renameItem em nosso
Models de dados no handler (manipulador), e também estamos passando por uma referência ao item específico que estamos
Renomeando.

função removeItem

Este é ainda mais simples, nós simplesmente chamamos a função auxiliar removeItem no modelo de dados e passamos um
Referência ao item que queremos excluir.


função toggleItem

Esta função é usada para ativar e desativar as marcas de seleção de um item individual e, mais uma vez, simplesmente
Passar através de uma referência para o item que deseja alternar para o modelo de dados.

função uncheckItems

Esta função está ligada ao botão de reposição que adicionámos ao nosso modelo e faremos um loop através de cada item que temos
Na lista de verificação e chamar a função toggleItem no modelo de dados se o item atual estiver marcado. este
Permite ao usuário desmarcar todos os itens ao mesmo tempo.
 */

