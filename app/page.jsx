import Feed from "@components/Feed";

const Home = () => {
  return (
  
      <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Lets Bummel
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> Die App von Kooperierte, für Kooperierte
        </span> 
      </h1>
      <p className="desc text-center">
        Lets Bummel ist eine Web-App,
        die dir dabei hilft,
        den Kontakt zu anderen Verbindungen besser herzustellen!
      </p>
      <Feed />
      </section>
  )
}

export default Home