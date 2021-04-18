var port = "http://localhost:3000" || "https://theboringcollege.herokuapp.com"; 
var socket = io.connect("https://theboringcollege.herokuapp.com");
var message = document.getElementById('message'),
      from = document.getElementById('from'),
      to = document.getElementById('to'),
      btn = document.getElementById('send');
      chatwindow = document.getElementById('chatWindow');
      
// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        from:from.value,
        to:to.value,
        message: message.value
    });
    message.value = "";
});


// Listen for events
socket.on('chat', function(data){
    
    if(data.from==from.value && data.to==to.value)
    {
        
        var firstPersonMessages = document.createElement("div");
        firstPersonMessages.setAttribute("class","firstuser button is-rounded");
        firstPersonMessages.innerHTML = '<p>'+ data.message + '</p>';
        chatwindow.appendChild(firstPersonMessages);
        
    }
    else if(data.from==to.value && data.to==from.value)
    {
        var secondPersonMessages = document.createElement("div");
        secondPersonMessages.setAttribute("class","seconduser button is-rounded");
        secondPersonMessages.innerHTML = '<p>'+ data.message + '</p>';
        chatwindow.appendChild(secondPersonMessages);
    }

});
