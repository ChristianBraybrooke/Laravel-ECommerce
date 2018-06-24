export default {

    normalise(price)
    {
        price = String(price);
        return parseFloat(price.replace(/,/g, ''));
    }

}
