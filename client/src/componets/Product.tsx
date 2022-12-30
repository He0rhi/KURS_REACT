import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from '../store/store';
import { AddBasket, GetProducts } from './../store/CreateProduct';
import Footer from './Footer';
const Product: FC = () => {

   const { product, loading } = useAppSelector(state => state.product);
   const { user } = useAppSelector(state => state.auth);
   const [products, setProducts] = useState<any>(product);
   const [sortPrice, setSortPrice] = useState<string>("");
   const [sortYear, setSortYear] = useState<string>("")
   const [sortSale, setSortSale] = useState<string>("")
   const [research, setResearch] = useState<string>("");
   const [filter, setFilter] = useState<any>(product)
   const [option, setOption] = useState<any[]>(product);
   const [testColor, setTestColor] = useState<any[]>();
   const [loadingState, setLoadingState] = useState<boolean>(loading);
   const [unique_property, setUnique_property] = useState<any[]>();
   const [currentPage, setCurrentPage] = useState<number>(1);
   const [PageNumbers, setPageNumbers] = useState<number[]>([]);
   const [postsPerPage] = useState<number>(10);
   const dispatch = useAppDispatch()

   useEffect(() => {

      const pages = [];
      for (let i = 1; i <= Math.ceil(option.length / postsPerPage); i++) {
         pages.push(i);
      }
      setPageNumbers(pages);
      const New = option.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
      setProducts(New);

   }, [currentPage, filter]);

   useEffect(() => {

      if (filter === products) {

         setOption(product)
         setFilter(product)
         setProducts(product.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage));
         setCurrentPage(1)
         paginate(1)
      }

   }, [filter]);

  

   useEffect(() => {
      window.scrollTo(0, 0);
      dispatch(GetProducts())
      setProducts(product)
      setFilter(product)
      setLoadingState(loading)

   }, []);

   useEffect(() => {
      setProducts(product)
      setFilter(product)
      setLoadingState(loading)
   }, [product])

   useEffect(() => {
      if (unique_property?.map(item => item.checked).includes(true) && testColor?.map(item => item.checked).includes(true)) {
         const productNew =
            option.map((item: any): any => {
               if (unique_property?.filter(item => item.checked).map(item => item.unique_property).includes(item.unique_property) && testColor.filter(item => item.checked).map(item => item.color).includes(item.color)) {
                  return item;
               }

            }
            )

         const product = productNew.filter((item: any) => item !== undefined);

         setProducts(product)

      } else if (unique_property?.map(item => item.checked).includes(true)) {
         const productNew =

            option.map((item: any): any => {
               if (unique_property?.filter(item => item.checked).map(item => item.unique_property).includes(item.unique_property)) {
                  return item;
               }
            }
            )
         const product = productNew.filter((item: any) => item !== undefined);

         setProducts(product)

      } else if (testColor?.map(item => item.checked).includes(true)) {
         const productNew =

            option.map((item: any): any => {
               if (testColor.filter(item => item.checked).map(item => item.color).includes(item.color)) {
                  return item;
               }
            }
            )

         const product = productNew.filter((item: any) => item !== undefined);

         setProducts(product)


      } else {
         setProducts(option)

      }
   }, [unique_property, testColor])

   const paginate = (pageNumber: number) => {
      window.scrollTo(0, 0);
      if (pageNumber === currentPage) return
      const indexOfLastPage = pageNumber * postsPerPage;
      const indexOfFirstPage = indexOfLastPage - postsPerPage;
      const currentPages = products.slice(indexOfFirstPage, indexOfLastPage);
      setCurrentPage(pageNumber);
      setProducts(currentPages);
   }

   const handleChangePrice = (value: string) => {
      setSortPrice(value)
      setSortSale("Sale")
      const result = "price"
      if (value === "ascending") {
         if (filter == "Note"
            || filter == "Clocks"
            || filter == "Phone"

         ) {

            const product = [...products].sort((a: any, b: any) => a[result] - b[result]);
            setProducts(product)

         }
         else {
            setCurrentPage(1)
            const testproduct = option.map((item) => {
               if (item.sale) {
                  return { ...item, price: Math.round(item.price - item.price * item.sale / 100) }
               }
               return item

            })


            const product = [...testproduct].sort((a: any, b: any) => a[result] - b[result]);
            const productNew = product.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
            setProducts(productNew)
            setOption(product)

            setCurrentPage(1)
         }


      }
      else if (value === "descending") {
         if (filter == "Note"
            || filter == "Clocks"
            || filter == "Phone"

         ) {
            const product = [...products].sort((a: any, b: any) => b[result] - a[result]);
            setProducts(product)


         }
         else {
            const testproduct = option.map((item) => {
               if (item.sale) {
                  return { ...item, price: Math.round(item.price - item.price * item.sale / 100) }
               }
               return item

            })

            const product = [...testproduct].sort((a: any, b: any) => b[result] - a[result]);
            const productNew = product.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
            setProducts(productNew)
            setOption(product)
            setCurrentPage(1)
         }
      }
      else {
         setProducts(products)

      }
   }

   

   const handleChangeSale = (value: string) => {
      setSortSale(value)
      setSortPrice("Price")
      const result = "sale"
      if (value === "ascending") {
         if (filter == "Note"
            || filter == "Clocks"
            || filter == "Phone"

         ) {
            const product = [...products].sort((a: any, b: any) => a[result] - b[result]);
            setProducts(product)

         }
         else {
            const product = [...option].sort((a: any, b: any) => a[result] - b[result]);
            const productNew = product.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
            setProducts(productNew)
            setOption(product)
            setCurrentPage(1)
         }


      }
      else if (value === "descending") {
         if (filter == "Note"
            || filter == "Clocks"
            || filter == "Phone"

         ) {
            const product = [...products].sort((a: any, b: any) => b[result] - a[result]);
            setProducts(product)

         }
         else {
            const product = [...option].sort((a: any, b: any) => b[result] - a[result]);
            const productNew = product.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
            setProducts(productNew)
            setOption(product)
            setCurrentPage(1)
         }
      }
      else {
         setProducts(products)
      }
   }

   const Filter = (valueOfFilter: string | any) => {
      setFilter(valueOfFilter)
      Unique_propertyForFilter(valueOfFilter)
      ColorFirFilter(valueOfFilter)

      if (valueOfFilter == products) {
         setSortPrice("");
         setSortYear("");
         setSortSale("");
         setResearch("")
         setUnique_property(undefined)
         setTestColor(undefined)

      }
      else {
         const NewDate = product.filter((item: any) => item.category === valueOfFilter);
         setProducts(NewDate)
         setOption(NewDate);
         setSortPrice("");
         setSortYear("");
         setSortSale("");
         setResearch("")
      }

   }

   const ResetAllFilters = () => {
      setSortPrice("");
      setSortYear("");
      setSortSale("");
      setResearch("")
      setCurrentPage(1)
      setProducts(products)
      setOption(product)
      Filter(products)

   }

   const AddToBasket = (item: any) => {
     
         const basket = {
            id_product: Number(item.id_product),
            id_person: Number(user?.id_person),
            count: item.count
         }
         dispatch(AddBasket(basket))
         toast.success(`Товар ${item.name} добавлен в корзину`)
      
   }

   const Unique_propertyForFilter = (category: string) => {
      const ArrayOfPrtoperty = product.filter((item: any) => item.category === category).map((item: any) => {
         return item
      });
      const Sets = Array.from(new Set(ArrayOfPrtoperty.map((item: any) => item.unique_property)))
      const ArrayOfUniqueProperty = Sets.map((item: any) => {
         const result = {
            unique_property: item.toString(),
            checked: false
         }
         return result
      });
      setUnique_property(ArrayOfUniqueProperty)

   }

   const handlerChangeCheckboxUniqueProperty = (index: number) => {
      setUnique_property(
         unique_property?.map((topping, currentIndex) =>
            currentIndex === index
               ? { ...topping, checked: !topping.checked }
               : topping
         )
      )
   }

   const ColorFirFilter = (category: string) => {
      const ArrayOfPrtoperty = product.filter((item: any) => item.category === category).map((item: any) => {
         return item
      });

      const Sets = Array.from(new Set(ArrayOfPrtoperty.map((item: any) => item.color)))

      const ArrayOfUniqueProperty = Sets.map((item: any) => {
         const result = {
            color: item,
            checked: false
         }
         return result
      });
      console.log(ArrayOfUniqueProperty)
      setTestColor(ArrayOfUniqueProperty)
   }

   const handlerChangeColor = (index: number) => {
      setTestColor(
         testColor?.map((topping, currentIndex) =>
            currentIndex === index
               ? { ...topping, checked: !topping.checked }
               : topping
         )
      )
   }

   return (
      <div
         className='animate'>
         <div className="wrapper">
            
            <div className="products__input">

               <div className="input">
                 
               <div className="sort">
                  <h3>Отсортировать по</h3>
                  <div className="selects">
                     <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangePrice(e.target.value)}
                        value={sortPrice}>
                        <option value="">Цене</option>
                        <option value="ascending">Дешевые</option>
                        <option value="descending">Дорогие</option>
                     </select>
                     
                     <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChangeSale(e.target.value)}
                        value={sortSale}>
                        <option>Скидке</option>
                        <option value="ascending">Низкие</option>
                        <option value="descending">Высокие</option>
                     </select>
                  </div>
               </div>
                  <h3>Категории</h3>
                  <div className="categors">
                     <button style={filter !== "Phone" && filter !== "Note" && filter !== "Clocks"

                        ? { background: "linear-gradient(360deg, #790000 0%, #000000 100%)", color: "white" } : {}}
                        onClick={() => Filter(products)} ><p id='categ'>Все</p></button>
                     <button style={filter === "Phone" ? { background: "linear-gradient(360deg, #790000 0%, #000000 100%)", color: "white" } : {}}
                        onClick={() => Filter("Phone")} ><p id='categ'>Телефоны</p></button>
                     <button
                        style={filter === "Note" ? { background: "linear-gradient(360deg, #790000 0%, #000000 100%)", color: "white" } : {}}
                        onClick={() => Filter("Note")} ><p id='categ'>Ноутбуки</p></button>
                     <button
                        style={filter === "Clocks" ? { background: "linear-gradient(360deg, #790000 0%, #000000 100%)", color: "white" } : {}}
                        onClick={() => Filter("Clocks")} ><p id='categ'>Часы</p></button>
                  </div>
                  {
                     (testColor === undefined || testColor.length === 0) ?
                        <></> :
                        <h2>Цвет</h2>
                  }
                  <div className="colors">
                     {testColor?.map((index, i) => {
                        return (
                           <p 
                           onChange={() => handlerChangeColor(i)}   className={testColor[i].checked ? 'check' : 'checked'} 
                           >
                              <input type="checkbox"
                                 id={index.color}
                                 key={i}
                                 />
                              <label htmlFor={index.color} >
                                 <p className='cursore' id='categ'

                                 >{index.color}
                                 </p></label>
                           </p>
                        );
                     })}
                  </div>

                  <div className="unique_property">
                     {
                        (unique_property === undefined || unique_property.length === 0) ?
                           <></> :
                           <h2>Марка</h2>
                     }
                     <div className="values">
                        {
                           unique_property?.map((item: any, i: number) => {
                              return (
                                 <p className={item.checked ? 'check' : 'checked'} 
                                    key={i}
                                 >
                                    <input type="checkbox"
                                       id={item.unique_property}
                                       checked={item.checked}
                                       className={item.checked ? 'check' : 'checked'} 
                                       onChange={() => handlerChangeCheckboxUniqueProperty(i)} />
                                    <label htmlFor={item.unique_property} >
                                       <p   className='cursore' id='categ'
                                       >  {item.unique_property}
                                       </p></label>
                                 </p>
                              );
                           })
                        }
                     </div>
                  </div>
                  <button className='reset'
                     onClick={ResetAllFilters} >
                     Вернуть фильтры
                  </button>
               </div>
               <div className="products">

                  {products.length === 0 && (
                     <div className="no_products">
                        <h1>Извините, техническая ошибка
                        </h1>
                     </div>
                  )}
                  {loadingState ? (
                     <div className="loading">
                        <h1>Подождите</h1>
                     </div>
                  ) :
                     products?.map((item: any, index: number) => {
                        const { id_product, img, name } = item;
                        return (
                           <div className="product" key={index}>
                              <div className="saleblocks">
                              {item.sale !== 0 ? (
                                 <div className="sale">
                                    <p className="newprice">
                                       {
                                          item.price
                                       }$
                                    </p>
                                    <p className="old_price">

                                       {
                                          Math.round(item.price + (item.price * item.sale) / 100)
                                       }$

                                    </p>


                                 </div>
                              ) :
                                 <div className="sale">
                                    {item.price}$
                                 </div>

                              }
                              
                                 <div className="blocks">
                                    <div className="block">
                                       <p onClick={() => AddToBasket(item)}> <img id='buy' src={require("./Photo/buy.png")} alt="" /></p>
                                    </div>
                                    
                                 </div></div>
                                 <Link to={`/product/:${id_product}`}>
  <p id='namecard' >{name}</p></Link>
  <Link to={`/product/:${id_product}`}>
  <img src={img} alt={item.category} /></Link>
                              
                           </div>
                        )
                     }
                     )
                  }


               </div>

            </div>
            {
               filter == "Phone" || filter == "Note" || filter == "Clocks"
                  ?
                  <></>
                  :
                  <> <div className="pagination">
                     <ul className="pagination__list">
                        {PageNumbers?.map((number: number) => (
                           <li key={number} className={currentPage === number ? 'active' : ''}
                              onClick={() => paginate(number)}>
                              {number}
                           </li>
                        ))}
                     </ul>
                  </div></>

            }
         </div >








         <Footer />
      </div >
   )
}
export default Product