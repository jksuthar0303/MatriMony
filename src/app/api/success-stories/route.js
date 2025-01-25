import connectMongo from '../../../lib/dB';
import SuccessStory from '../../../models/SuccessStories';

export async function GET() {
  try {
    await connectMongo();
    const successStories = await SuccessStory.find();
    return new Response(JSON.stringify(successStories), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error fetching success stories', error }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectMongo();
    const body = await req.json();
    const { image, name, story, date } = body;

    const newSuccessStory = new SuccessStory({
      image,
      name,
      story,
      date: new Date(date),
    });

    await newSuccessStory.save();
    return new Response(JSON.stringify({ message: 'Success story added successfully', successStory: newSuccessStory }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error adding success story', error: error.message }), { status: 500 });
  }
}
