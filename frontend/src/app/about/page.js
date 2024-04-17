"use client"

const About = () => {
    return (
        <>
            <div className="max-w-screen-xl px-4 py-32 mx-auto lg:flex lg:h-[100vh] ">
                <section class="bg-gray-900 text-white">
                    <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white">We help you to make the right choice</h2>
                            <p class="mb-4 text-white">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mt-8">
                            <img class="w-full rounded-lg" src="/one.jpeg" alt="office content 1" />
                            <img class="mt-4 w-full lg:mt-10 rounded-lg" src="/two.jpeg" alt="office content 2" />
                        </div>
                    </div>
                </section>
            </div >
        </>
    )
}

export default About