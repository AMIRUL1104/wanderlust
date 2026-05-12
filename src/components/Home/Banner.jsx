import { Separator } from "@heroui/react";

const Banner = () => {
  return (
    <div className="bg-[url('/assets/banner.png')] bg-cover bg-center text-white flex justify-between flex-col items-center gap-5 min-h-[500px] lg:h-150">
      {/* Top Content Section */}
      <div className="p-6 md:p-10 text-center flex justify-center flex-col items-center gap-3.5 flex-1">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Discover Your <br className="hidden md:block" /> Next Adventure
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl max-w-2xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <button className="uppercase bg-cyan-500 px-8 py-3 cursor-pointer hover:bg-cyan-600 transition-all font-medium">
            Explore Now
          </button>

          <button className="uppercase px-8 py-3 bg-white/20 backdrop-blur-sm border border-white/30 cursor-pointer hover:bg-white/40 transition-all font-medium">
            View Destination
          </button>
        </div>
      </div>

      {/* Bottom Search Bar Section */}
      <div className="bg-white/30 backdrop-blur-md flex flex-wrap md:flex-nowrap justify-between gap-y-4 w-full items-center p-4 md:p-0">
        <div className="px-4 py-2 w-1/2 md:w-auto">
          <h3 className="text-xs md:text-sm font-semibold">Location</h3>
          <p className="text-[10px] md:text-xs">Address, City or Zip</p>
        </div>

        <div className="hidden md:block">
          <Separator
            variant="tertiary"
            orientation="vertical"
            className="h-10"
          />
        </div>

        <div className="px-4 py-2 w-1/2 md:w-auto">
          <h3 className="text-xs md:text-sm font-semibold">Date/Duration</h3>
          <p className="text-[10px] md:text-xs">Anytime/3 Days</p>
        </div>

        <div className="hidden md:block">
          <Separator
            variant="tertiary"
            orientation="vertical"
            className="h-10"
          />
        </div>

        <div className="px-4 py-2 w-1/2 md:w-auto">
          <h3 className="text-xs md:text-sm font-semibold">Budget</h3>
          <p className="text-[10px] md:text-xs">$0-$3000</p>
        </div>

        <div className="hidden md:block">
          <Separator
            variant="tertiary"
            orientation="vertical"
            className="h-10"
          />
        </div>

        <div className="px-4 py-2 w-1/2 md:w-auto">
          <h3 className="text-xs md:text-sm font-semibold">People</h3>
          <p className="text-[10px] md:text-xs">5-10</p>
        </div>

        <div className="bg-cyan-500 py-4 px-8 w-full md:w-auto text-center cursor-pointer hover:bg-cyan-600 transition-all">
          <h3 className="font-bold uppercase text-sm">Search</h3>
        </div>
      </div>
    </div>
  );
};

export default Banner;
