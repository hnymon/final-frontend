class CartItemDto {
    constructor(isbn, count, title, salePrice, thumbnail) {
        this.isbn = isbn;
        this.title = title;
        this.salePrice = salePrice;
        this.thumbnail = thumbnail;
        this.count = count;
    }
}

export default CartItemDto;