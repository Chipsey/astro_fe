// import { Injectable } from "@angular/core";
// import jwt_decode from "jwt-decode";
// import { LocalStorageService } from "./local-storage.service";

// @Injectable()
// export class JwtService {
//   constructor(private localStorageService: LocalStorageService) {}

//   getToken(): String {
//     return window.localStorage["jwtToken"];
//   }

//   getLoggedUserId() {
//     try {
//       const tokenBody = jwt_decode(window.localStorage["jwtToken"]);
//       return tokenBody["id"] === undefined ? null : tokenBody["id"];
//     } catch (Error) {
//       // this._MsgHandelService.showErrorMsg('Error', 'Could not read token');
//       return null;
//     }
//   }

//   saveToken(token: String) {
//     window.localStorage["jwtToken"] = token;
//   }

//   saveUserConfig(data: any) {
//     this.localStorageService.saveItem("user_id", data.data._id);
//     this.localStorageService.saveItem("name", data.data.name);
//     this.localStorageService.saveItem("email", data.data.email);
//     this.localStorageService.saveItem("role", data.data.role);
//     this.localStorageService.saveItem(
//       "user_roles",
//       JSON.stringify(data?.data?.user_role.routes)
//     );
//     this.localStorageService.saveItem(
//       "is_first_time",
//       String(data.data.is_first_time)
//   }

//   destroyToken() {
//     window.localStorage.clear();
//   }
// }
