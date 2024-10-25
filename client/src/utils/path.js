const path = {
     PUBLIC: '/',
     HOME: '',
     ALL: '*',
     LOGIN: 'login',
     PRODUCTS: ':category',
     BLOGS: 'blogs',
     OUR_SERVICES: 'services',
     FAQ: 'faqs',
     DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
     FINAL_REGISTER: 'final-register/:status',
     REST_PASSWORD: 'reset-password/:token',

     //Admin
     ADMIN: 'admin',
     DASHBOARD: 'dashboard',
     MANAGE_USER: 'manage-user',
     MANAGE_PRODUCTS: 'manage-products',
     MANAGE_ORDER: 'manage-order',
     CREATE_PRODUCT: 'create-product',

     //Member
     MEMBER: 'member',
     PERSONAL: 'personal',
};

export default path;
