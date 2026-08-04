// ===============================
// 小6の鉄道ブログ v2
// script.js Part1
// ===============================



// 記事データ取得

function getArticles(){

    let data = localStorage.getItem(
        "articles"
    );


    if(data){

        return JSON.parse(data);

    }


    return [];

}






// 記事保存

function saveArticles(articles){

    localStorage.setItem(

        "articles",

        JSON.stringify(articles)

    );

}







// 記事作成・編集

function saveArticle(){


    let title =
    document.getElementById(
        "title"
    ).value;


    let description =
    document.getElementById(
        "description"
    ).value;


    let content =
    document.getElementById(
        "content"
    ).value;


    let category =
    document.getElementById(
        "category"
    ).value;


    let image =
    document.getElementById(
        "image"
    ).value;



    let status =
    document.getElementById(
        "status"
    ).value;



    let articles =
    getArticles();




    let editId =
    localStorage.getItem(
        "editId"
    );





    if(editId){


        let article =
        articles.find(

            a => a.id == editId

        );


        if(article){


            article.title =
            title;


            article.description =
            description;


            article.content =
            content;


            article.category =
            category;


            article.image =
            image;


            article.status =
            status;


        }


        localStorage.removeItem(
            "editId"
        );



    }else{



        articles.push({

            id:
            Date.now(),


            title:title,


            description:
            description,


            content:
            content,


            category:
            category,


            image:
            image ||
            "images/noimage.png",


            status:
            status,


            views:0,


            date:
            new Date()
            .toLocaleDateString(
                "ja-JP"
            )

        });



    }




    saveArticles(
        articles
    );



    alert(
        "記事を保存しました"
    );



    location.href =
    "index.html";



}







// ホームの記事表示

function loadHomeArticles(){


    let area =
    document.getElementById(
        "newArticle"
    );



    if(!area){

        return;

    }



    let articles =
    getArticles();




    area.innerHTML = "";



    articles
    .filter(

        a =>
        a.status === "公開"

    )
    .slice(
        0,
        6
    )
    .forEach(function(article){



        area.innerHTML += `


        <div class="article-card">


        <img src="${article.image}">


        <div class="article-card-content">


        <span class="category">

        ${article.category}

        </span>



        <h3>

        ${article.title}

        </h3>



        <p>

        ${article.description}

        </p>



        <a class="button"
        onclick="openArticle(${article.id})">

        読む

        </a>


        </div>


        </div>


        `;



    });



}







// 記事を開く

function openArticle(id){


    localStorage.setItem(

        "openArticle",

        id

    );


    location.href =
    "article.html";


}





// 記事ページ表示

function loadArticlePage(){


    let id =
    localStorage.getItem(
        "openArticle"
    );



    let articles =
    getArticles();



    let article =
    articles.find(

        a =>
        a.id == id

    );



    if(!article){

        return;

    }



    article.views++;



    saveArticles(
        articles
    );



    document.getElementById(
        "articleTitle"
    ).innerHTML =
    article.title;



    document.getElementById(
        "articleDate"
    ).innerHTML =
    "投稿日：" +
    article.date;



    document.getElementById(
        "articleCategory"
    ).innerHTML =
    article.category;



    document.getElementById(
        "articleImage"
    ).src =
    article.image;



    document.getElementById(
        "articleContent"
    ).innerHTML =
    article.content;



}

// ===============================
// script.js Part2
// ===============================




// 記事一覧表示

function loadArticles(){


    let area =
    document.getElementById(
        "newArticle"
    );


    if(!area){

        return;

    }



    let articles =
    getArticles();



    area.innerHTML = "";



    articles
    .filter(

        a => a.status === "公開"

    )
    .forEach(function(article){


        area.innerHTML += `


        <div class="article-card">


        <img src="${article.image}">


        <div class="article-card-content">


        <span class="category">

        ${article.category}

        </span>



        <h3>

        ${article.title}

        </h3>



        <p>

        ${article.description}

        </p>



        <button class="button"
        onclick="openArticle(${article.id})">

        詳細を見る

        </button>


        </div>


        </div>


        `;


    });


}







// 管理画面の記事一覧

function loadAdminArticles(){



    let area =
    document.getElementById(
        "adminArticles"
    );


    if(!area){

        return;

    }




    let articles =
    getArticles();



    area.innerHTML = "";




    articles.forEach(function(article){



        area.innerHTML += `


        <div class="card">


        <h3>

        ${article.title}

        </h3>


        <p>

        ${article.category}

        </p>


        <button class="button"
        onclick="editArticle(${article.id})">

        編集

        </button>


        <button class="button"
        onclick="deleteArticle(${article.id})">

        削除

        </button>


        </div>


        `;



    });


}






// 編集

function editArticle(id){


    localStorage.setItem(

        "editId",

        id

    );


    location.href =
    "admin.html";


}







// 削除

function deleteArticle(id){



    if(
        confirm(
        "削除しますか？"
        )
    ){



        let articles =
        getArticles();



        articles =
        articles.filter(

            a => a.id != id

        );



        saveArticles(
            articles
        );



        location.reload();



    }


}







// 検索

function searchArticle(){



    let word =
    document.getElementById(
        "search"
    ).value;



    let articles =
    getArticles();



    let area =
    document.getElementById(
        "newArticle"
    );



    area.innerHTML = "";



    articles
    .filter(

        a =>
        a.title.includes(word)

    )
    .forEach(function(article){



        area.innerHTML += `


        <div class="article-card">


        <img src="${article.image}">


        <div class="article-card-content">


        <h3>

        ${article.title}

        </h3>


        <button class="button"
        onclick="openArticle(${article.id})">

        読む

        </button>


        </div>


        </div>


        `;


    });


}







// カテゴリー絞り込み

function filterCategory(category){



    let articles =
    getArticles();



    let area =
    document.getElementById(
        "newArticle"
    );



    area.innerHTML = "";



    articles
    .filter(function(a){


        if(category === "全部"){

            return true;

        }


        return a.category === category;



    })
    .forEach(function(article){



        area.innerHTML += `


        <div class="article-card">


        <img src="${article.image}">


        <div class="article-card-content">


        <span class="category">

        ${article.category}

        </span>


        <h3>

        ${article.title}

        </h3>



        <button class="button"
        onclick="openArticle(${article.id})">

        読む

        </button>


        </div>


        </div>


        `;


    });


}







// 人気記事

function loadRanking(){


    let area =
    document.getElementById(
        "ranking"
    );



    if(!area){

        return;

    }




    let articles =
    getArticles();



    articles.sort(

        (a,b)=>
        b.views-a.views

    );



    area.innerHTML = "";



    articles
    .slice(0,5)
    .forEach(function(article,index){



        area.innerHTML += `


        <div class="rank-item">


        <div class="rank-number">

        ${index+1}

        </div>



        <div>

        ${article.title}

        </div>


        </div>


        `;


    });


}







// 初期読み込み

document.addEventListener(

"DOMContentLoaded",

function(){


    loadHomeArticles();


    loadArticles();


    loadAdminArticles();


    loadRanking();



});