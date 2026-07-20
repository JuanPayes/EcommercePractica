-- V3__crear_tabla_reviews.sql

CREATE TABLE reviews (
                         id BIGSERIAL PRIMARY KEY,
                         producto_id BIGINT NOT NULL REFERENCES products(id),
                         usuario_id BIGINT NOT NULL REFERENCES users(id),
                         puntuacion INTEGER NOT NULL CHECK (puntuacion BETWEEN 1 AND 5),
                         comentario VARCHAR(1000),
                         fecha TIMESTAMP NOT NULL,
                         CONSTRAINT uk_review_usuario_producto UNIQUE (usuario_id, producto_id)
);