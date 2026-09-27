const crypto = require('crypto');

function generateUniqueId() {
  return crypto.randomBytes(8).toString('hex');  
}
function handleSocketConnection(socket,io) {
  const Room={
   creatorSocketId: "socket-A",
  participants: [
    { socketId: null, ready: true },
    { socketId: null, ready: false },
  ]
  }
socket.on('createRoom',()=>{
  const roomId = generateUniqueId();
  socket.join(roomId);
  socket.emit('room-created',{roomId});
});
//Ready State
socket.on('peer-ready', ({ RoomId }) => {
socket.to(RoomId).emit('peer-ready', { socketId: socket.id });
console.log("Peer is ready");
});
socket.on('joinRoom',(data)=>{
  socket.join(data.roomId);
 console.log(data);
   socket.to(data.roomId).emit('user-joined', { socketId: socket.id,Name:data.name });
});
socket.on('offer',({ offer, RoomId })=>{
  socket.to(RoomId).emit('offer', { offer });
  console.log("offers are received");
});
socket.on("answer",(data)=>{
  socket.to(data.RoomId).emit('answer', { answer: data.answer });
  console.log("answer-Sent");
});
socket.on("ice-candidate", (data) => {
  socket.to(data.RoomId).emit("ice-candidate", { candidate: data.candidate });
// console.log("ICE candidate received:");
});

socket.on("hangup", ({ RoomId }) => {
  socket.to(RoomId).emit("hangup", { socketId: socket.id });
  console.log("Hangup signal sent to room:", RoomId);
});
}
module.exports = { handleSocketConnection }; 