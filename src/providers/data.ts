import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  constructor(public storage: Storage) {
    
  }

  getData(): Promise<any>{
    return this.storage.get('checklists');
  }

  save(data): void{

    let saveDate = [];

    //Remove observable
    data.forEach((checklist) => {

      saveDate.push({
        title: checklist.title,
        items: checklist.items
      });
    });

    let newData = JSON.stringify(saveDate);
    this.storage.set('checklists', newData);
  }
}
/* 
Comentários sobre o que foi feito aqui a título de estudos 
==========================================================
Há uma nova importação aqui que não temos visto antes:
  import { Storage } from '@ionic/storage';

O Storage é o serviço de armazenamento genérico do Ionic2 e trata de armazenagem de dados da melhor maneira possível, ao mesmo tempo 
que fornece uma API consistente para nós usar.

Ao rodar em um dispositivo, e se o plugin SQLite estiver disponível (que instalamos anteriormente), ele armazenará dados usando um banco de dados SQLite nativo. 
Como o banco de dados SQLite só estará disponível ao ser executado nativamente em um dispositivo, o Storage também usará IndexedDB, WebSQL ou o navegador padrão 
localStorage se o banco de dados SQLite não estiver disponível.

É melhor usar o SQLite sempre que possível, porque o armazenamento local baseado no navegador não é completamente confiável e pode ser apagado pelo sistema operacional. 
Ter seus dados limpados aleatoriamente não é obviamente ideal.  

função getData
  getData(): Promise<any> {
    return this.storage.get('checklists');
  }

Esta função nos permitirá recuperar os dados mais recentes que foram armazenados, e ele irá retorná-lo na forma de um
Promessa. Estamos definindo o tipo de retorno para esta função como uma Promessa que retorna <qualquer> tipo, este é um
Dos tipos mais complicados. Lembre-se, adicionar tipos como este não é necessário, por isso, se você está confuso por
Isso e preferiria deixá-lo fora você poderia simplesmente fazer isso em vez disso:
  getData(){
    return this.storage.get('checklists');
  }
  -----
Observe que não estamos configurando o manipulador para quando a promessa termina aqui, em vez disso, apenas devolver o
Resultado do método get (que será uma promessa que resolve com os dados que estão atualmente em armazenamento).
Lembre-se que esta operação não é instantânea, e isso nos permite configurar o manipulador de onde quer que
Código este método está sendo chamado, o que faz mais sentido para o fluxo do aplicativo (espero que este
Será mais claro em breve).
Então nós temos nossa função saveData, que manipula realmente salvar os dados em armazenamento:

função save(data)

Como eu mencionei, estamos armazenando os dados como uma única seqüência codificada JSON, então chamamos o JSON.stringify
E depois armazene os dados usando o método set em nosso objeto de armazenamento. Antes de fazer isso, porém,
Removemos o material observável dos dados apenas empurrando o título e os itens, uma vez que não
Jogar agradável com JSON (causa um erro de objeto circular), e vamos apenas ser recriá-los mais tarde de qualquer maneira.
Isso é tudo o que há para salvar os dados, o que não é realmente tão complexo. Agora só precisamos lidar com o carregamento
Que os dados de volta para o aplicativo.

Carregando dados

Vamos querer carregar os dados das listas de verificação do armazenamento sempre que o usuário abrir o aplicativo,
Então um bom lugar para fazer isso é o gancho ionViewDidLoad em nossa página inicial, que desencadeia assim que
A página é carregada. Também vamos fazer uma pequena modificação no construtor.
*/