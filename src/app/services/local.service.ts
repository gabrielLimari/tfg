import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { parseString } from 'xml2js'; // Correctly import parseString from xml2js
import { Local } from '../interfaces/locals';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private xmlUrl = '/api/opendata/noche_v1_es.xml';
  private selectedLocal!: Local;

  constructor(private http: HttpClient) {}

  getLocales(): Observable<Local[]> {
    const storedLocals = localStorage.getItem('locals'); // Verificar si ya hay datos almacenados

    if (storedLocals) {
      // Si existen, parsearlos y devolverlos
      return new Observable((observer) => {
        observer.next(JSON.parse(storedLocals));
        observer.complete();
      });
    } else {
      // Si no existen, hacer la petición HTTP y almacenarlos
      return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
        map((xml) => {
          let result: any;
          parseString(xml, { explicitArray: false }, (err, json) => {
            if (err) {
              console.error('Error parsing XML:', err);
            } else {
              result = json.serviceList.service || [];
            }
          });

          // Mapeamos la respuesta para ajustarla al formato Local[]
          const locals = result.map((service: any) => ({
            id: service.$.id,
            fechaActualizacion: service.$.fechaActualizacion,
            basicData: {
              language: service.basicData.language,
              name: service.basicData.name,
              email: service.basicData.email,
              phone: service.basicData.phone,
              title: service.basicData.title,
              body: service.basicData.body,
              web: service.basicData.web,
            },
            geoData: {
              address: service.geoData.address,
              zipcode: service.geoData.zipcode,
              country: service.geoData.country,
              latitude: parseFloat(service.geoData.latitude),
              longitude: parseFloat(service.geoData.longitude),
              subAdministrativeArea: service.geoData.subAdministrativeArea,
            },
            multimedia: {
              images: Array.isArray(service.multimedia?.media)
                ? service.multimedia.media.map((media: any) => media.url)
                : service.multimedia?.media
                ? [service.multimedia.media.url]
                : [],
            },
            extraData: {
              typeId: service.extradata.item.find((i: any) => i.$.name === 'idTipo')?._,
              type: service.extradata.item.find((i: any) => i.$.name === 'Tipo')?._,
              categories: Array.isArray(service.extradata.categorias?.categoria)
                ? service.extradata.categorias.categoria.map((cat: any) => ({
                    idCategoria: cat.item[0]._,
                    categoria: cat.item[1]._,
                  }))
                : [],
              paymentServices: service.extradata.item.find((i: any) => i.$.name === 'Servicios de pago')?._,
              schedule: service.extradata.item.find((i: any) => i.$.name === 'Horario')?._,
            },
          }));

          // Guardamos los datos en localStorage para uso futuro
          localStorage.setItem('locals', JSON.stringify(locals));

          return locals;
        })
      );
    }
  }

  getSelectedLocal() {
    return this.selectedLocal;
  }

  setSelectedLocal(local: Local): void {
    this.selectedLocal = local;
    localStorage.setItem('selectedLocal', JSON.stringify(local)); // Guardamos el local en localStorage
  }
}
