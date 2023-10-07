import { according } from "../utilities/image";

const data = [
  {
    title: "The benefits of a real-time chat application",
    message:
      "A chat application makes it easy to communicate with people anywhere in the world by sending and receiving messages in real time. With a web or mobile chat app, users are able to receive the same engaging and lively interactions through custom messaging features, just as they would in person. This also keeps users conversing on your platform instead of looking elsewhere for a messaging solution. Whether it’s private chat, group chat, or large-scale chat, adding personalized chat features to your app can help ensure that your users have a memorable experience.",
  },
  {
    title: "What to consider when building real-time chat applications",
    message:
      "More people are embracing virtual experiences as a way to connect with one another. From gamer group chat messaging in a live chat to e-learning and team communication using chat rooms and file sharing among co-workers, online chat applications have grown largely in popularity because of their ability to retain the feel of a real-time conversation, virtually. However, when thinking ahead to how you want to build your web app, a vital thing to consider is your customer's experience. What are the essential features and functionalities that are needed to make an engaging real-time chat app that will lead to user retention? Let’s dive in.",
  },
  {
    title: "Real time chat needs engaging messaging features",
    message:
      "A digital chat app that’s composed of real-time messaging features enables users to have an authentic and interactive experience. Features like message reactions, stickers, emojis, GIFs, and voice calls and video chat, provide a way to engage your users directly on your app instead of external platforms–creating a more connected experience. Other functionalities like identifying active users, push notifications, and message history—to name a few—also add to that immediacy by automatically detecting the presence of users in a real-time chat application.",
  },
  {
    title: "Scalability of your real-time chat app",
    message:
      "When building a real-time chat application, another key factor to consider is concurrency. Whether a private chat, group chat, or large-scale chat experience, being able to build your chat app without worrying about user fluctuations and concurrency limits on your platform is crucial. And as your user base grows, choosing a chat app solution that scales with you will ultimately be a benefit as your developers can focus on delivering engaging in-app chat experiences to your users. ",
  },
  {
    title: "Your online chat application must operate reliably, in real-time",
    message:
      "A reliable and secure web chat plays a large role in ensuring a positive user experience in your app. Making sure that messages between active users are being sent and received in real-time fosters an engaging chat where users can immediately interact with each other. As a way to help enable this, the PubNub Data Stream Network offers a scalable and secure solution with real-time functionality and enterprise-grade security. ",
  },
  {
    title: "Real time chat applications need modern security",
    message:
      "When dealing with sensitive information like compliance requirements or personal user information, making sure that your real-time chat application has the proper security features in place is crucial for ensuring that the data of those using your app is protected—for instance, implementing an in-app HIPAA-compliant chat for a telemedicine use case. Additionally, other robust security safeguards for chat apps can be enabled through messaging APIs and access permissions enabled on the backend for who is able to control things at the user, device, channel, or key level.",
  },
];

const According = () => {
  return (
    <div className="max-w-screen-2xl mx-auto my-32">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="col-span-1 p-3">
          <img
            src={according}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="col-span-1 p-3 space-y-3">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">
              The Benefits of Building a Real-Time Chat Application
            </h1>
            <p>
              Messaging has become a part of our everyday lives in part due to
              its convenience for real-time chat communication and simple-to-use
              functionality.
            </p>
          </div>

          {data.map(({ title, message }, index) => (
            <div key={index} className="collapse collapse-plus">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium text-bluePigment">
                {title}
              </div>
              <div className="collapse-content">
                <p>{message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default According;
