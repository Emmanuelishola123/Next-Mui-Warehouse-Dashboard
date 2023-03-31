import { subDays, subHours, subMinutes } from "date-fns";
import { throttle } from "../config";
import type { Product } from "../types/product";
import { applyFilters } from "../utils/apply-filters";
import { applyPagination } from "../utils/apply-pagination";
import { applySort } from "../utils/apply-sort";
import { wait } from "../utils/wait";

interface Options {
  filters?: Array<{ operator: string; property: string; value: any }>;
  sort?: string;
  sortBy?: string;
  page?: number;
  query?: string;
  view?: string;
}

const now = new Date();

const products: Product[] = [
  {
    id: "4636Y",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 5), 5), 35),
    name: "Polaroid White Camera Vintage",
    price: 604.06,
    image: "/static/product-01.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "DNOX52-K",
    category: "shoes",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 5), 5), 35),
  },
  {
    id: "3865P",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 40), 22), 146),
    name: "Polaroid Black Camera Vintage",
    price: 1344.28,
    image: "/static/product-02.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "APWU13-N",
    category: "shoes",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 40), 22), 146),
  },
  {
    id: "3729F",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 7), 22), 19),
    name: "Polaroid Black Camera Vintage",
    price: 923.24,
    image: "/static/product-03.png",
    currency: "USD",
    qty: 20,
    cost: 800.5,
    total: 1200.5,
    sales: 1200,
    tax: 35,
    chargeTax: false,
    currencySymbol: "$",
    sku: "EIWZ36-M",
    category: "jeans",
    status: "draft",
    updatedAt: subDays(subHours(subMinutes(now, 7), 22), 19),
  },
  {
    id: "5705N",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 8), 23), 264),
    name: "Unbranded Sneakers",
    price: 194.4,
    image: "/static/product-04.png",
    currency: "USD",
    qty: 15,
    cost: 200.5,
    total: 2200.5,
    sales: 1900,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "EBDM72-T",
    category: "shoes",
    status: "draft",
    updatedAt: subDays(subHours(subMinutes(now, 8), 23), 264),
  },
  {
    id: "2758C",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 17), 13), 8),
    name: "Nike Airmax",
    price: 105.17,
    image: "/static/product-05.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "RAKR75-P",
    category: "shirts",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 17), 13), 8),
  },
  {
    id: "3847L",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 29), 19), 24),
    name: "Unbranded Wireless Headphones",
    price: 751.19,
    image: "/static/product-06.png",
    currency: "USD",
    qty: 10,
    cost: 200.5,
    total: 298.5,
    sales: 800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "QKKH19-W",
    category: "jeans",
    status: "draft",
    updatedAt: subDays(subHours(subMinutes(now, 29), 19), 24),
  },
  {
    id: "7871W",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 47), 15), 172),
    name: "Timely Cyan Strap",
    price: 1027.45,
    image: "/static/product-07.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 85,
    chargeTax: true,
    currencySymbol: "$",
    sku: "TSQV38-X",
    category: "jeans",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 47), 15), 172),
  },
  {
    id: "6123U",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 32), 11), 151),
    name: "Timely Brown Leather Strap",
    price: 640.79,
    image: "/static/product-08.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "UUVH71-G",
    category: "dresses",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 32), 11), 151),
  },
  {
    id: "1041K",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 26), 24), 131),
    name: "Watch with Black Leather Strap",
    price: 656.37,
    image: "/static/product-09.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "GJCR37-T",
    category: "watches",
    status: "draft",
    updatedAt: subDays(subHours(subMinutes(now, 26), 24), 131),
  },
  {
    id: "0951Y",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 57), 11), 205),
    name: "Watch Brown Leather Strap",
    price: 1319.45,
    image: "/static/product-10.png",
    currency: "USD",
    qty: 29,
    cost: 200.5,
    total: 250.5,
    sales: 100,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "UHIF12-Q",
    category: "dresses",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 57), 11), 205),
  },
  {
    id: "6860I",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 38), 23), 123),
    name: "Polaroid White Camera Vintage",
    price: 907.15,
    image: "/static/product-01.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "DKRZ09-M",
    category: "watches",
    status: "draft",
    updatedAt: subDays(subHours(subMinutes(now, 38), 23), 123),
  },
  {
    id: "9784C",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 49), 12), 72),
    name: "Unbranded Sneakers",
    price: 1328.33,
    image: "/static/product-04.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "WSUT77-H",
    category: "shoes",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 49), 12), 72),
  },
  {
    id: "6604V",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 45), 5), 103),
    name: "Unbranded Wireless Headphones",
    price: 1029.46,
    image: "/static/product-06.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "TWTG39-I",
    category: "jeans",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 45), 5), 103),
  },
  {
    id: "0992N",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 55), 16), 286),
    name: "Nike Airmax",
    price: 1370.1,
    image: "/static/product-05.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "MJSC66-N",
    category: "watches",
    status: "draft",
    updatedAt: subDays(subHours(subMinutes(now, 55), 16), 286),
  },
  {
    id: "3377O",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 31), 16), 233),
    name: "Polaroid Black Camera Vintage",
    price: 663.59,
    image: "/static/product-02.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "JVLO87-T",
    category: "shirts",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 31), 16), 233),
  },
  {
    id: "8868O",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 23), 13), 263),
    name: "Timely Brown Leather Strap",
    price: 14.67,
    image: "/static/product-08.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "TENG41-T",
    category: "jeans",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 23), 13), 263),
  },
  {
    id: "7255C",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 34), 5), 151),
    name: "Polaroid Black Camera Vintage",
    price: 262.55,
    image: "/static/product-03.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "FCSF15-T",
    category: "jeans",
    status: "draft",
    updatedAt: subDays(subHours(subMinutes(now, 34), 5), 151),
  },
  {
    id: "8725S",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 60), 13), 30),
    name: "Watch Brown Leather Strap",
    price: 1449.23,
    image: "/static/product-10.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "KKLB09-D",
    category: "shirts",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 60), 13), 30),
  },
  {
    id: "6347S",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 33), 13), 254),
    name: "Watch with Black Leather Strap",
    price: 132.85,
    image: "/static/product-09.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "OIQA42-G",
    category: "watches",
    status: "published",
    updatedAt: subDays(subHours(subMinutes(now, 33), 13), 254),
  },
  {
    id: "3330V",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et optio error neque",
    createdAt: subDays(subHours(subMinutes(now, 28), 19), 39),
    name: "Timely Cyan Strap",
    price: 973.34,
    image: "/static/product-07.png",
    currency: "USD",
    qty: 20,
    cost: 2000.5,
    total: 2500.5,
    sales: 1800,
    tax: 35,
    chargeTax: true,
    currencySymbol: "$",
    sku: "ZYPI54-Z",
    category: "watches",
    status: "draft",
    updatedAt: subDays(subHours(subMinutes(now, 28), 19), 39),
  },
];

