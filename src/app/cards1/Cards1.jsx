import React from 'react'
import Cards from '../components/cards/Cards'

export default async function Cards1() {

let data =[]



  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/products?populate=*&pagination[pageSize]=4`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${process.env.TOKEN_SECRET}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    const result = await res.json(); 
    data = result.data
  } catch (error) {
    console.error("Error fetching alert data:", error);
  }


  return (
    <div>
        <Cards data={data} title={'NEW ARRIVALS'} border={true} button={true}/>
    </div>
  )
}
