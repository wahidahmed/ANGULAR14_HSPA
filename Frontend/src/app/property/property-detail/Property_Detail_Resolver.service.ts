import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Property } from 'src/app/Models/Property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root'
})
export class Property_Detail_ResolverService implements Resolve<Property> {

constructor(private housingService:HousingService,private router:Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property> {
    const prodId=route.params['id'];
    return  this.housingService.getPropertyById(+prodId).pipe(
      catchError(error=>{
        this.router.navigate(['/']);
        return of(null)
      })
    );
  }

}
