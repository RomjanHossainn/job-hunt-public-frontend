
const Banner = () => {
    return (
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-xl lg:text-left">
            <h1 className="text-5xl font-bold leadi sm:text-6xl">
              Millions of jobs and people hiring
            </h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">
              Find the right job or internship for you.Post your job for
              millions of people to see.Let the right people know you’re open to
              work
              {/* <br className="hidden md:inline lg:hidden">turpis pulvinar, est scelerisque ligula sem</br> */}
            </p>
            <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold border rounded dark:bg-violet-400 dark:text-gray-900"
              >
                Comunity
              </a>
              <a
                rel="noopener noreferrer"
                href="#"
                className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100"
              >
                learn more
              </a>
            </div>
          </div>
          <div className="flex  lg:w-1/2 items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <img
              src="https://apollo-singapore.akamaized.net/v1/files/feuaf50gwo3t1-IN/image;s=780x0;q=60"
              alt=""
              className="object-contain h-72 sm:h-80 lg:h-[450px] "
            />
          </div>
        </div>
      </section>
    );
};

export default Banner;