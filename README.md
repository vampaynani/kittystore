# Pet Store

[Work in progress]

## Tareas
### Procedimientos
Evaluar si el código actual cumple con los estándares básicos de programación por procedimientos: ¿Es claro, legible y tiene funciones que se dedican a procesos específicos?
#### Aproximación 1:
- Identificar que proceso debe llevarse a través de que trigger.
  - Cuando se clickea sobre un gatito:
    - a) Obtener sus datos a través del filtrado en la BD por el ID. 
    - b) Si ya se ha seleccionado este gato antes, solo se aumenta el contador de elementos comprados del gato en la lista de orden.
  - Cuando se abre el carrito de compras:
    - a) Obtener todos los elementos que encuentran en la lista de compras.
    - b) Calcular para cada gato el precio actual con respecto a los items seleccionados.
    - c) Calcular la suma total
    - d) Imprimir la cantidad de items seleccionados así como la suma total de los gatos comprados. 
  - Al cerrar el carrito de compras:
    - a) borrar los elementos de la lista en el  html para que no se sobre escriban.
  - 
    ````javascript
        agregarAtributos();
        //se hace click
        obtenerData();
        existeUnaOrdenPrevia();
        guardarItemsEnLaOrden();
        // se abre el carrito
        crearElementosCarrito();
        calcularPrecio();
        //calcular total
        calcularPrecioTotal();
        renderCarrito();
    ````

### OOP
* Añadir un objeto _Cart_ que te permita agregar, quitar o modificar los objetos seleccionados por el usuario.
* Al dar click el botón comprar, el modal que aparece debe contener los datos de la compra(listado de items y precio total + iva) estos datos deben provenir del nuevo objeto _Cart_.
* Evaluar si los listeners y las modificaciones al DOM merecen ser parte de un objeto. De ser así implementarlo con sus respectivos métodos y propiedades.
* Evaluar si cada uno de los productos merece ser convertido en un objeto, si es así deberíamos usar un factory? Herencia prototipal o quizás hacer una composicion?

```javascript
const Cart =  () => {
     let order = [];
     return {
               this.addItem: function(gatito){
                         if(gatito existe en this.order){

                        gatito.cantidad += 1;
                        gatito.precioTotal = gatito.price * gatito.cantidad;

                         }else{
                        this.order.push({gatito + estas propiedades
                        gatito.cantidad,gatito.precioTotal}
                        }
               },
               this.removeItem: function(gatito){

                         if(gatito existe en this.order){

               gatito.cantidad -= 1;
               gatito.precioTotal -= (gatito.price * gatito.cantidad);


                         }else{
                        this.order.push({gatito + estas propiedades
                        gatito.cantidad,gatito.precioTotal}
                        }
               },
               this.printCart: function(){}
          }
}

var carrito = new Cart();
carrito.addItem(gatito) //Guardar el item en el carrito, en la orden.
```

### Programación Funcional
* De los métodos antes desarrollados, ¿cuál de ellos podría tener una aproximación funcional? Recuerda que esta aproximación debe tomar en cuenta inmutabilidad, funciones puras y predecibles.
* ¿Podríamos y/o deberíamos modificar todos nuestros objetos para implementar solamente FP?
