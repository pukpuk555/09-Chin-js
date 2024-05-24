//สร้างตัวเเปรเพื่อให้สะดวกต่อการเรียกใช้ โดยการเรียกใช้ ID
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const addCartBtn = document.getElementById("addCart");
const cartList = document.getElementById("cartList");
const calPriceBtn = document.getElementById("calPrice");
const totalPriceDisplay = document.getElementById("totalPrice");
const defaultImage = "./assets/default.png";

const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const productImage = document.getElementById("productImage") || defaultImage;

//สร้าง Array เพื่อรับ Product ที่ Add มา
let products = [];
//สร้างโปรดักไอดี
let productId = 1;

//สร้างฟังชั่นในการ add product และ push เข้า array
function addProduct() {
  //สร้าง object
  const product = {
    id: productId++,
    name: productName,
    price: productPrice,
    image: productImage,
  };

  //push to array
  products.push(product);

  //render product
  renderProduct(product);

  //clear form
  productForm.reset();
}

//สร้างการ render กล่อง
function renderProduct(product) {
  //สร้างการ์ดไอเทม
  const productCard = document.createElement("div");
  productCard.className =
    "p-4 bg-slate-300 rounded-lg flex items-center space-x-4";

  //สร้าง checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-checkbox h-5 w-5";

  //สร้าง image
  const img = document.createElement("img");
  img.src = "product.productImage";
  img.alt = "product.productName";
  img.className = "w-20 h-20 object-cover rounded-lg";

  //สร้างการ์ด detail
  const detail = document.createElement("div");
  detail.className = "flex-1";

  //สร้าง name
  const product_Name = document.createElement("h3");
  product_Name.className = "text-lg font-bold";
  product_Name.textContent = product.name;

  //สร้าง price
  const product_Price = document.createElement("p");
  product_Price.className = "text-lg";
  product_Price.textContent = `Price : ${product.price}`;

  //เอา name, price เข้า detail
  detail.appendChild(product_Name);
  detail.appendChild(product_Price);

  //เอา ส่วนที่เหลือเข้า card ตามด้วย detail
  productCard.appendChild(checkbox);
  productCard.appendChild(img);
  productCard.appendChild(detail);

  //เอาเข้าหน้า index
  productList.appendChild(productCard);
}
