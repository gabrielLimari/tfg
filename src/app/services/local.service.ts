import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { parseString } from 'xml2js'; // Correctly import parseString from xml2js
import { Local } from '../interfaces/local';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  private xmlUrl = '/api/opendata/noche_v1_es.xml';

  constructor(private http: HttpClient) {}

    getLocales(): Observable<Local[]> {
      return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
        map((xml) => {
          let result: any;
          // Parsing the XML and mapping it to the expected Local[] format
          parseString(xml, { explicitArray: false }, (err, json) => {
            if (err) {
              console.error('Error parsing XML:', err);
            } else {
              result = json.serviceList.service || [];
            }
          });

          // Safely handle 'multimedia.media' in the service data
          return result.map((service: any) => ({
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
                  ? [service.multimedia.media.url] // Convierte un solo objeto en un array
                  : [], // Si no hay multimedia, devuelve un array vacío
            },
            extraData: {
              typeId: service.extradata.item.find((i: any) => i.$.name === 'idTipo')?._,
              type: service.extradata.item.find((i: any) => i.$.name === 'Tipo')?._,
              // Check if categorias.categoria is an array before using .map()
              categories: Array.isArray(service.extradata.categorias?.categoria)
                ? service.extradata.categorias.categoria.map((cat: any) => ({
                    idCategoria: cat.item[0]._,
                    categoria: cat.item[1]._,
                  }))
                : [], // Default to an empty array if categorias.categoria is not an array
              paymentServices: service.extradata.item.find((i: any) => i.$.name === 'Servicios de pago')?._,
              schedule: service.extradata.item.find((i: any) => i.$.name === 'Horario')?._,
            },
          }));
        })
      );
    }

    getLocalById(id: string): Observable<Local | undefined> {
      return this.getLocales().pipe(
        map((locals: Local[]) => locals.find(local => local.id === id))
      );
    }
    

  }
