const form_register=document.getElementById('form_register')
const form_code=document.getElementById('code')
const form_name=document.getElementById('name')
const form_stock=document.getElementById('stock')
const form_price=document.getElementById('price')
const body=document.getElementById('body')
const verification=document.getElementById('verification')
const cancel=document.getElementById('cancel')
const date_array=[]
const StoreGlobal=JSON.parse(localStorage.getItem('code'))

form_register.addEventListener('submit',(e)=>{
    e.preventDefault()
    if (verification.value==="") {
        AddDate()
    }else{
        Editar()
    }
    mostrar_date()
})

cancel.addEventListener("click",()=>{
    form_register.reset()
})

/***funcion agregar datos */
const AddDate=()=>{

    const date_input={
        code:form_code.value,
        name:form_name.value,
        stock:form_stock.value,
        price:form_price.value
    }

    if(localStorage.getItem('code')===null){
        date_array.push(date_input)
        localStorage.setItem('code',JSON.stringify(date_array))
    }else{
        //const new_array =JSON.parse(localStorage.getItem('code'))
        StoreGlobal.push(date_input)
        localStorage.setItem('code',JSON.stringify(StoreGlobal))
        form_register.reset()
    }
}

/****funcion mostrando datos */
const mostrar_date=()=>{
    //const datos_store=JSON.parse(localStorage.getItem('code'))
    body.innerHTML=''
   if (StoreGlobal===null) {
       console.log('nada que mostrar')
   }else{
    for(let index of StoreGlobal)
    {
        body.innerHTML+=`
        <tr onclick="CapturarDatos('${index.code}')">
        <td>${index.code}</td>
        <td>${index.name}</td>
        <td>${index.stock}</td>
        <td>${index.price}</td>
        <td class="text-warning text-center"><i class="fas fa-edit"></i></td>
        <td class="text-danger text-center" onclick="delet('${index.code}')"><i class="fas fa-trash-alt"></i></td>
        </tr>
        `
    }
   }
}

mostrar_date()


/***funcion eliminar datos :S */
const delet=(value)=>{
    //const DatoStore=JSON.parse(localStorage.getItem('code'))

    for (let index = 0; index < StoreGlobal.length; index++) {
      if (StoreGlobal[index].code===value) {
        StoreGlobal.splice(index, 1)
      }
      localStorage.setItem('code',JSON.stringify(StoreGlobal))
    }
    mostrar_date()
    form_register.reset()
}

/***funcion llenar datos en los type input :S */
const CapturarDatos=(value)=>{
   // const datoslocal=JSON.parse(localStorage.getItem('code'))

    for(let index of StoreGlobal){
        if (index.code===value) {
            form_code.value=index.code
            form_name.value=index.name
            form_stock.value=index.stock
            form_price.value=index.price
            verification.value=index.code
        }
    }
}

/****funcion editar datos :S */
const Editar=()=>{
    const newdate={
        code:form_code.value,
        name:form_name.value,
        stock:form_stock.value,
        price:form_price.value
    }

    //const localdatos=JSON.parse(localStorage.getItem('code'));

   for(let index=0;index<StoreGlobal.length;index++){
       if (StoreGlobal[index].code===newdate.code) {
           StoreGlobal[index]=newdate
       }
       localStorage.setItem('code',JSON.stringify(StoreGlobal))
       form_register.reset()
   }
   mostrar_date()

}

/****proceso filtracion de datos :S */
const txt_filtrar=document.getElementById('txt_filtrar')

txt_filtrar.addEventListener('keyup',(e)=>{
    //const FiltrarStore=JSON.parse(localStorage.getItem('code'))
    body.innerHTML=''
    for(let index of StoreGlobal)
    {
        const value=index.name.includes(e.target.value)
        
        if (value) {
            body.innerHTML+=`
            <tr onclick="CapturarDatos('${index.code}')">
            <td>${index.code}</td>
            <td>${index.name}</td>
            <td>${index.stock}</td>
            <td>${index.price}</td>
            <td class="text-warning text-center"><i class="fas fa-edit"></i></td>
            <td class="text-danger text-center"><i class="fas fa-onclick="delet('${index.code}')"><i class="fas fa-trash-alt"></i></td>
            </tr>
            `
        }
    }
})
