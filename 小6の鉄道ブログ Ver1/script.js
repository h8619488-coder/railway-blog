// =======================
// 記事データ取得
// =======================

function getArticles(){

    return JSON.parse(
        localStorage.getItem("articles")
    ) || [];

}



// =======================
// ログイン
// =======================

function login(){

    let id =
    document.getElementById("id").value;


    let password =
    document.getElementById("password").value;



    if(id === "haruki" && password === "1234"){


        localStorage.setItem(
            "login",
            "true"
        );


        alert("ログイン成功！");


        location.href="admin.html";


    }else{


        alert("IDまたはパスワードが違います");


    }

}



// =======================
// ログアウト
// =======================

function logout(){

    localStorage.removeItem("login");


    alert("ログアウトしました");


    location.href="login.html";

}



// =======================
// ログイン確認
// =======================

function checkLogin(){


    if(
    localStorage.getItem("login")
    !== "true"
    ){


        location.href="login.html";


    }


}



// =======================
// 記事保存
// =======================

function saveArticle(){


    let title =
    document.getElementById("title").value;


    let image =
    document.getElementById("image").value;


    let description =
    document.getElementById("description").value;


    let content =
    document.getElementById("content").value;


    let category =
    document.getElementById("category").value;


    let status =
    document.getElementById("status").value;



    let date = new Date();


    let postDate =

    date.getFullYear()
    +"年"
    +(date.getMonth()+1)
    +"月"
    +date.getDate()
    +"日";



    let articles =
    getArticles();



    articles.push({

        title:title,

        image:image,

        description:description,

        content:content,

        category:category,

        status:status,

        date:postDate

    });



    localStorage.setItem(

        "articles",

        JSON.stringify(articles)

    );



    alert("記事を保存しました！");



    location.href="articles.html";


}
// =======================
// 記事一覧表示
// =======================

function loadArticle(){


    let area =
    document.getElementById("newArticle");


    if(!area){

        return;

    }



    let articles =
    getArticles();



    area.innerHTML="";



    articles.forEach(function(article,index){



        // 下書きは表示しない

        if(article.status && article.status !== "公開"){

            return;

        }



        area.innerHTML += `


        <article class="card">


        ${article.image ?

        `<img src="${article.image}">`

        :

        ""

        }



        <p class="category">

        📂 ${article.category || "未分類"}

        </p>



        <h3>

        ${article.title}

        </h3>



        <p class="date">

        投稿日：${article.date || ""}

        </p>



        <p>

        ${article.description || ""}

        </p>



        <a href="article.html"
        onclick="openArticle(${index})">

        記事を読む →

        </a>



        </article>


        `;


    });


}





// =======================
// 記事を開く
// =======================

function openArticle(index){


    let articles =
    getArticles();



    let article =
    articles[index];



    localStorage.setItem(

        "openArticle",

        JSON.stringify(article)

    );



}





// =======================
// 記事ページ表示
// =======================

function loadArticlePage(){


    let article =

    JSON.parse(

    localStorage.getItem("openArticle")

    );



    if(!article){

        return;

    }



    document.getElementById(
    "articleTitle"
    ).innerHTML =

    article.title;



    document.getElementById(
    "articleDate"
    ).innerHTML =

    "投稿日："+article.date;



    document.getElementById(
    "articleImage"
    ).src =

    article.image;



    document.getElementById(
    "articleCategory"
    ).innerHTML =

    "📂 "+article.category;



    document.getElementById(
    "articleContent"
    ).innerHTML =

    article.content;


}
// =======================
// 管理画面の記事一覧
// =======================

function loadAdminArticles(){


    let area =
    document.getElementById("adminArticles");


    if(!area){

        return;

    }



    let articles =
    getArticles();



    area.innerHTML="";



    articles.forEach(function(article,index){



        area.innerHTML += `


        <article class="card">


        <h3>

        ${article.title}

        </h3>



        <p>

        📂 ${article.category}

        </p>



        <p>

        状態：
        ${article.status}

        </p>



        <button onclick="deleteArticle(${index})">

        🗑️ 削除

        </button>


        </article>


        `;


    });


}





// =======================
// 記事削除
// =======================

function deleteArticle(index){


    let articles =
    getArticles();



    articles.splice(index,1);



    localStorage.setItem(

        "articles",

        JSON.stringify(articles)

    );



    alert("記事を削除しました");



    location.reload();


}





// =======================
// カテゴリー検索
// =======================

function filterCategory(category){


    let cards =

    document.querySelectorAll(
    "#newArticle .card"
    );



    cards.forEach(function(card){



        let text =
        card.innerText;



        if(
        category === "all"
        ||
        text.includes(category)
        ){


            card.style.display="block";


        }else{


            card.style.display="none";


        }


    });


}





// =======================
// 記事検索
// =======================

function searchArticle(){


    let keyword =

    document.getElementById(
    "search"
    ).value;



    let cards =

    document.querySelectorAll(
    "#newArticle .card"
    );



    cards.forEach(function(card){



        if(

        card.innerText.includes(keyword)

        ){


            card.style.display="block";


        }else{


            card.style.display="none";


        }



    });



}



// =======================
// ページ読み込み
// =======================

window.onload=function(){


    loadArticle();


    loadAdminArticles();


};
