const AboutUs = () => {
    return (

        // Main container using a flex layout for small and large devices
        <div className="sm:flex items-center max-w-screen-xl mx-auto p-10">

            {/* Image section */}
            <div className="sm:w-1/2">
                <div className="image object-center text-center">
                    <img
                        src="https://i.imgur.com/WbQnbas.png"
                        alt="About Us"
                        className="w-96 h-96 max-w-2xl"
                    />
                </div>
            </div>

            {/* Text section */}
            <div className="sm:w-1/2 p-5 flex flex-col justify-center">

                <div className="text">

                    {/* Section title "About Us" */}
                    <span className="text-gray-800 font-bold border-b-2 border-indigo-600 uppercase">
                        About Us
                    </span>

                    {/* Main title */}
                    <h2 className="my-4 font-bold text-3xl sm:text-4xl">
                        Welcome to <span className="text-indigo-600">CommerceHub</span>
                    </h2>

                    {/* Company description */}
                    <p className="text-gray-700">
                        At CommerceHub, we are dedicated to revolutionizing the way people shop and sell online.
                        Our e-commerce platform is designed to connect buyers and sellers from all over the world,
                        creating a seamless marketplace that thrives on convenience and accessibility.
                        Whether you're a small business owner looking to reach a broader audience or a consumer in search of
                        quality products, CommerceHub is your go-to destination for all things e-commerce.
                    </p>
                    <p className="text-gray-700 mt-4">
                        Our mission is to empower entrepreneurs and consumers alike by providing a user-friendly platform that
                        facilitates effortless transactions. We believe that shopping should be enjoyable and hassle-free,
                        which is why we have integrated cutting-edge technology to ensure a smooth user experience.
                        From intuitive search features to secure payment options, every aspect of our platform is designed
                        with you in mind.
                    </p>
                    <p className="text-gray-700 mt-4">
                        At CommerceHub, we pride ourselves on our commitment to quality and customer satisfaction.
                        Our extensive range of products is carefully curated to meet diverse needs and preferences.
                        We work with trusted sellers to ensure that every item available on our platform meets our high standards
                        for quality and reliability. Our dedicated customer support team is always ready to assist you,
                        ensuring that your shopping experience is nothing short of exceptional.
                    </p>
                    <p className="text-gray-700 mt-4">
                        In addition to our focus on quality, we understand the importance of building a community.
                        CommerceHub is more than just a marketplace; it’s a space where buyers and sellers can connect,
                        share experiences, and foster relationships. We encourage our users to leave reviews and ratings,
                        contributing to a transparent environment that helps others make informed decisions.
                    </p>
                    <p className="text-gray-700 mt-4">
                        Join us on this exciting journey as we continue to innovate and enhance the online shopping experience.
                        Together, we can create a thriving ecosystem that empowers individuals and businesses alike.
                        Thank you for choosing CommerceHub, where every purchase and sale contributes to a vibrant community of
                        commerce.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
