/*

Name    : Responsive HTML5 Chat

Responsive HTML5 Chat helps you to create useful chatbox on your website easly. 
You can change skin and sizes. You can read the installation and support documentation 
before you begin. If you do not find the answer, do not hesitate to send a message to me.

Owner   : Vatanay Ozbeyli
Web     : www.vatanay.com
Support : hi@vatanay.com

*/

function responsiveChat(element) {
    $(element).html('<form class="chat"><span></span><div id="messagePane" class="messages"></div></form>');

    //<input type="text" placeholder="Your message"><input type="submit" value="Send">

    function showLatestMessage() {
      $('.responsive-html5-chat').find('.messages').scrollTop($('.responsive-html5-chat .messages')[0].scrollHeight);
    }
    showLatestMessage();

    // $(element + ' input[type="text"]').keypress(function (event) {
    //     if (event.which == 13) {
    //         event.preventDefault();
    //         $(element + ' input[type="submit"]').click();
    //     }
    // });


    // $(element + ' input[type="submit"]').click(function (event) {
    //     event.preventDefault();
    //     var message = $(element + ' input[type="text"]').val();
    //     if ($(element + ' input[type="text"]').val()) {
    //         var d = new Date();
    //         var clock = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    //         var month = d.getMonth() + 1;
    //         var day = d.getDate();
    //         var currentDate =
    //             (("" + day).length < 2 ? "0" : "") +
    //             day +
    //             "." +
    //             (("" + month).length < 2 ? "0" : "") +
    //             month +
    //             "." +
    //             d.getFullYear() +
    //             "&nbsp;&nbsp;" +
    //             clock;
    //         $(element + ' div.messages').append(
    //             '<div class="message" onclick="removeMessage(this)"><div class="myMessage"><p>' +
    //             message +
    //             "</p><date>" +
    //             currentDate +
    //             "</date></div></div>"
    //         );
    //         setTimeout(function () {
    //             $(element + ' > span').addClass("spinner");
    //         }, 100);
    //         setTimeout(function () {
    //             $(element + ' > span').removeClass("spinner");
    //         }, 2000);
    //     }
    //     $(element + ' input[type="text"]').val("");
    //     showLatestMessage(element);
    // });
    
}

function responsiveChatPush(element, sender, origin, date, message) {
    var originClass;
    if (origin == 'me') {
        originClass = 'myMessage';
    } else {
        originClass = 'fromThem';
    }
    $(element + ' .messages').append('<div class="message" onclick="removeMessage(this)"><div class="' + originClass + '"><p>' + message + '</p><date><b>' + sender + '</b> ' + date + '</date></div></div>');

    $('.responsive-html5-chat').find('.messages').scrollTop($('.responsive-html5-chat .messages')[0].scrollHeight);
}

/* Activating chatbox on element */
responsiveChat('.responsive-html5-chat');

/* Let's push some dummy data */
// responsiveChatPush('.chat', 'Kate', 'me', '08.03.2017 14:30:7', 'Angel Said: 🔥');
// responsiveChatPush('.chat', 'John Doe', 'you', '08.03.2016 14:31:22', 'Kazen Said: 🫠');
// responsiveChatPush('.chat', 'Kate', 'me', '08.03.2016 14:33:32', 'Some Dude Said: 😎');
// responsiveChatPush('.chat', 'Kate', 'me', '08.03.2016 14:36:4', 'Person Said: F0 9F 98 8E');
// responsiveChatPush('.chat', 'John Doe', 'you', '08.03.2016 14:37:12', 'Your Mom Said: 🌞');

function removeMessage(element) {
    console.log("clicked")
    // Remove the parent <div class="message"> element
    element.parentNode.removeChild(element);
}

function processData(data) {
    // Parse the received JSON data
    var message = JSON.parse(data);

    // Run your custom function with the received data
    // For example, you can log the name and emoji to the console
    console.log('Received Name:', message.name);
    console.log('Received Emoji:', message.emoji);

    return message
}

// Create a WebSocket connection
var ws = new WebSocket('wss://kazar4.com:8082');

// WebSocket connection opened
ws.onopen = function() {
    console.log('WebSocket connection established.');
};

// WebSocket received data
ws.onmessage = function(event) {
    // Call the processData function with the received data
    let message = processData(event.data);

    function interpret(s) {
        return eval("(function(){ return '" + s + "'})()");
    }  
    
    message.emoji = interpret(message.emoji)
    console.log(message.emoji)
    console.log("\ud83d")
    console.log("\ud83d\udd25")

    //message.name + ' Said: ' + 

    //message.name + ' Said: ' + 

    var d = new Date();
    let time = (d.getHours() % 12 || 12) + ":" + (d. getMinutes() < 10 ? '0' : '') + d.getMinutes()

    if (message.color == "blue") {
        responsiveChatPush('.chat', message.name, 'me', time, message.emoji);


    } else {
        responsiveChatPush('.chat', message.name, 'you', time, message.emoji);
    }

};

// WebSocket connection closed
ws.onclose = function() {
    console.log('WebSocket connection closed.');
};

/* DEMO */
if (parent == top) {
  $("a.article").show();
}



setInterval(function(){
    var d = new Date();
    $("#curTime").html((d.getHours() % 12 || 12) + ":" + (d. getMinutes() < 10 ? '0' : '') + d. getMinutes())
 }, 1);