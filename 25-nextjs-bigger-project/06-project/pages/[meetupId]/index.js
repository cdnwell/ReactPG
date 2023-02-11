import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
  useRouter();

  return (
    <MeetupDetail
      image="https://images.unsplash.com/photo-1612074245862-dc7a57f02e16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1940&q=80"
      title="First Meetup"
      address="Some Street 5, Some City"
      description="This is a first meetup."
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback : false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId;

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        image:
          "https://images.unsplash.com/photo-1612074245862-dc7a57f02e16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1940&q=80",
        id: meetupId,
        title: "First Meetup",
        address: "Some Street 5, Some City",
        description: "This is a first meetup.",
      },
    },
  };
}

export default MeetupDetails;
