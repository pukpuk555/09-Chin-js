//สร้าง Array เพื่อรับ Product ที่ Add มา
let products = [];
//สร้าง array เพื่อรับค่าของcart
let cart = [];
//สร้างโปรดักไอดี
let productId = 1;
//รูป default
const defaultImage = "./assets/default.jpg";
//สร้างตัวเเปรเพื่อให้สะดวกต่อการเรียกใช้ โดยการเรียกใช้ ID
// const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
// const addCartBtn = document.getElementById("addCart");
const cartList = document.getElementById("cartList");
// const calPriceBtn = document.getElementById("calPrice");
const totalPriceDisplay = document.getElementById("totalPrice");
const cartSection = document.getElementById("cartButton");

//สร้างฟังชั่นในการ add product และ push เข้า array
// const productName = document.querySelector("#productName").value;
// const productPrice = document.querySelector("#productPrice").value;
// const productImage =
//   document.querySelector("#productImage").value || defaultImage;
function addProduct() {
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImage =
    document.getElementById("productImage").value || defaultImage;
  if (productName && productPrice) {
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
    //   document.getElementById("productName").value = "";
    //   document.getElementById("productPrice").value = "";
    //   document.getElementById("productImage").value = "";
    document.getElementById("productForm").reset();
  } else {
    alert("Product Name and Price Must be filled");
  }
}

//สร้างการ render กล่อง
function renderProduct(product) {
  const productList = document.querySelector("#productList");
  //สร้างการ์ดไอเทม
  const productCard = document.createElement("div");
  productCard.className =
    "p-4 bg-slate-300 rounded-lg flex items-center space-x-4";

  //สร้าง checkbox
  const checkbox = document.createElement("input");
  checkbox.dataset.id = product.id;
  checkbox.type = "checkbox";
  checkbox.className = "form-checkbox h-5 w-5";

  //สร้าง image
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
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
  product_Price.textContent = `Price : ${product.price}$`;

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

//add to cart

function addCart() {
  cart = [];
  cartList.innerHTML = "";
  const checkedProduct = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  checkedProduct.forEach((checkbox) => {
    const productId = parseInt(checkbox.dataset.id);
    const product = products.find((product) => product.id === productId);
    if (product) {
      cart.push(product);
    }
    renderCart(product);
  });
}

function renderCart(product) {
  const productCard = document.createElement("div");
  productCard.id = product.id;
  productCard.className =
    "p-4 bg-slate-300 rounded-lg flex items-center space-x-4";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.name;
  img.className = "w-20 h-20 object-cover rounded-lg";

  const detail = document.createElement("div");
  detail.className = "flex-1";

  const product_Name = document.createElement("h3");
  product_Name.className = "text-lg font-bold";
  product_Name.textContent = product.name;

  const product_Price = document.createElement("p");
  product_Price.className = "text-lg";
  product_Price.textContent = `Price : ${product.price}$`;

  //ปุ่ม delete
  const deleteBtn = document.createElement("button");
  deleteBtn.onclick = function () {
    deleteItem(product);
  };
  deleteBtn.className = "bg-red-600";
  deleteBtn.textContent = "Delete";

  const calBtn = document.createElement("button");
  calBtn.id = "calprice";
  calBtn.onclick = function () {
    calTotal();
  };
  calBtn.className = "bg-stone-400 px-1 py-2";
  calBtn.textContent = "Caculate Total Price";

  const calP = document.createElement("p");
  calP.id = "totalPrice";
  calP.textContent = "Total Price:";

  //เอา name, price, delete เข้า detail
  detail.appendChild(product_Name);
  detail.appendChild(product_Price);
  detail.appendChild(deleteBtn);

  //เอา ส่วนที่เหลือเข้า card ตามด้วย detail
  productCard.appendChild(img);
  productCard.appendChild(detail);

  //เอาเข้าหน้า index
  cartList.appendChild(productCard);

  cartSection.innerHTML = "";
  cartSection.appendChild(calBtn);
  cartSection.appendChild(calP);
}

function deleteItem(product) {
  //กรองเอาตัวที่ไม่ตรงกับโปรดัก
  cart = cart.filter((item) => item.id !== product.id);
  //ลบตัวที่ตรงกับไอดีออกไปเลย
  document.getElementById(`${product.id}`).remove();
  calTotal();
}

function calTotal() {
  const totalPrice = cart.reduce((acc, product) => {
    return (acc += parseInt(product.price));
  }, 0);
  document.getElementById(
    "totalPrice"
  ).textContent = `Total Price: ${totalPrice} $`;
}
