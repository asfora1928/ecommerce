export default function Footer() {
  return (
    <>
      <footer className="bg-gray-100 relative bottom-0 left-0 right-0">
        <div className="max-w-screen-lg px-4 py-8 mx-auto sm:px-6 lg:px-5">
          <div>
            <h3 className="text-xl">Get the Fresh Cart App</h3>
            <p className="max-w-xs mt-4 text-sm text-gray-600 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
              accusantium.
            </p>

            <div className="flex  md:flex-row flex-col gap-4">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="asfora@gmail.com"
                className=" w-300px md:w-[500px] xl:w-[800px] px-7   md:px-1 text-black placeholder-gray-400 transition-all duration-200  rounded-lg bg-transparent focus:outline-none focus:border-[#08ac0a] focus:bg-white caret-[#08ac0a] border-2 border-zinc-300 mr-5 "
              />

              <button className="px-4 py-2 rounded-lg text-white bg-[#0aad0a]">
                Share app link
              </button>
            </div>
          </div>

          <p className="mt-8 text-xs text-gray-800">© 2024 Comany Name</p>
        </div>
      </footer>
    </>
  );
}
