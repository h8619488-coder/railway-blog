/* =================================
   小6の鉄道ブログ v1.0
   script.js
================================= */


/* Firebase設定後にここへ追加 */



// ================================
// 記事取得
// ================================

function getArticles(){

    return JSON.parse(
        localStorage.getItem("articles")
    ) || [];

}




// ================================
// ログイン
// ================================

function login(){


    const id =
    document.getElementById("id").value;


    const password =
    document.getElementById("password").value;



    if(
        id === "admin" &&
        password === "1234"
    ){


        localStorage.setItem(
            "login",
            "true"
        );


        location.href="admin.html";


    }else{


        alert(
        "IDまたはパスワードが違います"
        );


    }


}




// ================================
// ログアウト
// ================================

function logout(){

    localStorage.removeItem(
        "login"
    );


    location.href="login.html";

}




// ================================
// ログイン確認
// ================================

function checkLogin(){


    if(
        localStorage.getItem("login")
        !== "true"
    ){

        location.href="login.html";

    }


}





// ================================
// 画像プレビュー
// ================================

function previewImage(){


    const file =
    document.getElementById("image")
    .files[0];



    if(!file){

        return;

    }



    const reader =
    new FileReader();



    reader.onload=function(e){


        document.getElementById(
        "preview"
        ).src=e.target.result;


    };


    reader.readAsDataURL(file);


}
/* ================================
   記事保存
================================ */


function saveArticle(){


    let title =
    document.getElementById("title").value;


    let description =
    document.getElementById("description").value;


    let content =
    document.getElementById("content").value;


    let category =
    document.getElementById("category").value;


    let status =
    document.getElementById("status").value;



    let image =
    document.getElementById("image").value;



    let articles =
    getArticles();



    let article={


        id:Date.now(),


        title:title,


        description:description,


        content:content,


        category:category,


        image:image,


        status:status,


        views:0,


        date:new Date()
        .toLocaleDateString("ja-JP")

    };



    articles.push(article);



    localStorage.setItem(

        "articles",

        JSON.stringify(articles)

    );



    alert(
    "記事を保存しました"
    );



    location.href="articles.html";


}






/* ================================
   記事一覧表示
================================ */


function loadArticle(){


    const area =
    document.getElementById(
    "newArticle"
    );



    if(!area){

        return;

    }



    let articles =
    getArticles();



    area.innerHTML="";



    articles.reverse()
    .forEach(function(article,index){



        if(
        article.status==="下書き"
        ){

            return;

        }



        area.innerHTML += `


        <article class="card fade">


        ${article.image ?

        `<img src="${article.image}">`

        :

        ""

        }



        <span class="category">

        ${article.category}

        </span>



        <h3>

        ${article.title}

        </h3>



        <p class="date">

        ${article.date}

        </p>



        <p>

        ${article.description}

        </p>



        <a class="button"
        onclick="openArticle(${article.id})">

        記事を見る

        </a>



        </article>


        `;


    });


}





// ================================
// 記事を開く
// ================================


function openArticle(id){


    localStorage.setItem(

        "openArticle",

        id

    );


    location.href="article.html";


}
/* ================================
   記事ページ表示
================================ */


function loadArticlePage(){


    const id =

    localStorage.getItem(
    "openArticle"
    );



    let articles =
    getArticles();



    let article =

    articles.find(

        a => a.id == id

    );



    if(!article){

        return;

    }



    // 閲覧数アップ

    article.views++;



    localStorage.setItem(

        "articles",

        JSON.stringify(articles)

    );



    document.getElementById(
    "articleTitle"
    ).innerHTML =
    article.title;



    document.getElementById(
    "articleDate"
    ).innerHTML =
    "投稿日："+article.date;



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



    loadComments();


}







/* ================================
   記事編集
================================ */


function editArticle(id){


    localStorage.setItem(

        "editArticle",

        id

    );


    location.href="admin.html";


}





/* ================================
   記事削除
================================ */


function deleteArticle(id){


    let articles =
    getArticles();



    articles =

    articles.filter(

        a => a.id != id

    );



    localStorage.setItem(

        "articles",

        JSON.stringify(articles)

    );



    location.reload();


}







/* ================================
   管理画面表示
================================ */


