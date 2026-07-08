-- V2__seed_super_admin.sql

INSERT INTO users (nombre, email, password, rol)
VALUES ('${SUPER_ADMIN_NOMBRE}', '${SUPER_ADMIN_EMAIL}', '${SUPER_ADMIN_PASSWORD_HASH}', 'ADMIN');