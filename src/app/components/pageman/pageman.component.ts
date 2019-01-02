import { Component, OnInit, Injectable } from '@angular/core';
import { PageService, PageQuery } from 'src/app/services/page/page.service';
import {NestedTreeControl, FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource, MatTreeFlattener, MatTreeFlatDataSource} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';

/**
 * Node for to-do item
 */
export class TodoItemNode {
  children: TodoItemNode[];
  id: number;
  title: string;
  published: boolean;
  parentId: number;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  id: number;
  title: string;
  published: boolean;
  parentId: number;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA = {
  Groceries: {
    'Almond Meal flour': null,
    'Organic eggs': null,
    'Protein Powder': null,
    Fruits: {
      Apple: null,
      Berries: ['Blueberry', 'Raspberry'],
      Orange: null
    }
  },
  Reminders: [
    'Cook dinner',
    'Read the Material Design spec',
    'Upgrade Application to Angular'
  ]
};

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TodoItemNode[]>([]);

  get data(): TodoItemNode[] { return this.dataChange.value; }

  constructor(private _pageService: PageService) {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    //const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    //this.dataChange.next(data);
    this._pageService.getPages().subscribe(x => {
      let tmp = this._buildPageTree(x);
      //const data = this.buildFileTree(TREE_DATA, 0);
      
      // Notify the change.
      this.dataChange.next(tmp);
    });
  }

