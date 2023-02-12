import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: { meetups: DUMMY_MEETUPS },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://cdnwellhk:L2uczUlpLFurEkew@cluster0.ubf7fpm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  // collection 안의 string은 컬렉션의 이름
  const meetupsCollection = db.collection("meetups");

  // promise를 반환하는 async 작업
  // 하지만 ID가 이상한 객체이고 데이터로 반환될 수 없어 기존 코드로는
  // 정상적으로 실행이 되지 않는다.
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
