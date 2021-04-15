var socket = io.connect('http://localhost:3000');
var message = document.getElementById('message'),
      from = document.getElementById('from'),
      to = document.getElementById('to'),
      btn = document.getElementById('send');
      firstPersonMessages = document.getElementById('firstPersonMessages'),
      secondPersonMessages = document.getElementById('secondPersonMessages');

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
        firstPersonMessages.innerHTML += '<li>'+ data.message + '</li>';
    }
    else if(data.from==to.value && data.to==from.value)
    {
        secondPersonMessages.innerHTML += '<li>'+ data.message + '</li>';
    }

});
