function mapify(o, f){
    var temp = new o.constructor();
    for(let i in o) {
        if(o.hasOwnProperty(i)) {
            temp[i] = f(o[i], i, o)
        }
    }
    return temp;
}
