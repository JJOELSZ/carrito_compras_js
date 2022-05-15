console.log("AAAAAAAAA");

const d=document,
 ls=localStorage,
 btnHamburguer=d.querySelector(".btnHamburguer i"),
 menu=d.querySelector(".menu_header"),
 link=d.querySelectorAll(".menu_header a"),
 secciones=d.querySelectorAll(".contenedor section"),
 buttons=d.querySelectorAll(".producto .icono"),
 listadoCompras=d.querySelector(".compra_listado"),
 pago=d.querySelector("#pago");

/** Array carrito de compras*/
let carrito=[];

/** Clase Compra */
class Compra{
    constructor(titulo,precio,imagen,cantidad){
      this.titulo=titulo;
      this.imagen=imagen;	
      this.precio=precio;
      this.cantidad=cantidad;
    }
}
/** Clase UI inferfaz de usuario */
class UI{
  MostrarMensaje(mensaje,bg){
    let contenedor=d.createElement("div");
    contenedor.classList.add("message");
    contenedor.classList.add(`${bg}`);
    contenedor.innerHTML=mensaje;
    d.querySelector(".contenedor").append(contenedor);
    setTimeout(()=>{
      contenedor.remove();
    },1500)
  }
  /** Metodo para actualizar una compra */
 ActualizarCompra(titulo,cantidad){
  carrito.forEach(compra=>{
    if(compra.titulo===titulo){
      compra.cantidad=Number(cantidad);
      this.pagoFinal();
    }
  })
 }
  /** Metodo para eliminar una compra */
 EliminarCompra(titulo){
  let mensaje="Eliminado";
  let bg="delete";
  carrito.forEach((compra,index)=>{
    if(compra.titulo===titulo){
      carrito.splice(index,1)
      this.MostrarMensaje(mensaje,bg);
      this.pagoFinal();
    }
  })
 }
  /** Metodo para agregar una compra */
 agregarCompra(nuevaCompra){
   let mensaje="Añadido";
   let bg="add";

  if(carrito.some(carrito=>carrito.titulo===nuevaCompra.titulo)){
    carrito.forEach((compra)=>{
           if(compra.titulo===nuevaCompra.titulo){
             compra.cantidad=compra.cantidad+1;
             this.MostrarMensaje(mensaje,bg);
             this.ActualizarCarrito();
           }
         }); 
    return null;
  }
      carrito.push(nuevaCompra);
      this.ActualizarCarrito();
      this.MostrarMensaje(mensaje,bg);

    }

   /** Metodo para actualizar el carrito */
    ActualizarCarrito=()=>{
        let contenido="";
        carrito.forEach(compra=>{
            contenido+=`
            <div class="producto-select">
            <div class="producto_titulo"><p>${compra.titulo}</p></div>
            <div class="producto_imagen"> <img src=".${compra.imagen}" alt="" /></div>
            <div class="producto_precio">
             S/ <p>${compra.precio}</p>
            </div>
            <div class="producto_cantidad">
            <input type="number" value="${compra.cantidad}" id=""/>
            </div>
            <div class="producto_eliminar">
            <button class="eliminar"> <i class="fa-solid fa-circle-xmark icono"></i> </button>
            </div>
            </div>
            ` 
          })
          listadoCompras.innerHTML=contenido;
          this.pagoFinal();
      }
   /** Metodo para el calculo Automatico de pago */
    pagoFinal(){
      let Monto=0;
      carrito.forEach(compras=>{Monto += compras.cantidad * compras.precio})
      pago.innerHTML=Monto;
    }
}
       /** Metodo para actualizar el carrito al modificar la cantidad de una compra */
      d.addEventListener("change",(e)=>{
        if(e.target.matches(".producto_cantidad input")){
          let newCantidad=e.target.value;
          if(newCantidad<1){
            newCantidad=1;
            e.target.value=newCantidad;
          }
          let title=e.target.closest(".producto-select").querySelector(".producto_titulo p").textContent;
          console.log(title);
          const ui= new UI();
          ui.ActualizarCompra(title,newCantidad)
        }
      })
     
      d.addEventListener("click",(e)=>{
          /** Metodo para Mostrar el menu */
          if(e.target.className === btnHamburguer.className){
              menu.classList.toggle("active");
          }else{
            menu.classList.remove("active");
          }

          /** Metodo para elimimar una compra*/
          if(e.target.matches(".eliminar .icono")){
            const ui= new UI();
            producto=e.target.closest(".producto-select");
            let titulo=producto.querySelector(".producto_titulo p").textContent;
            producto.remove(producto);
            ui.EliminarCompra(titulo);
          }
          
      })

      /** Evento que agrega una nueva compra*/
      buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            let producto =button.closest(".producto"),
            titulo=producto.querySelector("h2").textContent,
            precio=producto.querySelector(".precio").textContent,
            imagen=producto.querySelector("img").getAttribute("src");
            const compra=new Compra (titulo,precio,imagen,1)
            const ui= new UI();
            ui.agregarCompra(compra);
        })
      });

       /** Metodo para mostrar el click seleccionado */ 
        link.forEach((element,index)=>{
          element.addEventListener("click",()=>{
              link.forEach(element=>element.classList.remove("active"));
              secciones.forEach(element=>element.classList.remove("mostrarSeccion"));
              element.classList.add("active");
              secciones[index].classList.add("mostrarSeccion");
          })
        })

