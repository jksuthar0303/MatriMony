export default function SuccessStories() {
    const stories = [
      {
        image: "https://images.pexels.com/photos/5829427/pexels-photo-5829427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Rahul & Priya",
        story: "We found each other through MyLifepair and couldn't be happier. Thank you for making our dreams come true!",
        date: "December 15, 2023",
      },
      {
        image: "https://images.pexels.com/photos/9778787/pexels-photo-9778787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Amit & Neha",
        story: "MyLifepair helped us connect and build a beautiful life together. It was truly meant to be!",
        date: "October 10, 2023",
      },
      {
        image: "https://images.pexels.com/photos/16375836/pexels-photo-16375836/free-photo-of-bride-and-groom-in-traditional-clothing-standing-head-to-head-and-smiling.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        name: "Raj & Simran",
        story: "Finding love seemed impossible, but MyLifepair changed our lives forever!",
        date: "August 20, 2023",
      },
      {
        image: "https://images.pexels.com/photos/18362002/pexels-photo-18362002/free-photo-of-smiling-and-kissing-newlyweds-in-traditional-clothing-with-garlands.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        name: "Arjun & Pooja",
        story: "A perfect match, and it's all thanks to MyLifepair! We are grateful for this wonderful journey.",
        date: "June 5, 2023",
      },
    ];
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-pink-600 text-center mb-8">
          Our Success Stories
        </h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Hear from our happy couples who found love through MyLifepair and started a beautiful journey together.
        </p>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-pink-600">{story.name}</h2>
                <p className="text-gray-700 mt-4">{story.story}</p>
                <p className="mt-4 text-gray-500 text-sm">🩷 {story.date}</p>
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-12 text-center">
          <p className="text-gray-600">Do you have your own success story?</p>
          <a href="/contact" className="text-pink-600 font-bold hover:underline">
            Share Your Story
          </a>
        </div>
      </div>
    );
  }
  