import { useEffect } from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

// Abre o crea la base de datos y habilita las claves foráneas
const db = openDatabase(
  { name: 'local.db' },
  () => {
    // Habilitar claves foráneas
    db.executeSql('PRAGMA foreign_keys = ON;', [], () => {
      console.log('Claves foráneas habilitadas');
    }, (error) => {
      console.log('Error habilitando claves foráneas:', error);
    });
  },
  error => {
    console.log('Error abriendo la base de datos:', error);
  }
);

// Crear tablas si no existen
export const crearTablas = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS reclamosLocal (
        idReclamo INTEGER PRIMARY KEY AUTOINCREMENT,
        documentoVecino INTEGER,
        legajoPersonal INTEGER,
        calleSitio TEXT,
        numeroSitio INTEGER,
        idDesperfecto INTEGER,
        descripcion TEXT
      )`,
      [],
      (tx, results) => {
        console.log("Tabla de reclamos creada correctamente!");
      },
      error => {
        console.log("Error creando tabla de reclamos: ", error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS denunciasLocal (
        idDenuncia INTEGER PRIMARY KEY AUTOINCREMENT,
        documentoVecino INTEGER,
        calleSitio TEXT,
        numeroSitio INTEGER,
        descripcion TEXT,
        aceptoResponsabilidad BOOLEAN
      )`,
      [],
      (tx, results) => {
        console.log("Tabla de denuncias creada correctamente!");
      },
      error => {
        console.log("Error creando tabla de denuncias: ", error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS serviciosLocal (
        idServicio INTEGER PRIMARY KEY AUTOINCREMENT,
        documentoVecino INTEGER,
        titulo TEXT,
        direccion TEXT,
        telefono TEXT,
        descripcion TEXT,
        idRubro INTEGER,
        tipoServicio TEXT
      )`,
      [],
      (tx, results) => {
        console.log("Tabla de servicios creada correctamente!");
      },
      error => {
        console.log("Error creando tabla de servicios: ", error);
      }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS imagenesReclamosLocal (
        idImagen INTEGER PRIMARY KEY AUTOINCREMENT,
        datosImagen INTEGER,
        idReclamo INTEGER,
        FOREIGN KEY (idReclamo) REFERENCES reclamosLocal(idReclamo)
      )`,
      [],
      (tx, results) => {
        console.log("Tabla de imágenes de reclamos creada correctamente!");
      },
      error => {
        console.log("Error creando tabla de imágenes de reclamos: ", error);
      }
    );

    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS imagenesDenunciasLocal (
          idImagen INTEGER PRIMARY KEY AUTOINCREMENT,
          datosImagen INTEGER,
          idDenuncia INTEGER,
          FOREIGN KEY (idDenuncia) REFERENCES denunciasLocal(idDenuncia)
        )`,
        [],
        (tx, results) => {
          console.log("Tabla de imágenes de denuncias creada correctamente!");
        },
        error => {
          console.log("Error creando tabla de imágenes de denuncias: ", error);
        }
      );

      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS imagenesServiciosLocal (
          idImagen INTEGER PRIMARY KEY AUTOINCREMENT,
          datosImagen INTEGER,
          idServicio INTEGER,
          FOREIGN KEY (idServicio) REFERENCES serviciosLocal(idServicio)
        )`,
        [],
        (tx, results) => {
          console.log("Tabla de imágenes de servicios creada correctamente!");
        },
        error => {
          console.log("Error creando tabla de imágenes de servicios: ", error);
        }
      );
  });
};

// Función para insertar datos en la tabla 'reclamos'
export const crearReclamoVecino = (documentoVecino, legajoPersonal, calleSitio, numeroSitio, idDesperfecto, descripcion) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO reclamosLocal (documentoVecino, legajoPersonal, calleSitio, numeroSitio, idDesperfecto, descripcion)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [documentoVecino, legajoPersonal, calleSitio, numeroSitio, idDesperfecto, descripcion],
      (tx, results) => {
        console.log("Reclamo creado correctamente!");
      },
      error => {
        console.log("Error creando reclamo: ", error);
      }
    );
  });
};

// Función para insertar datos en la tabla 'reclamos'
export const crearReclamoPersonal = (documentoVecino, legajoPersonal, calleSitio, numeroSitio, idDesperfecto, descripcion) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO reclamosLocal (documentoVecino, legajoPersonal, calleSitio, numeroSitio, idDesperfecto, descripcion)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [documentoVecino, legajoPersonal, calleSitio, numeroSitio, idDesperfecto, descripcion],
        (tx, results) => {
          console.log("Reclamo creado correctamente!");
        },
        error => {
          console.log("Error creando reclamo: ", error);
        }
      );
    });
  };

  export const insertarImagenesReclamo = (datosImagen, idReclamo) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO imagenesReclamosLocal (datosImagen, idReclamo)
        VALUES (?, ?)`,
        [datosImagen, idReclamo],
        (tx, results) => {
          console.log("Imagen de reclamo subida correctamente!");
        },
        error => {
          console.log("Error subiendo imagen de reclamo: ", error);
        }
      );
    });
  };

  export const crearDenuncia = (documentoVecino, calleSitio, numeroSitio, descripcion, aceptoResponsabilidad) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO denunciasLocal (documentoVecino, calleSitio, numeroSitio, descripcion, aceptoResponsabilidad)
        VALUES (?, ?, ?, ?, ?)`,
        [documentoVecino, calleSitio, numeroSitio, descripcion, aceptoResponsabilidad],
        (tx, results) => {
          console.log("denuncia subida correctamente!");
        },
        error => {
          console.log("Error subiendo denuncia: ", error);
        }
      );
    });
  };

  export const insertarImagenesDenuncia = (datosImagen, idDenuncia) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO imagenesDenunciasLocal (datosImagen, idDenuncia)
        VALUES (?, ?)`,
        [datosImagen, idDenuncia],
        (tx, results) => {
          console.log("Imagen de denuncia subida correctamente!");
        },
        error => {
          console.log("Error subiendo imagen de denuncia: ", error);
        }
      );
    });
  };

  export const crearServicio = (documentoVecino, titulo, direccion, telefono, descripcion, idRubro, tipoServicio) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO serviciosLocal (documentoVecino, titulo, direccion, telefono, descripcion, idRubro, tipoServicio)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [documentoVecino, titulo, direccion, telefono, descripcion, idRubro, tipoServicio],
        (tx, results) => {
          console.log("Servicio subido correctamente!");
        },
        error => {
          console.log("Error subiendo servicio: ", error);
        }
      );
    });
  };

  export const insertarImagenesServicio = (datosImagen, idServicio) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO imagenesServiciosLocal (datosImagen, idServicio)
        VALUES (?, ?)`,
        [datosImagen, idServicio],
        (tx, results) => {
          console.log("Imagen de servicio subida correctamente!");
        },
        error => {
          console.log("Error subiendo imagen de servicio: ", error);
        }
      );
    });
  };


  useEffect(() => {
    crearTablas();
  }, [])
