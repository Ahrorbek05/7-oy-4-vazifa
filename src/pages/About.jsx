import React from 'react';

function About() {
  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-6xl font-bold text-slate-700">We love</h1>
          <span className="bg-blue-600 mt-5 text-white tracking-widest text-3xl font-bold pb-5 rounded-2xl px-8 py-4">
            comfy
          </span>
        </div>
        <p className=" text-xl text-slate-600 mt-4 max-w-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia facere, mollitia ex, maxime cupiditate porro tempora explicabo numquam corporis nostrum delectus dolores aut. Veniam tempore iure at nam commodi ut beatae iste quibusdam fuga cum velit, corporis eligendi ratione blanditiis?
        </p>
      </div>
    </div>
  );
}

export default About;
