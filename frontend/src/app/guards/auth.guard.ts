import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
//========CHECK NẾU LÀ ADMIN
export class authAdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userService.getMe().pipe(
      switchMap((item) => {
        console.log(item);

        return this.userService.getUser(item).pipe(
          map((user) => {
            console.log(user.quyen);
            if (user.quyen == 0) {
              return true;
            } else {
              this.router.navigate(['/']); 
              return false;
            }
          })
        );

        // return !!item;
      })
    );
  }
}
export class authManagerGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.userService.getMe().pipe(
      switchMap((item) => {
        console.log(item);

        return this.userService.getUser(item).pipe(
          map((user) => {
            console.log(user.quyen);
            if (user.quyen == 1) return true;
            return false;
          })
        );

        // return !!item;
      })
    );
  }
}
