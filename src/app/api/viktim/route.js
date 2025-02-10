import { PrismaClient } from '@prisma/client';

export async function GET() {
  const prisma = new PrismaClient();
  try {
    const activities = await prisma.viktimActivity.findMany({
      where: {
        approved: true,
      },
    });
    return new Response(JSON.stringify(activities), { status: 200 });
  } catch (error) {
    console.error('Error fetching activities:', error ? error.message : 'Unknown error');
    return new Response('Failed to fetch activities', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  const prisma = new PrismaClient();
  try {
    const { activity, approved } = await req.json();
    if (!activity || activity.trim().length === 0) {
      return new Response('Activity cannot be empty', { status: 400 });
    }

    const newActivity = await prisma.viktimActivity.create({
      data: {
        content: activity,
        approved: approved || false,
      },
    });

    return new Response(JSON.stringify(newActivity), { status: 200 });
  } catch (error) {
    console.error('Error submitting activity:', error ? error.message : 'Unknown error');
    return new Response('Failed to submit activity', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
