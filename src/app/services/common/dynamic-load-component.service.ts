import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicLoadComponentService {

  //ViewContainerRef : Dinamik olarak yüklecenek componenti içerisinde barındıran container (Her dinamik yükleme sürecinde önceki view'leri temizlememiz gerekmektedir)
  //ComponentFactory : componentlerin instancelarını oluşturmak için kullanılan nesne
  //ComponentFactoryResolver : Belirli bir component için componentfactoryi resolve eden sınıftır. içerisindeki resolveComponentFactory fonksiyonu aracılığıyla ilgili componente dair bir  componentfactory nesnesi oluşturup döner.

  constructor() { }

    async loadComponent(component:ComponentType, viewContainerRef: ViewContainerRef) {
    let _component: any = null;
    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (await import("../../ui/components/baskets/baskets.component")).BasketsComponent;
        break;
    
    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);

  }
}

export enum ComponentType {
  BasketsComponent
}