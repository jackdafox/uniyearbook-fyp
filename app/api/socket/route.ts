import prisma from '@/app/prisma';
import { Server } from 'socket.io';

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('join-room', (roomId: string) => {
        socket.join(roomId);
      });

      socket.on('send-message', async (data) => {
        const message = await prisma.message.create({
          data: {
            content: data.content,
            userId: data.userId,
            roomId: data.roomId,
          },
          include: {
            user: true,
          },
        });
        
        io.to(data.roomId).emit('new-message', message);
      });
    });
  }
  res.end();
};

export default ioHandler;