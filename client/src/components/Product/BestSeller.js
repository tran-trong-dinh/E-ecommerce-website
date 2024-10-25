import React, { useEffect, useState } from 'react';
import { apiGetProducts } from 'apis/product';
import { CustomSlider } from '..';
import bannerBottom from 'assets/banner-bottom.png';
import bannerBottom1 from 'assets/banner-bottom1.png';
import { useDispatch, useSelector } from 'react-redux';
import { getNewProducts } from 'store/products/asyncActions';
const tabs = [
    { id: 1, name: 'best sellers' },
    {
        id: 2,
        name: 'new arrivals',
    },
];
const BestSeller = () => {
    const [bestSellers, setBestSellers] = useState(null);
    const [activatedTab, setActivatedTab] = useState(1);
    const [products, setProducts] = useState(null);
    const dispatch = useDispatch();
    const { newProducts } = useSelector((state) => state.products);
    console.log('new', newProducts);
    const fetchProducts = async () => {
        const response = await apiGetProducts({ sort: '-sold' });

        if (response?.success) {
            setBestSellers(response.products);
            setProducts(response.products);
        }
    };

    useEffect(() => {
        fetchProducts();
        dispatch(getNewProducts());
    }, []);
    useEffect(() => {
        if (activatedTab === 1) setProducts(bestSellers);
        if (activatedTab === 2) setProducts(newProducts);
    }, [activatedTab]);

    return (
        <div>
            <div className="flex text-[20px] ml-[-32px]">
                {tabs.map((el) => {
                    return (
                        <span
                            key={el.id}
                            className={`font-semibold uppercase border-r px-8 text-gray-400 cursor-pointer ${
                                activatedTab === el.id ? 'text-gray-600' : ''
                            }`}
                            onClick={() => setActivatedTab(el.id)}
                        >
                            {el.name}
                        </span>
                    );
                })}
            </div>
            <div className="mt-4 mx-[-10px] border-t-2 border-main pt-4">
                <CustomSlider products={products} activatedTab={activatedTab} />
            </div>
            <div className="w-full flex gap-4 mt-8">
                <img src={bannerBottom} alt="banner" className="flex-1 object-contain" />
                <img src={bannerBottom1} alt="banner" className="flex-1 object-contain" />
            </div>
        </div>
    );
};

export default BestSeller;
