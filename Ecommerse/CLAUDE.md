# Proyecto: E-commerce API (portafolio)

## Stack
- Spring Boot 3, Java 17+
- PostgreSQL
- Lombok (solo @Getter/@Setter, nunca @Data en entidades)
- Records para DTOs

## Modelo de dominio
- Sin carrito persistido: la orden se crea directo con lista de items
- Entidades: User, Address, Category, Product, Order, OrderItem, Payment
- Category es entidad (no enum) para permitir CRUD administrable
- OrderStatus, PaymentMethod, PaymentStatus, Role son enums
- OrderItem guarda precioUnitario copiado del producto al momento de compra
- Payment es 1 a 1 con Order

## Decisiones de diseño
- Nunca confiar en precios que vengan del frontend
- Mappers son clases con métodos estáticos, no @Component
- El service (no el mapper) maneja lógica como encriptar password o crear OrderItem