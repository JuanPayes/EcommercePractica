package org.example.ecommerse.exceptions;

public class ProductNotPurchasedException extends RuntimeException {
    public ProductNotPurchasedException(String message) {
        super(message);
    }
}
