import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { chatValidationSchema } from 'validationSchema/chats';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.chat
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getChatById();
    case 'PUT':
      return updateChatById();
    case 'DELETE':
      return deleteChatById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getChatById() {
    const data = await prisma.chat.findFirst(convertQueryToPrismaUtil(req.query, 'chat'));
    return res.status(200).json(data);
  }

  async function updateChatById() {
    await chatValidationSchema.validate(req.body);
    const data = await prisma.chat.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteChatById() {
    const data = await prisma.chat.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
