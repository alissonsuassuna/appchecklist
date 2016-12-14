export class ChecklistModel {

    checklist: any;
    checklistObserver: any;

    constructor(public title: string, public items: any[]){

        this.items = items;
    }

    addItem(item): void{

        this.items.push({
            title: item,
            checked: false
        });
    }

    removeItem(item): void {

        let index = this.items.indexOf(item);

        if(index > -1){
            this.items.splice(index, 1);
        }
    }

    renameItem(item, title): void{

        let index = this.items.indexOf(item);

        if(index > -1){
            this.items[index].title = title;
        }
    }

    setTitle(title): void {
        this.title = title;
    }

    toggleItem(item): void{
        item.checked = !item.checked;
    }
}