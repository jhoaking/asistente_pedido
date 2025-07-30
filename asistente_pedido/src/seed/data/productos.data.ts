interface SeedComida{
    nombre : string
    descripcion : string
    price : number
    stock:number,
    categorias: string[]
}

interface SeedData {
    comidas : SeedComida[]
}



export const initialData: SeedData = {
  comidas: [
    {
      nombre: 'Pizza Margarita',
      descripcion: 'Pizza clásica con salsa de tomate, mozzarella y albahaca fresca.',
      price: 8.99,
      stock: 30,
      categorias: ['italiana', 'pizza', 'vegetariana']
    },
    {
      nombre: 'Hamburguesa Doble Queso',
      descripcion: 'Carne jugosa, doble queso cheddar, lechuga y salsa especial.',
      price: 7.5,
      stock: 40,
      categorias: ['americana', 'fast food', 'carne']
    },
    {
      nombre: 'Sushi Variado (8 piezas)',
      descripcion: 'Combinación de makis, nigiris y sashimis frescos.',
      price: 12.99,
      stock: 25,
      categorias: ['japonesa', 'sushi', 'pescado']
    },
    {
      nombre: 'Tacos al Pastor',
      descripcion: 'Tortillas de maíz con carne marinada, piña y cebolla.',
      price: 6.0,
      stock: 50,
      categorias: ['mexicana', 'tacos', 'cerdo']
    },
    {
      nombre: 'Ensalada César',
      descripcion: 'Lechuga romana, pollo a la parrilla, crutones y aderezo César.',
      price: 5.99,
      stock: 35,
      categorias: ['ensaladas', 'ligero', 'pollo']
    },
    {
      nombre: 'Pollo a la Brasa',
      descripcion: 'Medio pollo sazonado con especias, acompañado de papas.',
      price: 9.5,
      stock: 20,
      categorias: ['latinoamericana', 'pollo', 'comida rápida']
    },
    {
      nombre: 'Ramen de Cerdo',
      descripcion: 'Caldo concentrado, fideos, huevo cocido y panceta de cerdo.',
      price: 10.99,
      stock: 15,
      categorias: ['japonesa', 'ramen', 'caliente']
    },
    {
      nombre: 'Arepas Rellenas',
      descripcion: 'Arepas de maíz rellenas con queso y pernil.',
      price: 4.75,
      stock: 40,
      categorias: ['venezolana', 'maíz', 'desayuno']
    },
    {
      nombre: 'Empanadas de Carne (3 unidades)',
      descripcion: 'Masa crujiente rellena de carne molida sazonada.',
      price: 3.99,
      stock: 60,
      categorias: ['latinoamericana', 'fritura', 'snack']
    },
    {
      nombre: 'Ceviche de Camarón',
      descripcion: 'Camarones marinados en limón con cebolla, tomate y cilantro.',
      price: 11.5,
      stock: 18,
      categorias: ['mariscos', 'peruana', 'frío']
    },
    {
      nombre: 'Lasagna de Carne',
      descripcion: 'Capas de pasta con salsa boloñesa, bechamel y queso gratinado.',
      price: 9.25,
      stock: 22,
      categorias: ['italiana', 'pasta', 'carne']
    },
    {
      nombre: 'Tarta de Queso',
      descripcion: 'Postre cremoso con base de galleta y coulis de frutos rojos.',
      price: 4.25,
      stock: 30,
      categorias: ['postres', 'dulce', 'vegetariana']
    },
    {
      nombre: 'Burrito de Pollo',
      descripcion: 'Tortilla rellena de arroz, frijoles, pollo y queso.',
      price: 6.75,
      stock: 35,
      categorias: ['mexicana', 'wraps', 'pollo']
    },
    {
      nombre: 'Pan con Chicharrón',
      descripcion: 'Pan francés con chicharrón, camote frito y salsa criolla.',
      price: 5.99,
      stock: 25,
      categorias: ['peruana', 'sándwich', 'cerdo']
    },
    {
      nombre: 'Falafel con Hummus',
      descripcion: 'Croquetas de garbanzo servidas con hummus y pan pita.',
      price: 7.25,
      stock: 28,
      categorias: ['vegana', 'mediterránea', 'garbanzo']
    },
    {
      nombre: 'Paella de Mariscos',
      descripcion: 'Arroz cocido con calamares, camarones, mejillones y azafrán.',
      price: 13.5,
      stock: 12,
      categorias: ['española', 'arroz', 'mariscos']
    },
    {
      nombre: 'Croquetas de Pollo (6 unidades)',
      descripcion: 'Crujientes por fuera y cremosas por dentro.',
      price: 4.75,
      stock: 45,
      categorias: ['aperitivo', 'pollo', 'snack']
    },
    {
      nombre: 'Helado Artesanal de Vainilla',
      descripcion: 'Helado casero hecho con vainilla natural y leche entera.',
      price: 3.5,
      stock: 50,
      categorias: ['postres', 'frío', 'dulce']
    },
    {
      nombre: 'Tostadas Francesas',
      descripcion: 'Pan bañado en huevo y leche, dorado a la perfección.',
      price: 5.5,
      stock: 30,
      categorias: ['desayuno', 'dulce']
    },
    {
      nombre: 'Sopa de Lentejas',
      descripcion: 'Sopa casera con lentejas, zanahoria, papa y especias.',
      price: 6.0,
      stock: 20,
      categorias: ['sopas', 'vegetariana', 'caliente']
    }
  ]
};
