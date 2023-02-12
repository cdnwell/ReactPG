import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://cdnwellhk:L2uczUlpLFurEkew@cluster0.ubf7fpm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://cdnwellhk:L2uczUlpLFurEkew@cluster0.ubf7fpm.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  // .findOne()은 하나의 문서를 찾는다는 것을 의미합니다.
  // title is a first meetup에서 이 first meetup을 찾을 수 있습니다.
  // 이제 여기서 title이 아니라 id로 검색하길 원하므로 _id : meetupId를 입력하여 자동으로 추가되고
  // 생성된 ID 필드가 meetupId 값을 가지는지 확인하겠습니다.

  // 문자열을 객체 ID로 전환해서 정확한 ID를 찾아야 합니다.
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
