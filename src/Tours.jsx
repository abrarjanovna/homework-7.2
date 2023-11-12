import { useGlobalContext } from "./context";
import Tour from "./Tour";

export default function Tours() {
  const { data } = useGlobalContext();
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {data.map((tour) => {
          return <Tour key={tour.id} {...tour} />;
        })}
      </div>
    </section>
  );
}
