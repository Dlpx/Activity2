class ProductManager{

    #allProducts
    #validProducts
    #error

    constructor() {
        this.#allProducts = []
        this.#validProducts = []
        this.#error = null
    }

    #idGenerator = () => (this.#allProducts.length === 0) ? 1 : this.#allProducts.length + 1
    
    #setError = ( { id, code, categoria, title, marca, precio, stock } ) => {

        //BUSCADOR DE REPETIDOS:
        const rep = this.#allProducts.find( prod => prod.code === code )

        // Validacion de campos
        if (rep != undefined) {
            this.#error = `ID: ${id}: Producto con CODIGO repetido`
        } else if (categoria === ''){
            this.#error = `ID: ${id}: falta CATEGORIA de producto`
        } else if (title === '') {
            this.#error = `ID: ${id}: falta NOMBRE de producto`
        } else if (marca === '') {
            this.#error = `ID: ${id}: falta MARCA de producto`
        } else if (precio === '') {
            this.#error = `ID: ${id}: falta PRECIO de producto`
        } else if (stock === '') {
            this.#error = `ID: ${id}: falta STOCK de producto`
        } 
    }
    
    addProduct = ( { code, categoria, nombre, marca, precio, stock } ) => {

        //Llamo a la funcion idGenerator para crear un ID y utilizarlo en el push y en el setError
        let id = this.#idGenerator()

        //Llamo a la funcion set una vez error para verificar que este todo bien
        this.#setError({id, code, categoria, title, marca, precio, stock})

        //Pusheo todos los productos (con y sin errores... asi puedo registrar de que producto es el error y en donde esta)
        this.#allProducts.push({
            error: this.#error,
            id: id, 
            code, 
            categoria, 
            title, 
            marca, 
            precio, 
            stock})

            this.#error = null
    }

    //Segun yo esta funcion no es tan util, ya que te da los productos con y sin errores.
    getAllProducts = () => this.#allProducts

    //Aca pusheo los items sin errores y los que tengan error solo lo informo, pero no los pongo completo.
    #pushValids = () => {
        this.#validProducts.push(this.#allProducts.map(prod => {
            if(prod.error != undefined) {
                return `Error en producto: ID: ${prod.id}. Error: ${prod.error}`
            } else {
                return prod
            }
        }))
    }

    //En esta funcion obtengo todos los productos validos que pushee anteriormente
    getValidProducts = () => {
        this.#pushValids()
        return this.#validProducts
    }

    //Funcion de encontrar productos por ID
    findProductByID = (id) => {
        const found = this.#allProducts.find(prod => prod.id === id)

        if(found){
            return found
        } else {
            return `Producto con ID:${id} NO ENCONTRADO`
        }
    }

    //Funcion para encontrar productos por categoria
    findProductsByCategory = (categoria) => {
        
        const prods = this.#allProducts.filter(prod => prod.categoria === categoria)

        if(prods.length > 0) {
            return prods
        } else {
            return `No se encontraro productos en la categoria ${categoria}.`
        }
    }
}


const addProduct = new ProductManager('./Users.json')


//Listado de productos hechos como objetos para poder manejarlos optimamente luego.
addProduct.addProduct({
    code: '1001',
    categoria: '',
    title: 'Detergente',
    marca: 'Mr. Musculo',
    precio: 3000,
    stock: 50
})
addProduct.addProduct({
    code: '1002',
    categoria: 'Higiene',
    title: 'Jabon de tocador',
    marca: 'Dove',
    precio: 1800,
    stock: 84
})
addProduct.addProduct({
    code: '1001',
    categoria: 'Cocina',
    title: 'Set 12 platos',
    marca: 'KitchenAid',
    precio: 30000,
    stock: 100
})
addProduct.addProduct({
    code: '1004',
    categoria: 'Autos',
    title: 'Shampoo para carros',
    marca: 'BMW',
    precio: 23000,
    stock: 28
})
addProduct.addProduct({
    code: '1005',
    categoria: 'Hogar',
    title: 'Florero',
    marca: 'Home',
    precio: '',
    stock: 300
})
addProduct.addProduct({
    code: '1006',
    categoria: 'Higiene',
    title: 'Papel Higienico',
    marca: 'Scott',
    precio: 7000,
    stock: 300
})


console.log('Todos los productos: ', addProduct.getAllProducts())       //Se ven todos los productos

console.log('Productos validos: ', addProduct.getValidProducts())       //Se ven solo los validos, de los erroneos solo da un informe

console.log('Product finder by ID: ', addProduct.findProductByID(8))    //Busca productos por id

console.log('Product finder by CATEGORY: ', addProduct.findProductsByCategory('Higiene'))       //Busca productos por Categoria
