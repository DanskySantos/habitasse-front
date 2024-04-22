import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import {AccessService} from "../auth/services/access.service";

@Injectable({
    providedIn: 'root'
})
export class AccessGuard implements CanActivate {

    constructor(private router: Router,
                private accessService: AccessService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (route.routeConfig?.path === 'all-demands') {
            if (this.accessService.hasAccessCO()) {
                return true;
            } else {
                this.router.navigateByUrl('/auth/login');
                return false;
            }
        }

        if (route.routeConfig?.path === 'my-demands') {
            if (this.accessService.hasAccessCD()) {
                return true;
            } else {
                this.router.navigateByUrl('/auth/login');
                return false;
            }
        }

        if (route.routeConfig?.path === 'property-demand') {
            if (this.accessService.hasAccessCD()) {
                return true;
            } else {
                this.router.navigateByUrl('/auth/login');
                return false;
            }
        }
        return true;
    }
}
