-- V1__crear_esquema_inicial.sql

CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       nombre VARCHAR(100) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       rol VARCHAR(20) NOT NULL
);

CREATE TABLE addresses (
                           id BIGSERIAL PRIMARY KEY,
                           calle VARCHAR(255) NOT NULL,
                           ciudad VARCHAR(100) NOT NULL,
                           referencia VARCHAR(255),
                           es_principal BOOLEAN NOT NULL DEFAULT FALSE,
                           usuario_id BIGINT NOT NULL REFERENCES users(id)
);

CREATE TABLE categories (
                            id BIGSERIAL PRIMARY KEY,
                            nombre VARCHAR(100) NOT NULL UNIQUE,
                            descripcion VARCHAR(500)
);

CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          nombre VARCHAR(255) NOT NULL,
                          descripcion VARCHAR(1000),
                          precio NUMERIC(10,2) NOT NULL,
                          stock INTEGER NOT NULL,
                          categoria_id BIGINT NOT NULL REFERENCES categories(id)
);

CREATE TABLE orders (
                        id BIGSERIAL PRIMARY KEY,
                        usuario_id BIGINT NOT NULL REFERENCES users(id),
                        direccion_id BIGINT NOT NULL REFERENCES addresses(id),
                        estado VARCHAR(20) NOT NULL,
                        total NUMERIC(10,2) NOT NULL,
                        fecha TIMESTAMP NOT NULL
);

CREATE TABLE order_items (
                             id BIGSERIAL PRIMARY KEY,
                             orden_id BIGINT NOT NULL REFERENCES orders(id),
                             producto_id BIGINT NOT NULL REFERENCES products(id),
                             cantidad INTEGER NOT NULL,
                             precio_unitario NUMERIC(10,2) NOT NULL
);

CREATE TABLE payments (
                          id BIGSERIAL PRIMARY KEY,
                          orden_id BIGINT NOT NULL UNIQUE REFERENCES orders(id),
                          monto NUMERIC(10,2) NOT NULL,
                          metodo VARCHAR(20) NOT NULL,
                          estado VARCHAR(20) NOT NULL,
                          fecha TIMESTAMP NOT NULL
);