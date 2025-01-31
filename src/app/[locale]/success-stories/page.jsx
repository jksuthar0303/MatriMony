"use client"

import { useEffect, useState } from "react";

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);



useEffect(() => {
    async function fetchStories() {
      const res = await fetch('/api/success-stories');
      const data = await res.json();
      setStories(data);
      setLoading(false);
    }
    fetchStories();
  }, []);



    return (
      <div className="mx-auto p-8">
        <h1 className="text-4xl font-bold text-pink-600 text-center mb-8">
          Our Success Stories
        </h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
          Hear from our happy couples who found love through MyLifepair and started a beautiful journey together.
        </p>
  {
    loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
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
              <p className="mt-4 text-gray-500 text-sm">🩷 {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(story.date))}</p>
            </div>
          </div>
        ))}
      </div>
  }
        
  
        <div className="mt-12 text-center">
          <p className="text-gray-600">Do you have your own success story?</p>
          <a href="/contact" className="text-pink-600 font-bold hover:underline">
            Share Your Story
          </a>
        </div>
      </div>
    );
  }
  