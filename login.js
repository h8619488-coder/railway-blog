import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ======================================
// Firebase設定
// ======================================

const firebaseConfig = {
  apiKey: "AIzaSyC7LGKrT8aBjUxY2Z-sFEfdFcKJ9FFR6kU",
  authDomain: "railway-blog.firebaseapp.com",
  projectId: "railway-blog",
  storageBucket: "railway-blog.firebasestorage.app",
  messagingSenderId: "1069239857028",
  appId: "1:1069239857028:web:1b54657f409efc8d3137d1",
  measurementId: "G-EVX4TDW12K"
};


// ======================================
// Firebaseを開始
// ======================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ======================================
// ログイン
// ======================================

window.login = async function () {

  const email =
    document.getElementById("email").value.trim();

  const password =
    document.getElementById("password").value;

  const error =
    document.getElementById("error");


  error.textContent = "";


  // 入力チェック

  if (!email || !password) {

    error.textContent =
      "メールアドレスとパスワードを入力してください。";

    return;
  }


  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );


    // ログイン成功

    window.location.href = "admin.html";


  } catch (e) {

    console.error(e);


    // エラーメッセージ

    if (
      e.code === "auth/invalid-credential" ||
      e.code === "auth/invalid-login-credentials"
    ) {

      error.textContent =
        "メールアドレスまたはパスワードが違います。";

    } else if (
      e.code === "auth/too-many-requests"
    ) {

      error.textContent =
        "ログイン試行が多すぎます。しばらく待ってからお試しください。";

    } else if (
      e.code === "auth/network-request-failed"
    ) {

      error.textContent =
        "ネットワークエラーが発生しました。";

    } else {

      error.textContent =
        "ログインできませんでした。もう一度お試しください。";

    }

  }

};