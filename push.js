let webPush = require("web-push");

const vapidKeys = {
    "publicKey": "BOHDtbguCKO1KGZ06Q31i0a5E9rFUF-CT0VbN8gMlGNKBu6MRLS50wEPFmEm8A_7SLTq9RD_sjRPmm1yYxUehXQ",
    "privateKey": "AQxRpqUTomrxXEs7WzZ5w9QXhqBE3GbreVybqPNC69sAQxRpqUTomrxXEs7WzZ5w9QXhqBE3GbreVybqPNC69s"
};

webPush.setVapidDetails(
    'mailto:denny.pyp11@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fLkmYWyP_M4:APA91bFZ685X0nq62RVaGt_ZgL6wSCq1mphG0IShzWL2A5kgKr5NwvvzYJnNTIYnEfoPKFXruXJCZNJDsKyolkYzsE9HXwbgfsom_SvahFghLIV8_2AT_YW65LaoTDzOR0VT20BdbM_Q",
    "keys": {
        "p256dh": "BNWbhbekcOBjflM3rZrOMm3ApaOxZ1t/0f42/E1Jvgw+PtIuux79uoLIcsCthiDFSoF2G86Ce/oBtqHXXFGPun4=",
        "auth": "76Wnutev/gHOXZ43MlpYWg=="
    }
};

let payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

let options = {
    gcmAPIKey: "231054452926",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);