  _buildPageTree(fullArray) {
    var rootNode = [
      {
        "title" : "Root",
        "id" : 0,
        "parentId" : ""
      }
    ]
    
    var roots = [], children = {};
    let flatList: TodoItemNode[] = [];
    // find the top level nodes and hash the children based on parent
    for (var i = 0, len = fullArray.length; i < len; ++i) {
      var item: TodoItemNode = new TodoItemNode();
      item.title = fullArray[i].title;
      item.id = fullArray[i].id;
      item.published = fullArray[i].published;
      item.parentId = fullArray[i].parentId;
      item.children = [];
      var p = item.parentId,
        target = !p ? flatList : (children[p] || (children[p] = []));
      //flatList.push(item);
      target.push(item);
    }
    // function to recursively build the tree
    var findChildren = function(parent) {
      if (children[parent.id]) {
        parent.children = children[parent.id];
        for (var i = 0, len = parent.children.length; i < len; ++i) {
          findChildren(parent.children[i]);
        }
      }
    };
    // enumerate through to handle the case where there are multiple roots
    for (var i = 0, l = flatList.length; i < l; ++i) {

      findChildren(flatList[i]);
    }
    return flatList;
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `TodoItemNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number): TodoItemNode[] {
    return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new TodoItemNode();
      node.title = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.title = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /** Add an item to to-do list */
  insertItem(parent: TodoItemNode, name: string) {
    if (parent.children) {
      parent.children.push({title: name} as TodoItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: TodoItemNode, name: string) {
    node.title = name;
    this.dataChange.next(this.data);
  }
}

@Component({
  selector: 'app-pageman',
  templateUrl: './pageman.component.html',
  styleUrls: ['./pageman.component.css'],
  providers: [ChecklistDatabase]
})
export class PagemanComponent implements OnInit {
  ngOnInit(): void {
  }
  /*
  rawPages = [];
  constructor(private _pageService: PageService) { }

  ngOnInit() {
    this._pageService.getPages().subscribe(x => this.rawPages = x);
  }
  */
 newNodeParent: TodoItemFlatNode = null;
 /** Map from flat node to nested node. This helps us finding the nested node to be modified */
 flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

 /** Map from nested node to flattened node. This helps us to keep the same object for selection */
 nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

 /** A selected parent node to be inserted */
 selectedParent: TodoItemFlatNode | null = null;

 /** The new item's name */
 newItemName = '';

 treeControl: FlatTreeControl<TodoItemFlatNode>;

 treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

 dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

 /** The selection for checklist */
 checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

 constructor(private database: ChecklistDatabase, private _pageService: PageService) {
   this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
     this.isExpandable, this.getChildren);
   this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
   this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

   database.dataChange.subscribe(data => {
     console.log(data);
     this.dataSource.data = data;
   });
 }

 getLevel = (node: TodoItemFlatNode) => node.level;

 isExpandable = (node: TodoItemFlatNode) => node.expandable;

 getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

 hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

 hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.title === '';

 /**
  * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
  */
 transformer = (node: TodoItemNode, level: number) => {
   const existingNode = this.nestedNodeMap.get(node);
   const flatNode = existingNode && existingNode.title === node.title
       ? existingNode
       : new TodoItemFlatNode();
   flatNode.title = node.title;
   flatNode.level = level;
   flatNode.id = node.id;
   flatNode.parentId = node.parentId;
   flatNode.published = node.published;
   flatNode.expandable = !!node.children;
   this.flatNodeMap.set(flatNode, node);
   this.nestedNodeMap.set(node, flatNode);
   return flatNode;
 }

 /** Whether all the descendants of the node are selected. */
 descendantsAllSelected(node: TodoItemFlatNode): boolean {
   return node.published;
 }

 /** Whether part of the descendants are selected */
 descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
   const descendants = this.treeControl.getDescendants(node);
   const result = descendants.some(child => this.checklistSelection.isSelected(child));
   return result && !this.descendantsAllSelected(node);
 }

 /** Toggle the to-do item selection. Select/deselect all the descendants node */
 todoItemSelectionToggle(node: TodoItemFlatNode, e: any): void {
   this.checklistSelection.toggle(node);
   const descendants = this.treeControl.getDescendants(node);
   this.checklistSelection.isSelected(node)
     ? this.checklistSelection.select(...descendants)
     : this.checklistSelection.deselect(...descendants);

   // Force update for the parent
   descendants.every(child =>
     this.checklistSelection.isSelected(child)
   );
   this.checkAllParentsSelection(node);
   node.published = e.checked;
   this._updatePage(node);
 }

 /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
 todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
   this.checklistSelection.toggle(node);
   this.checkAllParentsSelection(node);
   
 }

 /* Checks all the parents when a leaf node is selected/unselected */
 checkAllParentsSelection(node: TodoItemFlatNode): void {
   let parent: TodoItemFlatNode | null = this.getParentNode(node);
   while (parent) {
     this.checkRootNodeSelection(parent);
     parent = this.getParentNode(parent);
   }
 }

 /** Check root node checked state and change it accordingly */
 checkRootNodeSelection(node: TodoItemFlatNode): void {
   const nodeSelected = this.checklistSelection.isSelected(node);
   const descendants = this.treeControl.getDescendants(node);
   const descAllSelected = descendants.every(child =>
     this.checklistSelection.isSelected(child)
   );
   if (nodeSelected && !descAllSelected) {
     this.checklistSelection.deselect(node);
   } else if (!nodeSelected && descAllSelected) {
     this.checklistSelection.select(node);
   }
 }

 /* Get the parent node of a node */
 getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
   const currentLevel = this.getLevel(node);

   if (currentLevel < 1) {
     return null;
   }

   const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

   for (let i = startIndex; i >= 0; i--) {
     const currentNode = this.treeControl.dataNodes[i];

     if (this.getLevel(currentNode) < currentLevel) {
       return currentNode;
     }
   }
   return null;
 }

 /** Select the category so we can insert the new item. */
 addNewItem(node: TodoItemFlatNode) {
   const parentNode = this.flatNodeMap.get(node);
   this.database.insertItem(parentNode!, '');
   this.treeControl.expand(node);
   this.newNodeParent = node;
 }

 /** Save the node to database */
 saveNode(node: TodoItemFlatNode, itemValue: string) {
   const nestedNode = this.flatNodeMap.get(node);
   this.database.updateItem(nestedNode!, itemValue);
   node.id = -1;
   node.title = itemValue;
   node.parentId = this.newNodeParent.id;
   node.published = false;
   this._updatePage(node);
 }
 _updatePage(node: TodoItemFlatNode) {
  let pageQuery:PageQuery = {
    id: node.id,
    title: node.title,
    type: '',
    parentPageId: node.parentId,
    published: node.published
  };
  this._pageService.updatePage(pageQuery).subscribe(x => console.log(x));
 }
}
