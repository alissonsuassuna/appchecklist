import { Observable } from 'rxjs/Observable';

export class ChecklistModel {

    checklist: any;
    checklistObserver: any;

    constructor(public title: string, public items: any[]){

        this.items = items;

        this.checklist = Observable.create(observer => {
            this.checklistObserver = observer;
        });
    }

    addItem(item): void{

        this.items.push({
            title: item,
            checked: false
        });

        this.checklistObserver.next(true);
    }

    removeItem(item): void {

        let index = this.items.indexOf(item);

        if(index > -1){
            this.items.splice(index, 1);
        }

         this.checklistObserver.next(true);
    }

    renameItem(item, title): void{

        let index = this.items.indexOf(item);

        if(index > -1){
            this.items[index].title = title;
        }

         this.checklistObserver.next(true);
    }

    setTitle(title): void {
        this.title = title;
         this.checklistObserver.next(true);
    }

    toggleItem(item): void{
        item.checked = !item.checked;
         this.checklistObserver.next(true);
    }
}
/*
O que estamos tentando fazer com este model de dados é essencialmente criar um plano para uma lista de verificação individual. 
Uma lista de verificação tem um título e pode ter qualquer número de itens associados a ele que precisam ser concluídos.
Portanto, configuramos variáveis de membro para manter esses valores: uma seqüência simples para o título e um array para os itens.

Observe que permitimos que o título e os itens sejam passados pelo construtor. Um título deve ser fornecido
Para criar uma nova lista de verificação, mas fornecer o array de itens é opcional. Se quisermos adicionar itens imediatamente

Para uma lista de verificação podemos fornecer uma matriz de itens quando instanciá-lo, caso contrário, ele só será inicializado com uma matriz vazia.

Nós incluímos um monte de funções auxiliares que são todas bastante simples, elas nos permitem mudar o título da lista de verificação, ou modificar 
qualquer um dos itens de lista de verificação (mudando seu nome, removendo um item, adicionando um novo item à lista de verificação , Ou alternar o 
estado de conclusão de um item).

Observe também que adicionamos: void após cada uma das funções. Assim como podemos declarar que uma variável tem um certo tipo fazendo algo como isto:

checklist: any;

Também podemos declarar que tipo de dados retorna uma função. Neste caso, nenhum dado está sendo retornado, portanto usamos void. Se uma dessas funções 
fosse retornar uma string, então nós usaríamos: string na função.

Com tudo isso, podemos criar facilmente uma nova lista de verificação em qualquer componente em que tenhamos importado esse Model de Lista 
usando o seguinte código:

let newChecklist = new ChecklistModel('My Checklist', []);
ou
let newChecklist = new ChecklistModel('My Checklist', myItemsArray);
=====================================================================
Criação do Observable.

A primeira coisa a notar aqui é que agora estamos importando Observable da biblioteca RxJS. Então em nosso
Construtor, criamos o Observable:
    this.checklist = Observable.create(observer => {
        this.checklistObserver = observer;
    });
Nossa variável this.checklist no código acima é agora o nosso próprio observável. Uma vez que é
Um observável, podemos subscrevê-lo, e uma vez que é parte do nosso models de dados, podemos subscrevê-lo em qualquer
Lista de verificação que criamos em nosso aplicativo. Por exemplo:

    let newChecklist = new ChecklistModel('My Checklist', []);
        newChecklist.checklist.subscribe(data => {
        console.log(data);
    });
Naturalmente, nós não estamos fazendo nada com o observável ainda por isso nunca vai desencadear o onNext como resposta. É por isso que adicionamos os seguintes bits de código 
a cada uma das nossas funções auxiliares: 

this.checklistObserver.next(true);

Assim, sempre que usamos uma das nossas funções auxiliares para alterar o título, ou adicionar um novo item, ou qualquer outra coisa, 
ele irá notificar qualquer coisa que está subscrito ao seu Observável. Tudo o que queremos saber é que uma mudança ocorreu, então estamos 
apenas passando de volta um booleano (verdadeiro ou falso), mas também poderíamos facilmente passar de volta alguns dados se nós
procurado.

O resultado disto é que agora podemos "observar" as listas de verificação que criamos para as mudanças que ocorrem. Mais tarde, 
faremos uso disto ouvindo essas mudanças e, em seguida, acionar uma salvar.
 */