function loadAdminArticles(){


    const area =

    document.getElementById(
    "adminArticles"
    );



    if(!area){

        return;

    }



    let articles =
    getArticles();



    area.innerHTML="";



    articles.forEach(function(article){



        area.innerHTML += `


        <div class="card">


        <h3>

        ${article.title}

        </h3>


        <p>

        ${article.category}

        |

        ${article.status}

        </p>



        <button onclick="editArticle(${article.id})">

        編集

        </button>



        <button onclick="deleteArticle(${article.id})">

        削除

        </button>


        </div>


        `;


    });


}
/* ================================
   コメント機能
================================ */


function addComment(){


    let name =

    document.getElementById(
    "commentName"
    ).value;



    let text =

    document.getElementById(
    "commentText"
    ).value;



    let id =

    localStorage.getItem(
    "openArticle"
    );



    let comments =

    JSON.parse(

    localStorage.getItem(
    "comments"
    )

    ) || [];



    comments.push({

        article:id,

        name:name,

        text:text,

        date:new Date()
        .toLocaleDateString("ja-JP")

    });



    localStorage.setItem(

        "comments",

        JSON.stringify(comments)

    );



    loadComments();


}





function loadComments(){


    const area =

    document.getElementById(
    "comments"
    );



    if(!area){

        return;

    }



    let id =

    localStorage.getItem(
    "openArticle"
    );



    let comments =

    JSON.parse(

    localStorage.getItem(
    "comments"
    )

    ) || [];



    area.innerHTML="";



    comments

    .filter(

        c=>c.article==id

    )

    .forEach(function(c){



        area.innerHTML += `


        <div class="comment">


        <p class="comment-name">

        ${c.name}

        </p>


        <p>

        ${c.text}

        </p>


        <small>

        ${c.date}

        </small>


        </div>


        `;


    });


}








/* ================================
   人気記事
================================ */


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



    area.innerHTML="";



    articles.slice(0,5)

    .forEach(function(article,index){



        area.innerHTML += `


        <div class="rank-item">


        <span class="rank-number">

        ${index+1}

        </span>



        <p>

        ${article.title}

        <br>

        👁 ${article.views}

        </p>


        </div>


        `;


    });


}






/* ================================
   検索
================================ */


function searchArticle(){


    let word =

    document.getElementById(
    "search"
    ).value;



    let cards =

    document.querySelectorAll(
    ".card"
    );



    cards.forEach(function(card){


        if(

        card.innerText.includes(word)

        ){


            card.style.display="block";


        }else{


            card.style.display="none";


        }


    });


}






/* ================================
   起動
================================ */


window.onload=function(){


    loadArticle();


    loadAdminArticles();


    loadRanking();


};
/* ================================
   お問い合わせ
================================ */


function sendContact(){


    let name =

    document.getElementById(
    "contactName"
    ).value;



    let email =

    document.getElementById(
    "contactEmail"
    ).value;



    let message =

    document.getElementById(
    "contactMessage"
    ).value;



    let contacts =

    JSON.parse(

    localStorage.getItem(
    "contacts"
    )

    ) || [];



    contacts.push({


        name:name,


        email:email,


        message:message,


        date:new Date()

        .toLocaleDateString("ja-JP")


    });



    localStorage.setItem(

        "contacts",

        JSON.stringify(contacts)

    );



    alert(

    "お問い合わせを送信しました"

    );



}






/* ================================
   ダークモード
================================ */


function darkMode(){


    document.body.classList.toggle(

        "dark"

    );


}






/* ================================
   編集データ読み込み
================================ */


function loadEditArticle(){


    let id =

    localStorage.getItem(
    "editArticle"
    );



    if(!id){

        return;

    }



    let articles =
    getArticles();



    let article =

    articles.find(

        a=>a.id==id

    );



    if(!article){

        return;

    }



    document.getElementById(
    "title"
    ).value =
    article.title;



    document.getElementById(
    "description"
    ).value =
    article.description;



    document.getElementById(
    "content"
    ).value =
    article.content;



    document.getElementById(
    "category"
    ).value =
    article.category;



    document.getElementById(
    "status"
    ).value =
    article.status;



    document.getElementById(
    "image"
    ).value =
    article.image;



}






/* ================================
   Firebase接続用場所
================================ */


/*

あとでここに

Firebase Authentication
Firebase Firestore
Firebase Storage

を追加します。


現在はテスト用として

localStorage

で動作します。


*/





/* ================================
   初期処理
================================ */


document.addEventListener(

"DOMContentLoaded",

function(){


    loadArticle();


    loadAdminArticles();


    loadRanking();


    loadComments();


    loadEditArticle();



});