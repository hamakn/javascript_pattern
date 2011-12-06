function Sale2(price) {
    this.price = price || 100;
    this.decorators_list = [];
}

Sale2.decorators = {};

Sale2.decorators.fedtax = {
    getPrice: function (price) {
        return price + price * 5 / 100; 
    }
};
Sale2.decorators.quebec = { 
    getPrice: function (price) {
        return price + price * 7.5 / 100; 
    }
};
Sale2.decorators.money = {
    getPrice: function (price) {
        return "$" + price.toFixed(2); 
    }
};

Sale2.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorator);
};

Sale2.prototype.getPrice = function () {
    var price = this.price,
        i,
        max = this.decorators_list.length, name;
    for (i = 0; i < max; i += 1) {
        name = this.decorators_list[i];
        price = Sale2.decorators[name].getPrice(price);
    }
    return price; 
};