import React from "react";
import axios from "axios";
import { useState, useReducer, useEffect } from "react";

import { useProduct } from "../../Contexter/ProductContext";
import ProductListing from "./ProductListing"

export function FilteredData(){
    const { ItemsInProduct, SetItemsInProduct } = useProduct();
    const [accordian,setAccordian] = useState("none");
    
    useEffect(() => {
        (async function () {
          const { data } = await axios.get(
            "https://ecommercedata.saurabhsharma11.repl.co/v1/productData"
          );
          SetItemsInProduct(data);
        })();
      },[]);

    //filtering data
    const [
        { showInventoryAll, showFastDeliveryOnly, sortBy },
        dispatch
    ] = useReducer(
        function reducer(state, action) {
        switch (action.type) {
            case "TOGGLE_INVENTORY":
            return (state = {
                ...state,
                showInventoryAll: !state.showInventoryAll
            });

            case "TOGGLE_DELIVERY":
            return (state = {
                ...state,
                showFastDeliveryOnly: !state.showFastDeliveryOnly
            });
            case "SORT":
            return {
                ...state,
                sortBy: action.payload
            };
            default:
            return state;
        }
        },
        {
        showInventoryAll: true,
        showFastDeliveryOnly: false,
        sortBy: null
        }
    );

    function getSortedData(productList, sortBy) {
        if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
        return productList.sort((a, b) => b["price"] - a["price"]);
        }

        if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
        return productList.sort((a, b) => a["price"] - b["price"]);
        }
        return productList;
    }

    function getFilteredData(
        productList,
        { showFastDeliveryOnly, showInventoryAll }
    ) {
        return productList
        .filter(({ fastDelivery }) =>
            showFastDeliveryOnly ? fastDelivery : true
        )
        .filter(({ inStock }) => (showInventoryAll ? true : inStock));
    }

    const sortedData = getSortedData(ItemsInProduct, sortBy);//data
    const filteredData = getFilteredData(sortedData, {
        showFastDeliveryOnly,
        showInventoryAll
    });

    function accordianViewer(){
        if(accordian === "block"){
        setAccordian("none")
        } else {
        setAccordian("block")
        }
    }

    return (
        <div>
            <button className="accordion" onClick={accordianViewer}>
                <ion-icon name="filter" style={{fontSize:"2rem",marginRight:"8px"}}></ion-icon>
            </button>
            <fieldset className="panel" style={{display:accordian}}>
            <legend>Sort By</legend>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                }
                checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
              ></input>{" "}
              Price - High to Low
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                }
                checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
              ></input>{" "}
              Price - Low to High
            </label>
          </fieldset>
            <fieldset style={{ marginTop: "1rem",display:accordian}} className="panel">
            <legend> Filters </legend>
            <label>
              <input
                type="checkbox"
                checked={showInventoryAll}
                onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
              />
              Include Out of Stock
            </label>
  
            <label>
              <input
                type="checkbox"
                checked={showFastDeliveryOnly}
                onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
              />
              Fast Delivery Only
            </label>
          </fieldset>
            <ProductListing filteredData={filteredData}/>
          </div>
    )
}