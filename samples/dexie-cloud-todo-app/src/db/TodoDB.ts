import Dexie from "dexie";
import dexieCloud, { DexieCloudTable } from "dexie-cloud-addon";
import { usePermissions } from "dexie-react-hooks";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";

export class TodoDB extends Dexie {
  // Table accessors are auto-generated by Dexie (from schema below)
  todoLists!: DexieCloudTable<TodoList, 'id'>;
  todoItems!: DexieCloudTable<TodoItem, 'id'>;

  constructor() {
    super('TodoDBCloud2', { addons: [dexieCloud] });
    this.version(6).stores({
      todoLists: `@id`,
      todoItems: `@id, [todoListId+realmId]`
    });
    this.todoLists.mapToClass(TodoList);
  }
}


/*
    TODO:

      1. V: Felsök varför vi inte får rätt permissions

      Sedan:
      1. Låt TodoItem vara interface igen. Ingen poäng att mappa till klass!
      2. Ändra överlagrade varianten till db.cloud.permissions att ta: const can = usePermissions(db, 'todoItems', todoItem);
      3. Gör en överlagrad variant av usePermissions som tar (db, tableName, obj)

      * Basera useLiveQuery på nya useObservable?
      
 */