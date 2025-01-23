import React from 'react'
import { CiPizza } from "react-icons/ci";

const Shop = () => {
  return (
    <section className='h-full w-full'>
        <div className='cat-names mt-16 flex flex-row justify-between px-8'>
            <div>
                <CiPizza className='w-36 h-36'/>
            </div>
        </div>
    </section>
  )
}

export default Shop;