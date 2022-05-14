const d=document,
 ls=localStorage,
 btnHamburguer=d.querySelector(".btnHamburguer i"),
 menu=d.querySelector(".menu_header"),
 link=d.querySelectorAll(".menu_header a"),
 secciones=d.querySelectorAll(".contenedor section"),
 buttons=d.querySelectorAll(".producto .icono"),
 listadoCompras=d.querySelector(".compra_listado"),
 pago=d.querySelector("#pago");
let carrito=[];
class Compra{
    constructor(titulo,precio,imagen,cantidad){
      this.titulo=titulo;
      this.imagen=imagen;	
      this.precio=precio;
      this.cantidad=cantidad;
    }
}

class UI{
 ActualizarCompra(titulo,cantidad){
  carrito.forEach(compra=>{
    if(compra.titulo===titulo){
      compra.cantidad=Number(cantidad);
      this.pagoFinal();
    }
  })
  console.log(carrito);
 }

 
 EliminarCompra(titulo){
  carrito.forEach((compra,index)=>{
    if(compra.titulo===titulo){
      carrito.splice(index,1)
      this.pagoFinal();
    }
  })
 }


 agregarCompra(nuevaCompra){

  if(carrito.some(carrito=>carrito.titulo===nuevaCompra.titulo)){
    carrito.forEach((compra)=>{
           if(compra.titulo===nuevaCompra.titulo){
             compra.cantidad=compra.cantidad+1;
             this.ActualizarCarrito();
             console.log(carrito);
           }
         }); 
    return null;
  }

      carrito.push(nuevaCompra);
      this.ActualizarCarrito();
      console.log(carrito);

    }

      ActualizarCarrito=()=>{
        let contenido="";
        carrito.forEach(compra=>{
            contenido+=`
            <div id="producto">
            <div id="titulo"><p>${compra.titulo}</p></div>
            <div id="imagen"> <img src=".${compra.imagen}" alt="" /></div>
            <div id="precio">
             S/ <p>${compra.precio}</p>
            </div>
            <div id="cantidad">
            <input type="number" value="${compra.cantidad}" id=""/>
            </div>
            <button class="eliminar"> <i class="fa-solid fa-circle-xmark icono"></i> </button>
            </div>
            ` 
          })
          listadoCompras.innerHTML=contenido;
          this.pagoFinal();
      }

    pagoFinal(){
      let Monto=0;
      carrito.forEach(compras=>{Monto += compras.cantidad * compras.precio})
      pago.innerHTML=Monto;
    }
}
      d.addEventListener("change",(e)=>{
        if(e.target.matches("#cantidad input")){
          let newCantidad=e.target.value;
          if(newCantidad<1){
            newCantidad=1;
            e.target.value=newCantidad;
          }
          let title=e.target.closest("#producto").querySelector("#titulo").textContent;
          const ui= new UI();
          ui.ActualizarCompra(title,newCantidad)
        }
      })

      d.addEventListener("click",(e)=>{
          if(e.target.className === btnHamburguer.className){
              menu.classList.toggle("active");
          }else{
            menu.classList.remove("active");
          }
          if(e.target.matches(".eliminar .icono")){
            const ui= new UI();
            producto=e.target.closest("#producto");
            let titulo=producto.querySelector("#titulo").textContent;
            producto.remove(producto);
            ui.EliminarCompra(titulo);
          }
          
      })


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

        link.forEach((element,index)=>{
          element.addEventListener("click",()=>{
              link.forEach(element=>element.classList.remove("active"));
              secciones.forEach(element=>element.classList.remove("mostrarSeccion"));
              element.classList.add("active");
              secciones[index].classList.add("mostrarSeccion");
          })
        })

