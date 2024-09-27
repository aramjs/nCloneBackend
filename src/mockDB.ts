import { faker } from "@faker-js/faker";
import { getRandomDate } from "./utils";

const generateAuthor = () => ({
  id: faker.database.mongodbObjectId(),
  username: faker.internet.userName(),
});

const generateVotes = (
  n: number,
  linkId: IVote["linkId"],
  commentId: IVote["commentId"]
) => {
  return Array.from(
    { length: n },
    (): IVote => ({
      id: faker.database.mongodbObjectId(),
      type: faker.datatype.boolean() ? "up" : "down",
      author: generateAuthor(),
      linkId,
      commentId,
    })
  );
};

const generateComments = (n: number, linkId: IComment["linkId"]) => {
  const result: IComment[] = [];

  Array.from({ length: n }).forEach(() => {
    const getParentId = () => {
      if (result.length && faker.datatype.boolean()) {
        const i = faker.number.int({ min: 0, max: result.length - 1 });

        return result[i].id;
      }
      return null;
    };

    const comment: IComment = {
      id: faker.database.mongodbObjectId(),
      author: generateAuthor(),
      createdAt: getRandomDate().toISOString(),
      linkId,
      parentId: getParentId(),
      text: faker.lorem.paragraphs(),
    };

    result.push(comment);
  });

  return result;
};

const generateMockData = (n: number) => {
  const votes: IVote[] = [];
  const comments: IComment[] = [];

  const links: ILink[] = Array.from({ length: n }, (_, i): ILink => {
    const votesCount = faker.number.int({ min: 5, max: 80 });
    const commentCount = faker.number.int({ min: 20, max: 60 });
    const linkId = `${faker.database.mongodbObjectId()}`;
    const linkVotes = generateVotes(votesCount, linkId, null);
    const linkComments = generateComments(commentCount, linkId);

    votes.push(...linkVotes);
    comments.push(...linkComments);

    const username = faker.internet.userName();

    return {
      id: linkId,
      image: faker.image.url(),
      title: faker.lorem.sentence(),
      author: {
        id: `author-${i + 1}`,
        username,
      },
      createdAt: getRandomDate().toISOString(),
    };
  });

  return { votes, links, comments };
};

export const { links, votes, comments } = generateMockData(50);
