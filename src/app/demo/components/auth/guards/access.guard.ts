import {Injectable} from '@angular/core';
import {CanLoad, Route, Router, UrlSegment} from '@angular/router';
import {Observable} from "rxjs";
import {AccessService} from "../services/access.service";

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanLoad {

    constructor(private router: Router, private accessService: AccessService) {
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        if (route.path === 'autorizacao') {
            if (this.accessService.hasAccessAutorizacao()) {
                return true;
            } else {
                this.router.navigate(['/auth/login']);
                localStorage.clear();
                return false;
            }
        }
    
        if (route.path === 'usuarios') {
            if (this.accessService.hasAccessUsuarios()) {
                return true;
            } else {
                this.router.navigate(['/auth/login']);
                localStorage.clear();
                return false;
            }
        }
        return false;
    }
}