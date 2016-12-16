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

 addChecklist(): void {
    let prompt = this.alertCtrl.create({
      title: 'Nova lista',
      message: 'Digite o nome da nova lista por favor',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
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
    let prompt = this.alertCtrl.create({
      title: 'Renomea Lista',
      message: 'Digite o novo nome da lista',
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
            let index = this.checklists.indexOf(checklist);

              if(index > -1){
                this.checklists[index].setTitle(data.name);
                this.save();
              }
          }
        }
      ]
    });

    prompt.present();
  }

  viewChecklist(checklist): void {
    this.nav.push(ChecklistPage, {
      checklist: checklist
    });
  }

  removeChecklist(checklist): void {
    let index = this.checklists.indexOf(checklist);

    if(index > -1){
      this.checklists.splice(index, 1);
      this.save();
    }
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
----------------------------
Função renameChecklist

A primeira coisa que você pode notar é que parece muito semelhante à nossa função 
addChecklist, e isso é porque é. Usamos o mesmo prompt com as mesmas entradas e 
botões, apenas temos um manipulador ligeiramente diferente.

Observe que estamos passando um parâmetro para esta função, que será uma 
referência para a lista de verificação que queremos renomear. Vamos atualizar 
o model em breve para passar nesta referência, mas por agora apenas fingir 
que temos.

Nós usamos esta referência para a lista de verificação para encontrá-lo 
em nosso array this.checklists e, em seguida, configurá-lo para o novo 
título que foi inserido, em seguida, acionamos uma salvar.

Novamente, se você se lembrar de antes, já criamos um manipulador de 
clique que chamará essa função no models:

  <button light (click)="renameChecklist(checklist)"><ion-icon
    name="clipboard"></ion-icon></button>
--------------------------------
função removeChecklist

Esta função é bastante simples porque não requer qualquer entrada do usuário, 
só precisamos nos livrar da Lista de verificação Assim como fizemos antes, 
estamos passando em uma  referência à lista de verificação e, em 
seguida, encontrar a lista de verificação
no noss array this.checklists. Em seguida, simplesmente removê-lo do
array usando o método de splice e Disparar um salvamento.
Aqui está o código do modelo que aciona esta função:
  <button danger (click)="removeChecklist(checklist)"><ion-icon
    name="trash"></ion-icon> Delete</button>
 ---------------------------------
função viewChecklist

Podemos criar e modificar nossas listas de verificação agora, mas também 
precisamos ser capazes de ver os detalhes de
Listas de verificação e para adicionar itens individuais a listas de 
verificação. Para fazer isso, vamos usar o NavController para
Pressione uma nova página e passe uma referência à lista de verificação clicada.


Passamos na ChecklistPage que importámos antes (que ainda estamos para terminar) 
ao método push, bem como os dados que queremos enviar para a nova página, que é uma referência 
para a lista de verificação que o usuário está tentando
visualizar. Nós poderemos usar NavParams na classe para nossa página da 
 */