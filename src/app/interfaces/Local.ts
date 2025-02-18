export interface Local {
    id: string;
    fechaActualizacion: string;
    basicData: {
      language: string;
      name: string;
      email: string;
      phone: string;
      title: string;
      body: string;
      web: string;
    };
    geoData: {
      address: string;
      zipcode: string;
      country: string;
      latitude: number;
      longitude: number;
      subAdministrativeArea: string;
    };
    multimedia: {
      images: string[];
    };
    extraData: {
      typeId: string;
      type: string;
      categories: {
        idCategoria: string;
        categoria: string;
      }[];
      paymentServices: string;
      schedule: string;
    };
  }
  