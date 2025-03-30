import React from 'react'
import Cards from '../components/cards/Cards'

export default function Cards2() {

    let data =[
        {
          imgPro:"/assets/aloe-green_bdad.webp",
          title:"T-SHIRT WITH TAPE DETAILS",
          ret:"4.5",
          price:120,
          discount:30
        },
        {
          imgPro:"/assets/aloe-green_bdad.webp",
          title:"T-SHIRT WITH TAPE DETAILS",
          ret:"4.5",
          price:120,
          discount:10
        },
        {
          imgPro:"/assets/aloe-green_bdad.webp",
          title:"T-SHIRT WITH TAPE DETAILS",
          ret:"4.5",
          price:120,
          discount:0
        },
        {
          imgPro:"/assets/aloe-green_bdad.webp",
          title:"T-SHIRT WITH TAPE DETAILS",
          ret:"4.5",
          price:120,
          discount:0
        },
      ]
      


  return (
    <Cards data={data} title={"top selling"} border={false} button={true}/>
  )
}
