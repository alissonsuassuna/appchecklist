import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';

import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../models/checklist-model';
import { Data } from '../../providers/data';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checklists: ChecklistModel[] = [];

  constructor(public nav: NavController, public dataService: Data, public alertCtrl: AlertController, public platform: Platform) {
    
  }

  ionViewDidLoad(){

  }

  addChecklist(){
    let prompt = this.alertCtrl.create({
      title: 'Nova Lista',
      message: 'Informe os dados da sua nova lista',
      inputs: [
        {
          name: 'Nome'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            let newChecklist = new ChecklistModel(data.name, []);
            this.checklists.push(newChecklist);

            newChecklist.checklist.subscribe(update => {
              this.save();
            });

            this.save();
          }
        }
      ]
    });

    prompt.present();
  }

  renameChecklist(checklist): void {

  }

  viewChecklist(checklist): void {

  }

  removeChecklist(checklist): void {

  }

  save(): void {
    
  }
}

/*
Estamos importando algumas biblioteca do ionic2. NavController, AlertController. O AlertController nos permite apresentar vários alertas para o usuário, 
incluindo um prompt básico, prompts com entrada, prompts de confirmação e muito mais. Nós estaremos usando Como um método 
para adicionar novas listas de verificação.

Também estamos importando nossa ChecklistPage, que concluiremos implementando mais tarde, mas o mais importante é que estamos importando o Model de Checklist 
que criamos. Também importamos o provedor de Dados gerado anteriormente, mas só vamos implementa sua funcionalidade mais tarde.
 
Finalmente, importamos o 'Keyboard' do Ionic Nativo, para que possamos ter certeza de que o teclado do celular feche quando o usuário adiciona uma listas de verificação.

Ao adicionar a palavra-chave public no construtor, estamos simplesmente configurando uma referência para o NavController e o provedor de dados que podemos usar em toda 
a classe posteriormente, fazendo referência a this.nav e this.dataService. Basicamente é uma abreviação para isso:

  constructor(nav: NavController, dataService: Data){
    this.nav = nav;
    this.dataService = dataService;
  }

Que você pode ter visto usado antes. Também declaramos um array de checklists no topo da classe que o tornará acessível por toda a
A classe fazendo referência assim this.checklists. O resto da classe é várias funções.
--------------------------
Função addCkecklis

Esta função será responsável por permitir que o usuário crie uma nova lista de verificação. Ele vai lançar um prompt,
E usar os dados que são inseridos para criar uma nova lista de verificação (fazendo uso do model de dados que criamos).

Estamos apresentando um prompt para o usuário que irá conter um único campo de entrada de nome, e dois botões Cancelar
E Salvar. O botão cancelar não faz nada, exceto o prompt, mas nós adicionamos um manipulador para salvar
Botão que passará os dados que foram inseridos no campo de entrada.

Dentro deste manipulador primeiro gerar uma nova lista de verificação, passando o nome inserido em uma nova instância de
Nosso modelo de lista de verificação e, em seguida, empurrar esse objeto em nossa matriz this.checklists. Então nós nos inscrevemos
Para o observável que adicionamos ao modelo de dados na última lição para ouvir sempre que a lista de verificação é
Modificado de qualquer maneira, e quando é nós acionamos a função de salvar. Observe que temos duas chamadas para salvar aqui,
Uma que é acionada pelo observável e que dispara imediatamente (já que acabamos de adicionar um novo
Lista de verificação).

Finalmente, acionamos o prompt chamando seu método atual.
Se você der uma olhada em seu arquivo de modelo novamente, você se lembrará de que já adicionamos uma chamada para esta função
Para quando o botão adicionar é clicado:

  <button (click)="addChecklist()"><ion-icon name="add-circle"></ion-icon></button>
 */