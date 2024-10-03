// import { Injectable } from "@angular/core";
// import * as CryptoJS from "crypto-js";
// import { environment } from "src/environments/environment";

// @Injectable({
//   providedIn: "root",
// })
// export class LocalStorageService {
//   constructor() {}

//   /**
//    * get any item from local storage using property name
//    * @param name : String
//    */
//   getItem(name: string) {
//     if (window.localStorage.getItem(name)) {
//       return CryptoJS.AES.decrypt(
//         window.localStorage.getItem(name),
//         environment.local_storage_secret_key
//       ).toString(CryptoJS.enc.Utf8);
//     }

//     return null;
//   }

//   /**
//    * save any item in local storage
//    * @param item : Object (name,value)
//    */
//   saveItem(name: any, item: any) {
//     window.localStorage.setItem(
//       name,
//       CryptoJS.AES.encrypt(item, environment.local_storage_secret_key, {
//         keySize: 256 / 32,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7,
//       }).toString()
//     );
//   }

//   /**
//    * save array of items in local storage
//    * @param items : Array <Object(name,value)>
//    */
//   saveMultipleItems(items: Array<any>) {
//     for (const item of items) {
//       window.localStorage[item.name] = item.value;
//     }
//   }

//   /**
//    * remove item from local storage by parsing the property name
//    * @param name : String
//    */
//   destroyItem(name: string) {
//     window.localStorage.removeItem(name);
//   }

//   /**
//    * remove all data from loacal storage
//    */
//   destroyAll() {
//     window.localStorage.clear();
//   }
// }
