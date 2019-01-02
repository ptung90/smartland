import { Component, OnInit,HostListener } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  rawPages = [];
  navTree = [];
  logoLeft = false;
  constructor(private _pageService: PageService) {
    this._loadMainNav();
  }
  public isScrolled = false;
@HostListener("document:scroll", [])
  onWindowScroll() {
    const number = window.scrollY;

    if (number > 10) {
        this.isScrolled = true;
    } else if (this.isScrolled && number < 10) {
        this.isScrolled = false;
    }
    // console.log(this.isScrolled);
  }
Change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.trim();
    return str;
}
  ngOnInit() {

  }
  _loadMainNav() {
    this._pageService.getPages().subscribe(x => {
      this.rawPages = x.filter(y => y.published == true);
      this._buildPageTree();
    });
    // this.rawPages = [
    //   {"id":1,"title":"Nhà","parentId":0, "path":"nha"},
    //   {"id":2,"title":"Đất","parentId":0, "path":"dat"},
    //   {"id":3,"title":"Thuê","parentId":0, "path":"thue"},
    //   {"id":4,"title":"Kí Gửi","parentId":0, "path":"kygui"},
    //   {"id":5,"title":"Pháp Lý","parentId":0, "path":"phaply"},
    //   {"id":6,"title":"Tin Tức","parentId":0, "path":"tintuc"},

    //   {"id":7,"title":"Nhà 1","parentId":1, "path":""},
    //   {"id":8,"title":"Nhà 2","parentId":1, "path":""},
    //   {"id":9,"title":"Nhà 3","parentId":1, "path":""},
    //   {"id":10,"title":"Nhà 4","parentId":1, "path":""},
    // ];
    // this._buildPageTree();
  }
    _buildPageTree() {
    var rootNode = [
      {
        "title" : "Root",
        "id" : 0,
        "parentId" : ""
      }
    ]
    var fullArray = this.rawPages;// rootNode.concat(this.rawPages);
    var roots = [], children = {};

    // find the top level nodes and hash the children based on parent
    for (var i = 0, len = fullArray.length; i < len; ++i) {
      var item = fullArray[i],
        p = item.parentId,
        target = !p ? roots : (children[p] || (children[p] = []));

      target.push({ value: item });
    }

    // function to recursively build the tree
    var findChildren = function(parent) {
      if (children[parent.value.id]) {
        parent.children = children[parent.value.id];
        for (var i = 0, len = parent.children.length; i < len; ++i) {
          findChildren(parent.children[i]);
        }
      }
    };

    // enumerate through to handle the case where there are multiple roots
    for (var i = 0, len = roots.length; i < len; ++i) {
      findChildren(roots[i]);
    }
    // this.navTree = this.chunkArray(roots, 2);
    this.navTree = roots;
  }
  // chunkArray(arr,n){
  //   var chunkLength = Math.max(arr.length/n ,1);
  //   var chunks = [];
  //   for (var i = 0; i < n; i++) {
  //       if(chunkLength*(i+1)<=arr.length)chunks.push(arr.slice(chunkLength*i, chunkLength*(i+1)));
  //   }
  //   return chunks;
  // }
  

}
