import { Layout } from "./Layout";
export const Dashboard = () => {
  return (
    <>
      <Layout>
        <div className="content-grid w-[100%]">
          <div className="m-auto lg:pt-0 pt-20 pb-20">
            <h2 className="heading font-[Young_Serif,serif] text-center  mb-2 ">
              Welcome to The Website
            </h2>
            <p className="text-center mb-16">
              This is the demo of the pages present in the website. Take a look
              at them here.
            </p>
            <div className="cards grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
              <section className="card  ">
                <img
                  src="images/img-1.jpg"
                  alt="counter-page"
                  className=" object-center object-cover rounded-lg "
                />
              </section>
              <section className="card  ">
                <img
                  src="images/img-2.jpg"
                  alt="Editor-page"
                  className=" object-center object-cover rounded-lg"
                />
              </section>
              <section className="card">
                <img
                  src="images/img-3.jpg"
                  alt="User-form-page"
                  className=" object-center object-cover rounded-lg"
                />
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
