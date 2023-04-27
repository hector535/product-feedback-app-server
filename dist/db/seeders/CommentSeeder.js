import { Seeder } from "@mikro-orm/seeder";
import { Comment, Feedback, User } from "../entities/index.js";
export class CommentSeeder extends Seeder {
    async run(em) {
        //Comments of Feedback 1
        await em.insertMany(Comment, [
            {
                content: "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
                feedback: em.getReference(Feedback, 1),
                commentator: em.getReference(User, 1),
            },
            {
                content: "Please use fun, color-coded labels to easily identify them at a glance",
                feedback: em.getReference(Feedback, 1),
                commentator: em.getReference(User, 2),
            },
        ]);
        //Comments of Feedback 2
        await em.insertMany(Comment, [
            {
                content: "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
                feedback: em.getReference(Feedback, 2),
                commentator: em.getReference(User, 3),
            },
            {
                content: "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
                feedback: em.getReference(Feedback, 2),
                commentator: em.getReference(User, 4),
            },
        ]);
        //Replies of comments of Feedback 2
        await em.insertMany(Comment, [
            {
                content: "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
                feedback: em.getReference(Feedback, 2),
                commentator: em.getReference(User, 5),
                replyingTo: em.getReference(Comment, 4),
            },
            {
                content: "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
                feedback: em.getReference(Feedback, 2),
                commentator: em.getReference(User, 6),
                replyingTo: em.getReference(Comment, 4),
            },
        ]);
        //Comments of Feedback 3
        await em.insertMany(Comment, [
            {
                content: "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
                feedback: em.getReference(Feedback, 3),
                commentator: em.getReference(User, 7),
            },
        ]);
        //Comments of Feedback 4
        await em.insertMany(Comment, [
            {
                content: "Right now, there is no ability to add images while giving feedback which isn't ideal because I have to use another app to show what I mean",
                feedback: em.getReference(Feedback, 4),
                commentator: em.getReference(User, 8),
            },
            {
                content: "Yes I'd like to see this as well. Sometimes I want to add a short video or gif to explain the site's behavior...",
                feedback: em.getReference(Feedback, 4),
                commentator: em.getReference(User, 9),
            },
        ]);
        //Comments of Feedback 5
        await em.insert(Comment, {
            content: "I also want to be notified when devs I follow submit projects on FEM. Is in-app notification also in the pipeline?",
            feedback: em.getReference(Feedback, 5),
            commentator: em.getReference(User, 10),
        });
        //Reply to comment of Feedback 5
        await em.insert(Comment, {
            content: "Bumping this. It would be good to have a tab with a feed of people I follow so it's easy to see what challenges they’ve done lately. I learn a lot by reading good developers' code.",
            feedback: em.getReference(Feedback, 5),
            commentator: em.getReference(User, 11),
            replyingTo: em.getReference(Comment, 10),
        });
        //Comment of Feedback 5
        await em.insert(Comment, {
            content: "I've been saving the profile URLs of a few people and I check what they’ve been doing from time to time. Being able to follow them solves that",
            feedback: em.getReference(Feedback, 5),
            commentator: em.getReference(User, 12),
        });
        //Comments of Feedback 7
        await em.insertMany(Comment, [
            {
                content: "This would be awesome! It would be so helpful to see an overview of my code in a way that makes it easy to spot where things could be improved.",
                feedback: em.getReference(Feedback, 7),
                commentator: em.getReference(User, 10),
            },
            {
                content: "Yeah, this would be really good. I'd love to see deeper insights into my code!",
                feedback: em.getReference(Feedback, 7),
                commentator: em.getReference(User, 12),
            },
        ]);
        //Comment of Feedback 8
        await em.insert(Comment, {
            content: "Having a path through the challenges that I could follow would be brilliant! Sometimes I'm not sure which challenge would be the best next step to take. So this would help me navigate through them!",
            feedback: em.getReference(Feedback, 8),
            commentator: em.getReference(User, 7),
        });
        //Comment of Feedback 9
        await em.insert(Comment, {
            content: "I haven't built a portfolio site yet, so this would be really helpful. Might it also be possible to choose layout and colour themes?!",
            feedback: em.getReference(Feedback, 9),
            commentator: em.getReference(User, 6),
        });
        //Comment of Feedback 10
        await em.insert(Comment, {
            content: "This would be great! At the moment, I'm just starting challenges in order to save them. But this means the My Challenges section is overflowing with projects and is hard to manage. Being able to bookmark challenges would be really helpful.",
            feedback: em.getReference(Feedback, 10),
            commentator: em.getReference(User, 1),
        });
        //Comment of Feedback 12
        await em.insert(Comment, {
            content: "I'd love to see this! It always makes me so happy to see little details like these on websites.",
            feedback: em.getReference(Feedback, 12),
            commentator: em.getReference(User, 10),
        });
        //Reply of Comment of Feedback 12
        await em.insert(Comment, {
            content: "Me too! I'd also love to see celebrations at specific points as well. It would help people take a moment to celebrate their achievements!",
            feedback: em.getReference(Feedback, 12),
            commentator: em.getReference(User, 1),
            replyingTo: em.getReference(Comment, 18),
        });
    }
}
// const f1_c1 = new Comment(
//   "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
//   em.getReference(Feedback, 1),
//   em.getReference(User, 1),
//   undefined
// );
// const f1_c2 = new Comment(
//   "Please use fun, color-coded labels to easily identify them at a glance",
//   em.getReference(Feedback, 1),
//   em.getReference(User, 2),
//   undefined
// );
