import { items, categories, user } from '../data/staticData';

const mockApi = {
    get: async (url) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (url === '/items') {
                    resolve({ data: items });
                } else if (url === '/orders/myorders') {
                    resolve({
                         data: [
                             {
                                 _id: 'abc12345',
                                 createdAt: new Date().toISOString(),
                                 totalPrice: 45000,
                                 isPaid: true,
                                 isDelivered: false,
                                 orderItems: [
                                     { name: 'Tailored Linen Suit', qty: 1, price: 35000 },
                                     { name: 'Cashmere Scarf', qty: 1, price: 10000 } // price difference just for fun
                                 ]
                             }
                         ]
                    });
                } else if (url === '/categories') {
                    resolve({ data: categories });
                } else if (url.startsWith('/items/')) {
                    const id = url.split('/')[2];
                    const item = items.find(i => i._id === id);
                    if (item) {
                        resolve({ data: item });
                    } else {
                        reject({ response: { status: 404, data: { message: 'Item not found' } } });
                    }
                } else if (url === '/cart') {
                     resolve({ data: [] }); // Mock empty cart from server if needed, though usually cart is local?
                     // actually existing code might not fetch cart from server if it uses context.
                     // The Home.jsx uses /newsletter
                } else {
                    // Default fallback
                    console.warn(`Unhandled GET request to ${url}`);
                    resolve({ data: {} });
                }
            }, 300);
        });
    },
    post: async (url, body) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (url === '/users/login') {
                     // Mock any login as success
                    resolve({ data: user });
                } else if (url === '/users') {
                     // Mock register
                     resolve({ data: user });
                } else if (url === '/newsletter') {
                    resolve({ data: { message: 'Subscribed' } });
                } else if (url.includes('/reviews')) {
                     // Mock review submission
                    resolve({ data: { message: 'Review added' } });
                } else {
                     resolve({ data: {} });
                }
            }, 300);
        });
    },
    create: () => mockApi,
    interceptors: {
        request: { use: () => {} },
        response: { use: () => {} }
    },
    defaults: { headers: { common: {} } } 
};

export default mockApi;
