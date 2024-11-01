import { Product } from "../interfaces/Product";
const PRODUCTS: Product[] = [
   {
    id:'product_1' ,
    name: 'Квадрокоптер V168 для XIAOMI, Профессиональный широкоугольный ',
    image:'https://ae04.alicdn.com/kf/S574fe7943664466cb5b29f9ec4be4479l.jpg_.webp',
    price: 299,
    favorite: false,
    
   },
   {
    id:'product_2' ,
    name: 'Беспроводная электрическая дрель, 21 в, 13 мм, 4000 Н/м',
    image:'https://ae04.alicdn.com/kf/Sc4b8f3e505d64f00a103eb8b9f10133bU.jpg_640x640.jpg_.webp',
    price: 100,
    favorite: false,
    
   },
   {
    id:'product_3' ,
    name: 'GX16-3A - цилиндрический розеточный штекер на кабель типа 3-пин "мама',
    image:'https://ae04.alicdn.com/kf/U28dbbc3133fd44368281e6eb3eb4f099w.png',
    price: 20,
    favorite: false,
    
   },
   {
    id:'product_4' ,
    name: 'Слон Робототехника MyAGV 2023 Jetson Nano: автономная навигацияа',
    image:'https://ae04.alicdn.com/kf/S3815b1411e844a59a374f51893f75b46s.png',
    price: 350,
    favorite: true,
    
   },
   {
    id:'product_5' ,
    name: 'Робот-пылесос ABIR X6 , всасывание 6000 Па, программная виртуальная стена',
    image:'https://ae04.alicdn.com/kf/S1d6ebc2cef7d420a9530821e7368f872C.jpg',
    price: 180,
    favorite: false,
    
   },
   {
    id:'product_6' ,
    name: 'Домашние камеры, комнатная широкоугольная камера наблюдения',
    image:'https://ae04.alicdn.com/kf/Se510299885654a589629f2d8392b0fbcB.jpg',
    price: 120,
    favorite: false,
    
   },
   
];

export const getProducts = (): Promise<Product[]> => {
    return new Promise<Product[]>((resolve, reject) => {
        setTimeout(() => {
            if (Math.random()<0.3){
                reject(new Error('Something wend wrong'));
            }
            else {
                resolve(PRODUCTS); // Возвращаем список продуктов через 2 сек
            }
           
        }, 2000); // 2000 мс = 2 секунды
    });
};

//Product.DB.ts