window.onload = () => {
    /*
     * 送信イベントが発生したら実行
     */
    document.querySelector("#btnRegister").addEventListener('click', e => {
        // 規定の送信処理をキャンセル（画面遷移などしない）
        e.preventDefault();

        // passwordとpasswordConfirmが一致するかどうかを確認する


        // 送信データの準備
        let vUserId = document.getElementById("userId").value;
        let vPassword = document.getElementById("password").value;

        const loginData = {
            "userId": vUserId,
            "password": vPassword
        };

        const param = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(loginData)
        };

        fetch('/', param)
            .then((res) => {
                return res.text();
            })
            .then((text) => {
                console.log(text);
                if (text === 'OK') {
                    location.href = '/users/home';
                }
                else {
                    // ログイン失敗処理
                    console.log("ログイン失敗");

                    const errorList = document.getElementById("errorDiv");

                    if (errorList == null) {
                        // ログイン失敗時にエラーメッセージを表示する
                        const newElement = document.createElement("div");
                        const newContent = document.createTextNode("正しいユーザーID、パスワードを入力してください");
                        newElement.appendChild(newContent);
                        newElement.setAttribute("id", "errorDiv");
                        newElement.style.color = 'red';
                        const parent = document.getElementById("login");
                        const child = document.getElementById("loginForm");
                        parent.insertBefore(newElement, child);


                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
};