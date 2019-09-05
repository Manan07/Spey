const Socket = io()

// URL Boi
const { Room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
Socket.emit('RoomToJoin', Room)

// Chat Page

const MsgHandle = document.querySelector('.Handle')
const MsgInput = document.querySelector('.Message')
const SendBtn = document.querySelector('.Send-Btn')
const ChatOutput = document.querySelector('.ChatOutput')
const Details = document.querySelector('.Details')


const Da = new Date();
const newTime = Da.toLocaleTimeString();

let Value;
const Modal = document.querySelector('.Modal')
const ModalGo = document.querySelector('.ModalGo')

// Function

const scrollToMsg = () => {
 const MsgElem = document.querySelectorAll('.Msg')
 MsgElem[MsgElem.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
}

const CSSBuff = () => {
 const MsgElem = document.querySelectorAll('.Msg')
 console.log(MsgElem[MsgElem.length - 1].innerText.length)

if(MsgElem[MsgElem.length - 1].innerText.length >= 350) {
 MsgElem[MsgElem.length - 1].style.borderRadius = 0
}
}

// Actual Lifting

ModalGo.onclick = function() {
 if(MsgHandle.value === '') {
  alert('Input Field is empty, Username is Required!')
 }

 else {
 Value = MsgHandle.value;
 Modal.classList.add('scale-out-center')
 setTimeout(function() {
  Modal.style.display = 'none'
 }, 500)
 }
}

// Emmit Event

MsgHandle.addEventListener("keydown", function() {
 if (event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
  Value = MsgHandle.value;
  Modal.classList.add('scale-out-center')
  setTimeout(function() {
  Modal.style.display = 'none'
 }, 500)
 }
})

SendBtn.addEventListener('click', function() {
if(MsgInput.value === '') {
 alert("Empty Fields won't do the Job")
}

else {
 Socket.emit('chat', {
  RoomName: Room,
  Handle: Value,
  Content: MsgInput.value
 })

MsgInput.value = ""
}
})

MsgInput.addEventListener('keyup', function() {
 if (event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
  if(MsgInput.value === '') {
 alert("Empty Fields won't do the Job")
}

else {
 Socket.emit('chat', {
  RoomName: Room,
  Handle: Value,
  Content: MsgInput.value
 })

MsgInput.value = ""
}
}
})

Socket.on('chatMsgs', function(data) {
 if(data.Handle === MsgHandle.value) {
 ChatOutput.innerHTML += '<div class="Sender"><span class="Detail-Sender">' + data.Handle + ' (You) - ' + newTime + '</span>' + '<p class="Msg Msg-Sender">' + data.Content + '</p>' + '</div>'
 scrollToMsg()
 CSSBuff()
 }
 else {
 // ChatOutput.innerHTML += '<p class="Msg Msg-Reciever"><span class="Details">' + data.Handle + ' - ' + newTime + '</span>' + data.Content + '</p>'
 ChatOutput.innerHTML += '<div class="Reciever"><span class="Detail-Reciever">' + data.Handle + ' - ' + newTime + '</span>' + '<p class="Msg Msg-Reciever">' + data.Content + '</p>' + '</div>'
 scrollToMsg()
 CSSBuff()
}
})