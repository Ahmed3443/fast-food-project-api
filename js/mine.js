// // //api  ,  ajax  >> technique

// // // ajax >> async js and xml

// // // 99 >> ms >> ActiveXObject

// // // 2004 >> XMLhttpRequest()

// // //XMLHttpRequest

// // /**
// //  * method
// //  *
// //  * get >> get data
// //  * post >>send data
// //  * put  >> update
// //  * patch >> update
// //  * delete >> delete
// //  *
// //  *
// //  * //chech req
// //  *
// //  * readyState = 0  >> req not statblished
// //  * readyState = 1  >> req stablished
// //  * readyState = 2 >> req recieved
// //  * readyState = 3 >> req processing
// //  * readyState = 4  >> req successful , responce ready
// //  *
// //  *
// //  * status = 404 >> error
// //  *
// //  * statuse = 403 >> forbidden
// //  *
// //  * status = 500 >> inernal server error
// //  *
// //  *
// //  * status >> 200 ok
// //  *
// //  *

// //  */

// // console.log("first");

// // var DataContainer = [];

// // var row = document.getElementById("rowData");

// // getRecipies("tomato");//async

// // function getRecipies(x) {
// //   var req = new XMLHttpRequest(); //oop

// //   req.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${x}`); //make conenction

// //   req.send(); //send req

// //   req.addEventListener("readystatechange", function () {
// //     if (req.readyState == 4 && req.status == 200) {

// //       console.log('pizza');

// //       //DataContainer = req.response; // string

// //       DataContainer = JSON.parse(req.response).recipes; // string
// //       // console.log(DataContainer);

// //       //displayData();
// //     }
// //   });
// // }

// function getPizza() {
//   return new Promise(function (resolve, reject) {
//     var req = new XMLHttpRequest(); //oop

//     req.open("GET", `https://forkify-api.herokuapp.com/api/search?q=pizza`); //make conenction

//     req.send(); //send req

//     req.addEventListener("readystatechange", function () {
//       if (req.readyState == 4 && req.status == 200) {
//         console.log("pizza");

//         //DataContainer = req.response; // string

//         DataContainer = JSON.parse(req.response).recipes; // string
//         // console.log(DataContainer);

//         //displayData();

//         resolve();
//       } else if (req.status != 200) {
//         reject();
//       }
//     });
//   });
// }

// function getPasta() {
//   return new Promise(function (resolve, reject) {
//     var req = new XMLHttpRequest(); //oop

//     req.open("GET", `https://forkify-api.herokuapp.com/api/search?q=pizza`); //make conenction

//     req.send(); //send req

//     req.addEventListener("readystatechange", function () {
//       if (req.readyState == 4 && req.status == 200) {
//         console.log("pasta");

//         //DataContainer = req.response; // string

//         DataContainer = JSON.parse(req.response).recipes; // string
//         // console.log(DataContainer);

//         //displayData();

//         resolve();
//       } else if (req.status != 200) {
//         reject();
//       }
//     });
//   });
// }

// //promise chaing

// // getPizza().then(()=>{
// //   getPasta().then(()=>{console.log('after pasta')})
// // })

// //getPizza().then(()=>{ return getPasta()}).then(()=>{console.log('after pasta')})

// // getPizza()
// //   .then(() => {
// //     console.log("everything ok");
// //   })
// //   .catch(() => {
// //     console.log("something error");
// //   });

// //asunc

// // getPizza()

// // getPasta()

// // getTomato()

// // getOnion()

// //callbacks

// /// callback hell

// // getPizza(()=>{
// //   getPasta( ()=>{
// //    getOnion(()=>{
// //      getTomato()
// //    })
// //   }  )

// // })

// //es6

// // promise

// // let x = new Promise();

// getPizza().then(()=>{return getPasta()}).then(()=>{console.log('welcome')}).catch(()=>{
//   console.log('error')
// })

// async function getAll(){

//   await getPizza();

//  await getPasta()

// }

// getAll();

// console.log(2);
// //selfInvoke

//  function getPasta() {
//   let respo =  fetch("https://forkify-api.herokuapp.com/api/search?q=").then((data)=>{
//     console.log(data)
//   }).catch((er)=>{

//     console.log(er)

//   })

//}

// (async function () {
//   await getPizza();
//   await getPasta();
// })();

//async await

var links = document.querySelectorAll("nav .nav-link");

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function (eventInfo) {
    console.log(eventInfo.target);

    var innerWord = eventInfo.target.innerHTML; //el klma

    getRecipies(innerWord);
  });
}

let DataContainer = []; //gloabl

let row = document.getElementById("rowData");

async function getRecipies(x) {
  let respo = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${x}`
  );

  let myData = await respo.json();

  DataContainer = myData.recipes;

  console.log(DataContainer);

  displayData();
}

getRecipies("onion");

function displayData() {
  var div = "";

  for (var i = 0; i < DataContainer.length; i++) {
    div += ` <div class="col-md-4">
        <div class="item">
   <h1>${DataContainer[i].recipe_id}</h1>
        <img   data-toggle="modal" data-target="#merit" src='${DataContainer[i].image_url}' onclick='
        getSingleRecipe(${DataContainer[i].recipe_id})' class='w-100'/>
         
          <h2>${DataContainer[i].title}</h2>
          <p>publisher: ${DataContainer[i].publisher}</p>
          <a class='btn btn-warning' href='${DataContainer[i].source_url}' target='_blank'>source </a>
        </div>
      </div>`;
  }

  row.innerHTML = div;
}

let recipeData;

let rowRecipe = document.getElementById("rowRecipe");

async function getSingleRecipe(id) {
  let res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);

  recipeData = await res.json();

  recipeData = recipeData.recipe;

  console.log(recipeData);

  displaySingleRecpie();
}

function displaySingleRecpie() {
  let str = `<img src="${recipeData.image_url}" class="w-100" alt="">
  <h2>${recipeData.title}</h2>
  <p>${recipeData.ingredients}</p>`;


  rowRecipe.innerHTML = str;
}
