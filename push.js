var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDrnAv7Lxbpra1hF5b1V-HIAVsiMbHpdf1Lj7PT4wvpR8cahh5KVnAiP5V1JSQ4rjligAx9QlOXR2nVphI800EI",
   "privateKey": "ByFeMg28FeunyilMk4sl9AsigfkfsztiYvpleezZ8Gc"
};
 
 
webPush.setVapidDetails(
   'mailto:cipto.suheri@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dAIM5NQXLTU:APA91bEXmRq6eOcw22PMIzYGXbM1_k8QaUyOpxYyRuk_J0ZhMWmp5_xq1MvQIC40J2eEUPxAA5hf0FToS3NcXaaK6HRGd9jAu-KTnBCCh6ZK0xI98vcM9opJeLHDlkQaK6BtJ96SheCy",
   "keys": {
       "p256dh": "BC9HANYQJDwey+m7ao3C/RoH11HkDXVn0KPklAeoE8XeyqBJG/I3s1QZ2NpZp8T0gpaFRjhU1v3ZbT8OL3TM8mw=",
       "auth": "sdOkROQVuMOaGRiIBnHPSw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '869980717923',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);