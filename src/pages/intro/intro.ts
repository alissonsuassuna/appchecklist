import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  slideOptions: any;

  constructor(public nav: NavController) {

    this.slideOptions = {
      pager: true
    };
  }

  goToHome(): void {
    this.nav.setRoot(HomePage);
  }

}

/*
Não é esta a classe mais simples que você já viu até agora? Tudo o que faz é 
importar a página inicial, definir a opção pager para o nosso controle deslizante 
e alterar a página raiz para ele usando o NavController quando a função 
goToHome é chamada.
 
Isso nos permite tocar no botão no último slide para ir para a nossa página 
principal, mas teremos um pouco de problema.

Toda vez que o usuário abrir o aplicativo, eles terão que passar por este 
tutorial para acessar o aplicativo principal. Para resolver isso, vamos 
fazer mais uma mudança para nosso home.ts Arquivo.
 */
