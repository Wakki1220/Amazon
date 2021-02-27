/*
 * ページの読み込みが完了したら実行
 */
window.onload = () => {
    /*
     * 送信イベントが発生したら実行
     */
    document.querySelector("#btnLogin").addEventListener('click', e => {
        // 規定の送信処理をキャンセル（画面遷移などしない）
        e.preventDefault();

        // 送信データの準備
        const vUserId = document.getElementById("userId").value;
        const vPassword = document.getElementById("password").value;

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

        // 
        fetch('/server/index.js', param)
            .then((res) => {
                return res.text();
            })
            .then((text) => {
                console.log("通信成功");
            })
            .catch((error) => {
                console.log("通信失敗");
            });
    });
};