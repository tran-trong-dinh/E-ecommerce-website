import React, { useCallback, useEffect, useState } from 'react';
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, InputSort, Pagination, Product, SearchItem } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css';
import { sorts } from '../../utils/constant';
const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
};

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const [activeClick, setActiveClick] = useState(null);
    const [searchParams] = useSearchParams();
    const [sort, setSort] = useState('');
    const fetchProductsByCategory = async (queries) => {
        const response = await apiGetProducts(queries);
        if (response?.success) {
            setProducts(response);
        }
    };
    useEffect(() => {
        const queries = {};
        for (let i of searchParams) queries[i[0]] = i[1];
        let priceQueries = {};
        if (queries.to && queries.from) {
            priceQueries = {
                $and: [{ price: { gte: queries.from } }, { price: { lte: queries.to } }],
            };
            delete queries.price;
        } else {
            if (queries.from) {
                queries.price = { gte: queries.from };
            }
            if (queries.to) {
                queries.price = { lte: queries.to };
            }
        }

        delete queries.to;
        delete queries.from;
        fetchProductsByCategory({ ...priceQueries, ...queries });
        window.scrollTo(0, 0);
    }, [searchParams]);

    const changeActiveFilter = useCallback(
        (name) => {
            if (activeClick === name) {
                setActiveClick(null);
            } else {
                setActiveClick(name);
            }
        },
        [activeClick],
    );
    const changeValue = useCallback(
        (value) => {
            setSort(value);
        },
        [sort],
    );
    const { category } = useParams();
    useEffect(() => {
        if (sort) {
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    sort,
                }).toString(),
            });
        }
    }, [sort]);
    return (
        <div className="w-full">
            <div className="h-[81px] flex justify-center items-center bg-gray-100">
                <div className="w-main">
                    <h3 className="font-semibold uppercase">{category}</h3>
                    <Breadcrumbs category={category} />
                </div>
            </div>
            <div className="w-main m-auto border p-4 flex justify-between">
                <div className="w-4/5 flex-auto flex flex-col justify-center gap-4">
                    <span className="font-semibold text-sm">Filter By</span>
                    <div className="flex items-center gap-4">
                        <SearchItem
                            activeClick={activeClick}
                            name={'Price'}
                            changeActiveFilter={changeActiveFilter}
                            type="input"
                        />
                        <SearchItem activeClick={activeClick} name={'Color'} changeActiveFilter={changeActiveFilter} />
                    </div>
                </div>
                <div className="w-1/5 flex flex-col gap-3">
                    <span className="font-semibold text-sm">Sort By</span>
                    <InputSort value={sort} options={sorts} changeValue={changeValue} />
                </div>
            </div>
            <div className="mt-8 w-main m-auto">
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid flex mx-[-10px]"
                    columnClassName="my-masonry-grid_column"
                >
                    {products?.products?.map((product) => (
                        <Product key={product._id} pid={product._id} productData={product} normal={true}></Product>
                    ))}
                </Masonry>
            </div>
            <div className="w-main m-auto my-4 flex justify-end">
                <Pagination totalCount={products?.counts} titlePage={'products'} />
            </div>
        </div>
    );
};

export default Products;