const product: Product = {
  id: "6541237",
  brand: "Cassio",
  composition: ["Leather", "Metal"],
  createdAt: subDays(subHours(subMinutes(now, 60), 13), 30),
  currency: "USD",
  qty: 20,
  cost: 2000.5,
  total: 2500.5,
  sales: 1800,
  tax: 35,
  chargeTax: true,
  currencySymbol: "$",
  defaultName: "622 / Gold Leather",
  description:
    "The Core Collection. Our premium line of watches with a minimalist and timeless look. Designed in the UK and perfect for everyday use. This is our black on black leather. The stainless steel case has a brushed matt black finish with a subtle reflective dial. The hands and numbers are in a shiny gun metal finish.",
  displayName: "Watch With Leather Strap",
  features: ["Stainless steel casing", "40mm diameter watch face "],
  image: "/static/product-01.png",
  name: "Watch With Leather Strap",
  price: 160,
  size: "fit",
  sku: "KKLB09-D",
  status: "published",
  tags: ["Watch", "Style"],
  updatedAt: new Date(),
  variants: [
    {
      id: "88327543",
      createdAt: new Date(),
      currency: "eur",
      description:
        "The Core Collection. Our premium line of watches with a minimalist and timeless look. Designed in the UK and perfect for everyday use. This is our black on black leather. The stainless steel case has a brushed matt black finish with a subtle reflective dial. The hands and numbers are in a shiny gun metal finish",
      image: "/static/product-10.png",
      name: "Brown Leather",
      price: 69,
      quantity: 100,
      sku: "B-283KD",
    },
  ],
};

class ProductApi {
  async getProducts(options?: Options): Promise<{ products: Product[]; productsCount: number }> {
    if (throttle) {
      await wait(throttle);
    }

    const { filters, sort, sortBy, page, query, view } = options;

    /*
     NOTE: Query, filter, sort and pagination are operation meant to be executed on the server.
     Since this does not connect to a real backend, we simulate these operations.
     */

    const queriedProducts = products.filter((_product) => {
      if (!!query && !_product.name.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // No need to look for any resource fields
      if (typeof view === "undefined" || view === "all") {
        return true;
      }

      // In this case, the view represents the resource status
      return _product.status === view;
    });
    const filteredProducts = applyFilters(queriedProducts, filters);
    const sortedProducts = applySort(filteredProducts, sort, sortBy);
    const paginatedProducts = applyPagination(sortedProducts, page);

    return Promise.resolve({
      products: paginatedProducts,
      productsCount: filteredProducts.length,
    });
  }

  async getRawProducts(): Promise<{ products: Product[]; productsCount: number }> {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve({ products: products, productsCount: products.length });
  }

  async getProduct(): Promise<Product> {
    if (throttle) {
      await wait(throttle);
    }

    return Promise.resolve(product);
  }
}

export const productApi = new ProductApi();
