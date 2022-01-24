console.log("toto");
let shopping = document.querySelector(".shopping");
let addItem = document.querySelector(".btn-outline-dark");
let order = document.querySelector(".order");
let shopItem = document.querySelector(".itemCart");
console.log("coucoou");
console.log(shopItem);
shopping.addEventListener("click", () => {
  order.classList.toggle("visible");
});

console.log(order);
console.log(shopping);

let getStar = () => {};

fetch("assets/json/articles.json")
  .then((response) => response.json())
  .then((jsonArticles) => {
    jsonArticles.results.map((articles) => {
      let title = articles.title;
      let price = articles.price;
      let picture = articles.picture;
      let size = articles.size;
      let star = getStar(size);

      let cardInject = `
        <div class="col-sm-3">
                        <div class="card h-100">
                            
                            <img class="card-img-top" src="${picture}"/>
                            
                            <div class="card-body p-4">
                                <div class="text-center">
                                    
                            
                                    <h5 class="fw-bolder">${title}</h5>
                                    
                                    ${price}
                                    <br>
                                    ${size}
                                </div>
                            </div>
                        
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button class="btn btn-outline-dark mt-auto buy" >Ajouter au panier</button></div>
                            </div>
                        </div>
        
        
        
        
        `;

      document.getElementById("articlesTable").innerHTML += cardInject;

      let addToCart = `<div class= 'itemCart order ' >
        
    <section>
      <div class="container-fluid ml-auto buy">
        <div class="row">
          <div class="col-sm-8 bg-light">
            <p></p>
          </div>
          <div class="col-sm-4 bg-warning row">
            <div class="col-sm-3"><img class="card-img-top" src="${picture}"/></div>
            <div class="col-sm-3"><p>Vêtement: ${title}</p></div>
            <div class="col-sm-3"><p>Taille: ${size}</p></div>
            <button type="button" class="btn btn-danger col-sm-3">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </section>
    </div>`;

      let addToCartButton = document.querySelectorAll(".buy");
      console.log(addToCartButton[3]);
      for (let i = 0; i < addToCartButton.length; i++) {
        addToCartButton[i].addEventListener("click", () => {
          cartNumbers(jsonArticles[i]);
          document.querySelector(".order").innerHTML += addToCart;

          let removeCartItem = document.getElementsByClassName("btn-danger");
          console.log(removeCartItem);
          console.log("coucoou");
          for (let i = 0; i < removeCartItem.length; i++) {
            let removeButton = removeCartItem[i];
            removeButton.addEventListener("click", function (event) {
              removecartNumbers(jsonArticles[i]);
              let removeClick = event.target;
              removeClick.parentElement.parentElement.remove();
            });
          }
        });
      }

      function checkCartNumber() {
        let productNumbers = localStorage.getItem("cartNumbers");

        if (productNumbers) {
          document.querySelector(".shopping span").textContent = productNumbers;
        }
      }

      function cartNumbers(jsonArticles) {
        console.log(jsonArticles);
        let productNumbers = localStorage.getItem("cartNumbers");
        productNumbers = parseInt(productNumbers);
        if (productNumbers) {
          localStorage.setItem("cartNumbers", productNumbers + 1);
          document.querySelector(".shopping span").textContent =
            productNumbers + 1;
        } else {
          localStorage.setItem("cartNumbers", 1);
          document.querySelector(".shopping span").textContent = 1;
        }
        console.log(productNumbers);
      }

      function removecartNumbers(jsonArticles) {
        console.log(jsonArticles);
        let productNumbers = localStorage.getItem("cartNumbers");
        productNumbers = parseInt(productNumbers);
        if (productNumbers) {
          localStorage.setItem("cartNumbers", productNumbers - 1);
          document.querySelector(".shopping span").textContent =
            productNumbers - 1;
        } else {
          localStorage.setItem("cartNumbers", 1);
          document.querySelector(".shopping span").textContent = 1;
        }
        console.log(productNumbers);
      }

      checkCartNumber();
    });
  });
