import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StoreMap from "../components/commons/StoreMap.jsx";
import {getStore} from "../feature/product/productAPI.js"
import '../styles/product/locationstore.css';

export function StoreLocation() {
    const dispatch = useDispatch();
    const storeList = useSelector((state) => state.product.product);
    const [selectedStore, setSelectedStore] = useState(null);
    const [searchStore, setSearchStore] = useState("");

    useEffect(() => {
        dispatch(getStore());
    }, [dispatch]);

    const handleClick = (store) => {
        setSelectedStore(store);
    }
    const filterStoreList = Array.isArray(storeList) ?
        storeList.filter(store =>
            store.name.toLowerCase().includes(searchStore.toLowerCase())
        ) : [];

    return (
        <div className="store-locator-container">
            <h1 className="store-locator-title">대리점 찾기</h1>

            <div className="store-locator-content">

                <div className="store-list-panel">
                    <div className="search-bar">
                        <input type="text" placeholder="주소를 입력하세요."
                                value={searchStore} onChange={(e)=>setSearchStore(e.target.value)}/>
                    </div>
                    <ul className="store-list store-list-styled">
                        {filterStoreList.map((store) => (
                            <li
                                key={store.pid}
                                className={`store-list-item ${selectedStore?.pid === store.pid ? 'active' : ''}`}
                                onClick={() => handleClick(store)}
                            >
                                <strong>{store.name}</strong>
                                <p>{store.address}</p>
                                <p>전화: {store.phone}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="store-map-panel">
                    <StoreMap storeList={storeList}
                              selectedStore={selectedStore}
                              onMarkerClick={handleClick}/>
                </div>

            </div>
        </div>
    );
}