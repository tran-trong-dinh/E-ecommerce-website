import React, { useEffect, useState } from 'react';
import { apiGetProducts } from 'apis';
import ProductCard from './ProductCard';
import banner_bottom_2 from 'assets/banner-bottom-2.png';
import banner_bottom_3 from 'assets/banner-bottom-3.png';
import banner_bottom_4 from 'assets/banner-bottom-4.png';
import banner_bottom_5 from 'assets/banner-bottom-5.png';
function FeatureProducts() {
    const [products, setProducts] = useState(null);
    const fetchProducts = async () => {
        const response = await apiGetProducts({ limit: 9, totalRatings: 5 });
        if (response?.success) setProducts(response.products);
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="w-full">
            <div className="text-[20px] font-semibold py-[15px] border-b-2 border-main">FeatureProducts</div>
            <div className="flex flex-wrap mt-[15px] mx-[10x]">
                {products?.map((el) => (
                    <ProductCard
                        key={el._id}
                        image={el.thumb}
                        title={el.title}
                        price={el.price}
                        totalRatings={el.totalRatings}
                    />
                ))}
            </div>
            <div className="flex justify-between">
                <img src={banner_bottom_2} alt="" className="w-[49%] object-contain" />
                <div className="flex flex-col justify-between gap-4 w-[24%]">
                    <img src={banner_bottom_3} alt="banner" />
                    <img src={banner_bottom_4} alt="banner" />
                </div>
                <img src={banner_bottom_5} alt="" className="w-[24%] object-contain" />
            </div>
        </div>
    );
}

export default FeatureProducts;
