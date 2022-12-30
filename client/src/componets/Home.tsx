

import Product from './Product';
function Home() {


   return (
      <div
         className='animate'>
         <div className="Slider">
            
               <div className="slider">
                  <img src={require( "./Photo/reklama.png")} alt="" />
               </div>
               
           
         </div >
         <div className='products_home'>
            <Product/>
         </div>
         


       
      </div >
   )
}


export default Home